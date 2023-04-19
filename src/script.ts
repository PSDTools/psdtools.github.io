/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
window.openNav = () => {
  document.getElementById("mySidenav").style.width = "100%";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
window.closeNav = () => {
  document.getElementById("mySidenav").style.width = "0%";
}


// Swaps High school and Middle school
window.hsmsSwap = () => {
  var checked = document.getElementById("hsmsInput").checked;
  if (document.getElementById("hsmsInput").checked == true) {
    document.getElementById("gradeLvl").innerHTML = "High School";

    localStorage.setItem("gradestorage", checked);
    document.getElementById("numOfClasses").value = courses.length;
    for (let itr = 1; itr < courses.length + 1; itr++) {
      document.getElementById(`typeId${itr}`).innerHTML = `	 <form>	<select class="blacktxt" id="cltyp${itr}">
		    <option value="1">No-Weight</option>
		    <option value="2">Honors</option>
	    </select>	    
	  </form>`;
		document.getElementById(`typeId${itr}`).value = 1
    }
  } else {
    document.getElementById("gradeLvl").innerHTML = "Middle School";
    localStorage.setItem("gradestorage", checked);
    if (courses != null) {
      for (let itr = 1; itr < courses.length + 1; itr++) {
        document.getElementById(`typeId${itr}`).innerHTML = null;
      }
    }
  }
};

var courses = [];
var classAmountNum = 0;
// create Course class
class Course {
  constructor(num) {
    this.letterGrade = 5;
    this.classText = "";
    this.classNum = num;
    this.classType = "1";
  }
}

// create Course function
function createCourse(num) {
  var tempElementId = "temp".concat("", String(num));
  var tempElementIdNext = "temp".concat("", String(num + 1));
  var tempElementIdAlsoNext = "temp".concat("", String(num + 2));
  // creates html elements in the courses class
  document.getElementById(tempElementId).innerHTML = `
	<div class="pt-4 pb-4 lg:text-2xl text-lg">
	<div id="input-con-div" class="">
	  <input style="width:150px;"class="hover:scale-105 placeholder-white blacktxt" placeholder="Class ${num}:" oninput="loadgpa();" id="cl${num}txt" type="text" required=""/>
	   <span style="float:right;" id="typeId${num}">
	  <form>
	 	<select oninput="loadgpa();" class="hover:scale-105 blacktxt" id="cltyp${num}">
		    <option value="1">No-Weight</option>
		    <option value="2">Honors</option>
	    </select>	    
	  </form>
  </span>

	 <input type="range" min="0" max="4" value="4" class="hover:scale-105 slider" style="float:right; width:50%;" id="slide${num}" oninput="document.getElementById('cl${num}').value = document.getElementById('slide${num}').value;loadgpa();">
	  <select class="hover:scale-105 blacktxt" oninput="document.getElementById('slide${num}').value = document.getElementById('cl${num}').value;loadgpa();" style="float:right;-webkit-appearance: none;" id="cl${num}">
		  <option value="4">A</option>
		  <option value="3">B</option>
      <option value="2">C</option>
      <option value="1">D</option>
      <option value="0">F</option>
      <option value="5">N/A</option>
    </select>
	
	 <!-- <label id="cl${num}label">Class ${num}</label> -->
	</div>
  <!--<p>Grade:</p>-->
 </div>
	<div class="selectionbox" id="${tempElementIdNext}">`;
}

window.getstorage = () => {
  // Called on pageload
  // Pulls storage from localStorage
  var color = localStorage.getItem("color");
  var shade = localStorage.getItem("shade");
  var gradestorage = localStorage.getItem("gradestorage");
  var arraystorage = localStorage.getItem("arraystorage");
  // sets top header, slider, and dark mode to correct values
  if (shade == "dark") {
    var element = document.body;
    element.classList.toggle("darkModebg");
    element.classList.toggle("lightModebg");
    var c = document.getElementById("c");
    c.classList.toggle("darkMode");
    c.classList.toggle("lightMode");
    var c2 = document.getElementById("c2");
    c2.classList.toggle("darkMode");
    c2.classList.toggle("lightMode");
    document.getElementById("darkModeButton").innerHTML = "Light Mode";
  }

  // Easter Egg
  if (color == "red") {
    var element = document.body;
    element.classList.add("redModebg");
  } else if (color == "orange") {
    var element = document.body;
    element.classList.add("orangeModebg");
  } else if (color == "yellow") {
    var element = document.body;
    element.classList.add("yellowModebg");
  } else if (color == "lime") {
    var element = document.body;
    element.classList.add("limeModebg");
  } else if (color == "cyan") {
    var element = document.body;
    element.classList.add("cyanModebg");
  } else if (color == "blue") {
    var element = document.body;
    element.classList.add("blueModebg");
  } else if (color == "purple") {
    var element = document.body;
    element.classList.add("purpleModebg");
  } else if (color == "pink") {
    var element = document.body;
    element.classList.add("pinkModebg");
  } else if (color == "pinkred") {
    var element = document.body;
    element.classList.add("pinkredModebg");
  }

  if (gradestorage == "true") {
    document.getElementById("hsmsInput").checked = true;
    var checked = true; // FIXME (no var)
    document.getElementById("gradeLvl").innerHTML = "High School";
  } else if (gradestorage == "false") {
    document.getElementById("hsmsInput").checked = false;
    var checked = false; // FIXME (no var)
    document.getElementById("gradeLvl").innerHTML = "Middle School";
  } else {
    // Modal that pops up on first start
    document.getElementById("id01").style.display = "block";
    hsmsSwap();
  }

  if (arraystorage == null) {
    // if storage don't exist
    classAmount();
  } else {
    // if storage do exist
    fromstorage(arraystorage);
    loadgpa();
  }
};

window.classAmount = () => {
  // if storage don't exist

  // create array
  courses = [];

  // get textbox with number of classes
  classAmountNum = Math.abs(
    parseInt(document.getElementById("numOfClasses").value)
  );

  if (classAmountNum == parseInt(0)) {
    // stops NaN/0/null on numOfClasses textbox

    classAmountNum = 7;
  } else if (classAmountNum.isNaN == true) {
    classAmountNum = 7;
  } else if (classAmountNum == null) {
    classAmountNum = 7;
  } else if (classAmountNum > 256) {
    classAmountNum = 7;
  }

  // creates classes for number of iterations
  for (let itr = 0; itr < classAmountNum; itr++) {
    courses.push(new Course(itr + 1));
    createCourse(itr + 1);
  }
  if (document.getElementById("hsmsInput").checked == false) {
    for (let itr = 1; itr < courses.length + 1; itr++) {
      // loops through all course classes and removes the <span id="typeId"></span> (honors dropdown)
      document.getElementById(`typeId${itr}`).innerHTML = null;
    }
  }
  // calculates and saves the gpa
  loadgpa();
  // sets the gpa text to ""
  document.getElementById("gpa").innerHTML = "";
};

function fromstorage(arraystorage) {
  // not to be confused with getstorage()
  courses = JSON.parse(arraystorage);
  // creates courses from array data after it is pulled from storage
  if (courses != null) {
    for (var itr = 0; itr < courses.length; itr++) {
      createCourse(courses[itr].classNum);
      createstorageCourse(
        courses[itr].classNum,
        courses[itr].letterGrade,
        courses[itr].classText,
        courses[itr].classType,
        itr
      );
    }
    for (let itr = 0; itr < courses.length; itr++) {
      var tempLGID = "cl".concat("", String(itr + 1)); // FIXME (no var)
      var tempCTID = "cl".concat("", String(itr + 1) + "txt"); // FIXME (no var)
      var tempCTYID = `cltyp${String(itr + 1)}`; // FIXME (no var)

      document.getElementById(tempLGID).value = courses[itr].letterGrade;
      document.getElementById(tempCTID).value = courses[itr].classText;
      document.getElementById(tempCTYID).value = courses[itr].classType;
    }
    if (document.getElementById("hsmsInput").checked == false) {
      for (let itr = 1; itr < courses.length + 1; itr++) {
        // removes typeId <span> element from courses objects
        document.getElementById(`typeId${itr}`).innerHTML = null;
      }
    }
  }
}

function createstorageCourse(classNum, letterGrade, classText, classType, itr) {
  // Populates course object data

  let num = classNum;

  var tempElementId = "temp".concat("", String(num)); // FIXME (no var)
  var tempElementIdNext = "temp".concat("", String(num + 1)); // FIXME (no var)

  document.getElementById(tempElementId).value = classText;

  document.getElementById(tempElementIdNext).value = classNum;
}

window.help = () => {
  window.location.href = "help.html";
};
window.loadgpahelp = () => {
  window.location.href = "index.html";
};

window.loadgpa = () => {
  // Saves values to the array
  if (courses != null) {
    // set var
    var pregpa = 0;
    var courseLen = courses.length;

    var tempLGID = "";
    var tempCTID = "";
    var tempCTYID = "";

    // save classes to array

    for (let itr = 0; itr < courses.length; itr++) {
      tempLGID = "cl".concat("", String(itr + 1));
      tempCTID = "cl".concat("", String(itr + 1)) + "txt";
      tempCTYID = "cltyp".concat("", String(itr + 1));

      courses[itr].letterGrade = document.getElementById(tempLGID).value;

      courses[itr].classText = document.getElementById(tempCTID).value;

      if (document.getElementById("hsmsInput").checked != false) {
        tempCTYID = `cltyp${String(itr + 1)}`;
        courses[itr].classType = document.getElementById(tempCTYID).value;
      }
    }

    // remove N/A from addition
    for (let itr = 0; itr < courses.length; itr++) {
      if (courses[itr].letterGrade == 5) {
        var courseLen = courseLen - 1;
      } else {
        // adds to pregpa
        if (courses[itr].classType == "2") {
          if (courses[itr].letterGrade == "0") {
            var pregpa = pregpa + parseInt(courses[itr].letterGrade);
          } else {
            var pregpa = pregpa + 1 + parseInt(courses[itr].letterGrade);
          }
        } else {
          var pregpa = pregpa + parseInt(courses[itr].letterGrade);
        }
      }
    }
    // divide
    gpa = pregpa / courseLen;

    // round
    var gpa = gpa.toFixed(2);

    document.getElementById("gpa").innerHTML = `Your GPA is a: ${gpa}`;

    // shows save text
    document.getElementById("saved").innerHTML = "Saved!";
    setTimeout(saveRemove, 3000);

    // save storage
    var arraystorage = JSON.stringify(courses);
    localStorage.setItem("arraystorage", arraystorage, 365);
  }
  // Remove "Saved!" Text
  function saveRemove() {
    document.getElementById("saved").innerHTML = "";
  }
};
// clears class storage data
window.clearData = () => {
  localStorage.setItem("arraystorage", null, -1);
  location.reload();
};
// clears all website storage data
window.clearAll = () => {
  localStorage.setItem("gradestorage", null, -1);
  localStorage.setItem("color", null, -1);
  localStorage.setItem("shade", null, -1);
  window.clearData();
};


// Dark Mode
window.darkMode = () => {
  var element = document.body;
  element.classList.toggle("darkModebg");
  element.classList.toggle("lightModebg");

  var c = document.getElementById("c");
  c.classList.toggle("darkMode");
  c.classList.toggle("lightMode");

  var c2 = document.getElementById("c2");
  c2.classList.toggle("darkMode");
  c2.classList.toggle("lightMode");

  if (c.classList.contains("darkMode") == true) {
    document.getElementById("darkModeButton").innerHTML = "Light Mode";
    localStorage.setItem("shade", "dark", 365);
  } else if (element.classList.contains("lightMode") == false) {
    document.getElementById("darkModeButton").innerHTML = "Dark Mode";
    localStorage.setItem("shade", "light", 365);
  }
};
// Easter Egg
// Context: https://www.google.com/search?q=Konami+Code

function remColors() {
  const classes = [
    "redModebg",
    "orangeModebg",
    "yellowModebg",
    "limeModebg",
    "cyanModebg",
    "blueModebg",
    "purpleModebg",
    "pinkModebg",
    "pinkredModebg",
  ];
  classes.forEach((c) => {
    var element = document.body;
    if (element.classList.contains(c)) {
      element.classList.remove(c);
    }
    var element = document.getElementById("c");
    if (element.classList.contains(c)) {
      element.classList.remove(c);
    }
    var element = document.getElementById("c2");
    if (element.classList.contains(c)) {
      element.classList.remove(c);
    }
  });
}

var keys = "";
window.onkeydown = (e) => {
  var code = e.keyCode ? e.keyCode : e.which;
  if (code === 38) {
    // up key
    keys += "1";
  } else if (code === 40) {
    // down key
    keys += "2";
  } else if (code === 37) {
    // left key
    keys += "3";
  } else if (code === 39) {
    // right key
    keys += "4";
  } else if (code === 66) {
    // B key
    keys += "5";
  } else if (code === 65) {
    // A key
    keys += "6";
  } else if (code === 13) {
    // Start (enter) key
    keys += "7";
  }
  if (keys == "11223434567") {
    // sequence
    console.log(keys);
    alert("You Found It!");
    document.getElementById("id02").style.display = "block";
    remColors();
  }
};
// Button Theme Changing Functions
window.rTH = () => {
  remColors();
  var element = document.body;
  element.classList.add("redModebg");
  localStorage.setItem("color", "red", 365);
};
window.oTH = () => {
  remColors();
  var element = document.body;
  element.classList.add("orangeModebg");
  localStorage.setItem("color", "orange", 365);
};
window.yTH = () => {
  remColors();
  var element = document.body;
  element.classList.add("yellowModebg");
  localStorage.setItem("color", "yellow", 365);
};
window.lTH = () => {
  remColors();
  var element = document.body;
  element.classList.add("limeModebg");
  localStorage.setItem("color", "lime", 365);
};
window.cTH = () => {
  remColors();
  var element = document.body;
  element.classList.add("cyanModebg");
  localStorage.setItem("color", "cyan", 365);
};
window.bTH = () => {
  remColors();
  var element = document.body;
  element.classList.add("blueModebg");
  localStorage.setItem("color", "blue", 365);
};
window.pTH = () => {
  remColors();
  var element = document.body;
  element.classList.add("purpleModebg");
  localStorage.setItem("color", "purple", 365);
};
window.piTH = () => {
  remColors();
  var element = document.body;
  element.classList.add("pinkModebg");
  localStorage.setItem("color", "pink", 365);
};
window.prTH = () => {
  remColors();
  var element = document.body;
  element.classList.add("pinkredModebg");
  localStorage.setItem("color", "pinkred", 365);
};
