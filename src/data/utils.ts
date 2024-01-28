function isInstanceOf<T extends new (...args: unknown[]) => unknown>(
  obj: unknown,
  cls: T,
): obj is InstanceType<T> {
  return obj instanceof cls;
}

function getElementByIdTyped<T extends HTMLElement>(
  id: string,
  type: new () => T,
): T | undefined {
  const element = document.getElementById(id);

  if (isInstanceOf(element, type)) {
    return element;
  }

  return undefined;
}

export { getElementByIdTyped };
