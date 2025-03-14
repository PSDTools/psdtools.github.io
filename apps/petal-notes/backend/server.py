from flask import Flask, request, jsonify, send_from_directory
import os
import time
import threading

app = Flask(__name__)

BASE_DIR = "./markdown_files"
AUTOSAVE_INTERVAL = 30

def ensure_base_dir():
    if not os.path.exists(BASE_DIR):
        os.makedirs(BASE_DIR)

ensure_base_dir()

def get_file_tree():
    file_list = []
    for root, _, files in os.walk(BASE_DIR):
        for file in files:
            if file.endswith(".md"):
                file_list.append(os.path.relpath(os.path.join(root, file), BASE_DIR))
    return file_list

@app.route("/files", methods=["GET"])
def list_files():
    return jsonify(get_file_tree())

@app.route("/file/<path:filename>", methods=["GET"])
def get_file(filename):
    filename = filename.rstrip('/')  # Remove trailing slash
    if not filename.endswith(".md"):
        filename += ".md"
    file_path = os.path.normpath(os.path.join(BASE_DIR, filename))
    print(f"Requested file path: {file_path}")  # Debug print statement
    if not os.path.commonprefix([os.path.abspath(file_path), os.path.abspath(BASE_DIR)]) == os.path.abspath(BASE_DIR):
        print("Invalid file path detected")  # Debug print statement
        return jsonify({"error": "Invalid file path"}), 400
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            return jsonify({"content": f.read()})
    print("File not found")  # Debug print statement
    return jsonify({"error": "File not found"}), 404

@app.route("/file/<path:filename>", methods=["POST"])
def save_file(filename):
    filename = filename.rstrip('/')  # Remove trailing slash
    if not filename.endswith(".md"):
        filename += ".md"
    data = request.json
    file_path = os.path.normpath(os.path.join(BASE_DIR, filename))
    print(f"Saving file to path: {file_path}")  # Debug print statement
    if not os.path.commonprefix([os.path.abspath(file_path), os.path.abspath(BASE_DIR)]) == os.path.abspath(BASE_DIR):
        print("Invalid file path detected")  # Debug print statement
        return jsonify({"error": "Invalid file path"}), 400
    dirname = os.path.dirname(file_path)
    if not os.path.exists(dirname):
        os.makedirs(dirname)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(data.get("content", ""))

    return jsonify({"status": "saved"})

@app.route("/file/<path:filename>", methods=["DELETE"])
def delete_file(filename):
    filename = filename.rstrip('/')  # Remove trailing slash
    if not filename.endswith(".md"):
        filename += ".md"
    file_path = os.path.normpath(os.path.join(BASE_DIR, filename))
    print(f"Deleting file at path: {file_path}")  # Debug print statement
    if not os.path.commonprefix([os.path.abspath(file_path), os.path.abspath(BASE_DIR)]) == os.path.abspath(BASE_DIR):
        print("Invalid file path detected")  # Debug print statement
        return jsonify({"error": "Invalid file path"}), 400
    if os.path.exists(file_path):
        os.remove(file_path)
        return jsonify({"status": "deleted"})
    print("File not found")  # Debug print statement
    return jsonify({"error": "File not found"}), 404

def autosave():
    while True:
        time.sleep(AUTOSAVE_INTERVAL)
        for file in get_file_tree():
            file_path = os.path.join(BASE_DIR, file)
            if os.path.exists(file_path):
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                # Save the file after reading the content (or you can perform other operations like logging)
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(content)

autosave_thread = threading.Thread(target=autosave, daemon=True)
autosave_thread.start()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
