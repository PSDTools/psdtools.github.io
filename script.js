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

//Pulls cookies from the localStorage
function getCookies(){

	arraycookie = localStorage.getItem('arraycookie');

	if (arraycookie == null){
		classAmount()
	} else {
		fromCookies(arraycookie);
		loadgpa();
	}
}


function classAmount(){

	courses = []

	classAmountNum = Math.abs(parseInt(document.getElementById("numOfClasses").value))

	if (classAmountNum == parseInt(0)){
		classAmountNum = 7
	} else if (classAmountNum.isNaN == true) {
		classAmountNum = 7
	} else if (classAmountNum == null) {
		classAmountNum = 7
	}

	for (let itr = 0; itr < classAmountNum; itr++ ) {
		courses.push(new Course(itr + 1));
		createCourse(itr + 1);
	}
loadgpa()

}


function fromCookies(arraycookie){
	
	courses = JSON.parse(arraycookie);
	
		for (var itr = 0; itr < courses.length; itr++ ) {
			createCourse(courses[itr].classNum)
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



function loadgpa(){

	var tempLGID = "";
	var tempCTID = "";

	for (let itr = 0; itr < courses.length; itr++ ) {

			tempLGID = "cl".concat("", String(itr + 1));
			tempCTID = "cl".concat("", String(itr + 1)) + "txt";
		
		courses[itr].letterGrade = document.getElementById(tempLGID).value;
		
		courses[itr].classText =  document.getElementById(tempCTID).value;
	}

	var pregpa = 0

	for (let itr = 0; itr < courses.length; itr++ ) {
		
		if (courses[itr].letterGrade != 5){
		pregpa = pregpa + parseInt(courses[itr].letterGrade)
		
		}

	}

	gpa = pregpa / courses.length
	var gpa = gpa.toFixed(2);

	document.getElementById("gpa").innerHTML =
	"Your GPA is a: " + gpa
	
	document.getElementById("saved").innerHTML =
	"Saved!"
	setTimeout(saveRemove, 1000)

	var arraycookie = JSON.stringify(courses);
	localStorage.setItem('arraycookie', arraycookie, 365)

}

function saveRemove(){
	document.getElementById("saved").innerHTML =
	""
}
