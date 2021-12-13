function hsmsSwap(){
	var checked = document.getElementById("hsmsInput").checked
	console.log(checked + "1")
	if (document.getElementById("hsmsInput").checked == true){
		document.getElementById("gradeLvl").innerHTML = "High School"
		document.getElementById("numOfClasses").value = courses.length
		localStorage.setItem('gradecookie', checked);
		for (let itr = 1; itr < courses.length + 1; itr++ ) {
			document.getElementById("typeId" + itr).innerHTML = '<p>Type:</p>\
	<form>\
	<select class="dropmenu" id="cltyp' + itr + '">\
		<option value="normal">N/A</option>\
		<option value="honors">Honors</option>\
	</select>\
	</form>'
		}
		
	} else {
		document.getElementById("gradeLvl").innerHTML = "Middle School"
		for (let itr = 1; itr < courses.length + 1; itr++ ) {
			document.getElementById("typeId" + itr).innerHTML = null
			localStorage.setItem('gradecookie', checked);
		}
		
	}
}


var courses = [];
var classAmountNum = 0;
//create Course class
class Course{
	constructor(num){
		this.letterGrade = 5;
		this.classText = "";
	  this.classNum = num;
		this.classType = "normal"
	}

}

//create Course function
function createCourse(num){
	var tempElementId = "temp".concat("", String(num));
	var tempElementIdNext = "temp".concat("", String(num + 1));

	document.getElementById(tempElementId).innerHTML= '\
	<div class="input-container">\
	<input id="cl' + num + 'txt" type="text" required=""/>\
	<label>Class ' + num + '</label>\
	</div>\
<span id="typeId' + num + '">\
<p>Type:</p>\
	<form>\
	<select class="dropmenu" id="cltyp' + num + '">\
		<option value="normal">N/A</option>\
		<option value="honors">Honors</option>\
	</select>\
	</form>\
</span>\
<p>Grade:</p>\
	<form>\
	<select class="dropmenu SM" id="cl' + num + '">\
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
	var gradecookie = localStorage.getItem('gradecookie');
	var arraycookie = localStorage.getItem('arraycookie');

	if (gradecookie == "true"){

		document.getElementById("hsmsInput").checked = true

	} else if (gradecookie == "false"){

		document.getElementById("hsmsInput").checked = false

	}

	if (arraycookie == null){//if cookies don't exist
		
		classAmount();
		hsmsSwap();
		
	} else {//if cookies do exist

		fromCookies(arraycookie);
		loadgpa();
		hsmsSwap();
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
		
	} else if (classAmountNum > 256) {
		
		classAmountNum = 7;
		
	}

	//creates classes for number of iterations
	for (let itr = 0; itr < classAmountNum; itr++ ) {
		courses.push(new Course(itr + 1));
		createCourse(itr + 1);
	}
	document.getElementById("cl" + classAmountNum).classList.add("float")
	if (document.getElementById("hsmsInput").checked == false){
		for (let itr = 1; itr < courses.length + 1; itr++ ) {
			document.getElementById("typeId" + itr).innerHTML = null
		}
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
			tempCTYID = "cltyp".concat("", String(itr + 1));
		
		courses[itr].letterGrade = document.getElementById(tempLGID).value;
		
		courses[itr].classText =  document.getElementById(tempCTID).value;

		courses[itr].classType =  document.getElementById(tempCTYID).value;
	}


	//remove N/A from addition
	for (let itr = 0; itr < courses.length; itr++ ) {
		if (courses[itr].letterGrade == 5){
			var courseLen = courseLen - 1;
				
		} else {
			//adds to pregpa
			if (courses[itr].classType == "honors"){
				if (courses[itr].letterGrade == "0"){
					var pregpa = pregpa + parseInt(courses[itr].letterGrade);
				} else {
					var pregpa = pregpa + 1 + parseInt(courses[itr].letterGrade);
				}
			} else {
				var pregpa = pregpa + parseInt(courses[itr].letterGrade);
			}
			
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
	document.getElementById("saved").innerHTML = "";
}

function clearData(){
	localStorage.setItem('arraycookie', null, -1);
	location.reload()
}