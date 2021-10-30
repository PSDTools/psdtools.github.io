var courses = [];
var classAmountNum = 0;
//create Course class
class Course{
	constructor(num){
		this.letterGrade = 5;
		this.classText = "";
	  this.classNum = num;
	}

}

function myFunction() {
  var element = document.getElementById("dark");
   element.classList.toggle("w3-theme-l1"); 
	
	var element1 = document.getElementById("dark1");
   element1.classList.toggle("w3-theme-l2 ");

	var element2 = document.getElementById("dark2");
   element2.classList.toggle("w3-light-grey");

}

//create Course function
function createCourse(num){
	var tempElementId = "temp".concat("", String(num));
	var tempElementIdNext = "temp".concat("", String(num + 1));

	document.getElementById(tempElementId).innerHTML= '<textarea placeholder="Name of class ' + num + '" id="cl' + num + 'txt"></textarea>\
<p>Grade:</p>\
	<form>\
	<select id="cl' + num + '">\
		<option value="4">A</option>\
		<option value="3">B</option>\
		<option value="2">C</option>\
		<option value="1">D</option>\
		<option value="0">F</option>\
		<option value="5">N/A</option>\
	</select>\
	<br><br>\
	</form>\
	<div class="selectionbox" id="' + tempElementIdNext +'">';
	
} 


function getCookies(){
	
	//Pulls cookies from the localStorage
	arraycookie = localStorage.getItem('arraycookie');

	
	if (arraycookie == null){//if cookies don't exist
		
		classAmount();
		
	} else {//if cookies do exist

		fromCookies(arraycookie);
		loadgpa();
		
	}
}


function classAmount(){//if cookies don't exist

	//create array
	courses = [];

	//get textbox with number of classes
	classAmountNum = Math.abs(parseInt(document.getElementById("numOfClasses").value));

	if (classAmountNum == parseInt(0)){//stops NaN/0/null
		
		classAmountNum = 7;
		
	} else if (classAmountNum.isNaN == true) {
		
		classAmountNum = 7;
		
	} else if (classAmountNum == null) {
		
		classAmountNum = 7;
		
	}

	//creates classes for number of iterations
	for (let itr = 0; itr < classAmountNum; itr++ ) {
		courses.push(new Course(itr + 1));
		createCourse(itr + 1);
	}


loadgpa();
}


function fromCookies(arraycookie){
	
	courses = JSON.parse(arraycookie);
	
		for (var itr = 0; itr < courses.length; itr++ ) {
			createCourse(courses[itr].classNum);
			createCookieCourse(courses[itr].classNum, courses[itr].letterGrade, courses[itr].classText, itr);	
		}

	for (let itr = 0; itr < courses.length; itr++) {

			tempLGID = "cl".concat("", String(itr + 1));
			tempCTID = "cl".concat("", String(itr + 1) + "txt");
		
		document.getElementById(tempLGID).value = courses[itr].letterGrade;
		document.getElementById(tempCTID).value = courses[itr].classText;
	}

}


function createCookieCourse(classNum, letterGrade, classText, itr){

	let num = classNum;
	
	var tempElementId = "temp".concat("", String(num));
	var tempElementIdNext = "temp".concat("", String(num + 1));

	document.getElementById(tempElementId).value = classText;
	
	document.getElementById(tempElementIdNext).value = classNum;
	
}



function loadgpa(){ //Saves values to the array

//set var
	var pregpa = 0;
	var courseLen = courses.length;
	
	var tempLGID = "";
	var tempCTID = "";

//save classes to array
	
	for (let itr = 0; itr < courses.length; itr++ ) {

			tempLGID = "cl".concat("", String(itr + 1));
			tempCTID = "cl".concat("", String(itr + 1)) + "txt";
		
		courses[itr].letterGrade = document.getElementById(tempLGID).value;
		
		courses[itr].classText =  document.getElementById(tempCTID).value;
	}


	//remove N/A from addition
	for (let itr = 0; itr < courses.length; itr++ ) {
		console.log(courseLen);
		if (courses[itr].letterGrade == 5){
			var courseLen = courseLen - 1;
			
		} else {
			//adds to pregpa
			var pregpa = pregpa + parseInt(courses[itr].letterGrade);
		}

	}
//divide
	gpa = pregpa / courseLen;

	//round
	var gpa = gpa.toFixed(2);

	
	document.getElementById("gpa").innerHTML =
	"Your GPA is a: " + gpa;

	//shows save text
	document.getElementById("saved").innerHTML =
	"Saved!";
	setTimeout(saveRemove, 1000);

	//save cookies
	var arraycookie = JSON.stringify(courses);
	localStorage.setItem('arraycookie', arraycookie, 365);

}
//Remove "Saved!" Text
function saveRemove(){
	document.getElementById("saved").innerHTML =
	"";
}
