// function include(file){
// 	var script = document.createElement("script");
// 	script.src=file;
// 	script.type="text/javascript";
// 	script.defer=true;
	
// 	document.getElementsByTagName("head").item(0).appendChild(script);

// }

// include("coursebox.js");

var courses

class Course{
	constructor(num){
		this.letterGrade = 5;
		this.classText = "";
	
	}

}


function createCourse(num){
	var tempElementId = "temp".concat("", String(num));
	var tempElementIdNext = "temp".concat("", String(num + 1));

	document.getElementById(tempElementId).innerHTML = '<textarea placeholder=\
	"Class ' + num + '" id="cl' + num + 'txt"></textarea>\
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

  var arraycookie = localStorage.getItem('arraycookie');

	// lenNum = arraycookie.search('{')
	// lenNum = parseInt(lenNum) + 10
	// arraycookie = arraycookie.slice(lenNum);
	
if (arraycookie == null){
 	courses = [];

for (let itr = 0; itr < 8; itr++ ) {
	courses.push(new Course());
	createCourse(itr);
}

console.log("is null")
}else{
courses = [arraycookie]
console.log("not null")
}

}
function loadgpa(){
		var arraycookie = courses;
		localStorage.setItem('arraycookie', arraycookie, 365);
		console.log(JSON.stringify(courses))
}










/*
//Load Cookies
function getCookies(){
  var visitcookie = localStorage.getItem('visitcookie');
  visitbool = visitcookie;


  var cl1cookie = localStorage.getItem('cl1cookie');
  document.getElementById("cl1").value = cl1cookie;

  var cl2cookie = localStorage.getItem('cl2cookie');
  document.getElementById("cl2").value = cl2cookie;

  var cl3cookie = localStorage.getItem('cl3cookie');
  document.getElementById("cl3").value = cl3cookie;

  var cl4cookie = localStorage.getItem('cl4cookie');
  document.getElementById("cl4").value = cl4cookie;

  var cl5cookie = localStorage.getItem('cl5cookie');
  document.getElementById("cl5").value = cl5cookie;

  var cl6cookie = localStorage.getItem('cl6cookie');
  document.getElementById("cl6").value = cl6cookie;

  var cl7cookie = localStorage.getItem('cl7cookie');
  document.getElementById("cl7").value = cl7cookie;

  var cl8cookie = localStorage.getItem('cl8cookie');
  document.getElementById("cl8").value = cl8cookie;
  
    if (visitbool != "True"){
//Set to default values
cl1.value = 4
cl2.value = 4
cl3.value = 4
cl4.value = 4
cl5.value = 4
cl6.value = 4
cl7.value = 4
cl8.value = 5
  }

//Load Cookies

  var cl1txtcookie = localStorage.getItem('cl1txtcookie');
  document.getElementById("cl1txt").value = cl1txtcookie;

  var cl2txtcookie = localStorage.getItem('cl2txtcookie');
  document.getElementById("cl2txt").value = cl2txtcookie;
  
  var cl3txtcookie = localStorage.getItem('cl3txtcookie');
  document.getElementById("cl3txt").value = cl3txtcookie;
  
  var cl4txtcookie = localStorage.getItem('cl4txtcookie');
  document.getElementById("cl4txt").value = cl4txtcookie;
  
  var cl5txtcookie = localStorage.getItem('cl5txtcookie');
  document.getElementById("cl5txt").value = cl5txtcookie;
  
  var cl6txtcookie = localStorage.getItem('cl6txtcookie');
  document.getElementById("cl6txt").value = cl6txtcookie;
  
  var cl7txtcookie = localStorage.getItem('cl7txtcookie');
  document.getElementById("cl7txt").value = cl7txtcookie;
  
  var cl8txtcookie = localStorage.getItem('cl8txtcookie');
  document.getElementById("cl8txt").value = cl8txtcookie;

  var refreshcookie = localStorage.getItem('refreshcookie');
  document.getElementById("dateandtime").innerHTML = "Last Saved: " + refreshcookie;
  
    var gpacookie = localStorage.getItem('gpacookie');
  document.getElementById("gpa").innerHTML =  "Your GPA is a: " + gpacookie;
}
    //Easter Egg Counter
    var count= 0;

    function incrementCount(){
       count++;
    }

function loadgpa() { 
  
	//count function
	incrementCount()
		
	//divisor
	numclass = 8

	// Add all of the grades together
	// |A = 4|B = 3|C = 2|D = 1|F = 0|N/A = 5

	var pregpa = parseInt(cl1.value) + parseInt(cl2.value) + parseInt(cl3.value) + parseInt(cl4.value) + parseInt(cl5.value) + parseInt(cl6.value) + parseInt(cl7.value) + parseInt(cl8.value);

	//Less than 8 classes support| N/A (removes the 5 from the addition value and removes 1 from division value)

	// class 1
		if (parseInt(cl1.value) == 5) {
			numclass = numclass - 1
			pregpa = pregpa -5
		}
		
		// class 2
		if (parseInt(cl2.value) == 5) {
			numclass = numclass - 1
			pregpa = pregpa -5
		}
		
		// class 3
		if (parseInt(cl3.value) == 5) {
			numclass = numclass - 1
			pregpa = pregpa -5
		}
		
		// class 4
		if (parseInt(cl4.value) == 5) {
			numclass = numclass - 1
			pregpa = pregpa -5
		}
		
		// class 5
		if (parseInt(cl5.value) == 5) {
			numclass = numclass - 1
			pregpa = pregpa -5
		}
		
		// class 6
		if (parseInt(cl6.value) == 5) {
			numclass = numclass - 1
			pregpa = pregpa -5
		}
		
		// class 7
		if (parseInt(cl7.value) == 5) {
			numclass = numclass - 1
			pregpa = pregpa -5
		}
		
		// class 8
		if (parseInt(cl8.value) == 5) {
			numclass = numclass - 1
			pregpa = pregpa -5
		}
		
		//Easter Egg
		if (count == 30) {
		document.getElementById("Result").innerHTML =
		"You Found A Secret!";
		}

	//division
	var gpa = pregpa / numclass;

	//Round to hundreth place
	var gpa = gpa.toFixed(2);

	//print to screen
	document.getElementById("gpa").innerHTML =
	"Your GPA is a: " + gpa;

	// save COOKIES
	// save Dropdown Cookies
		
		var cl1cookie = document.getElementById("cl1");
		localStorage.setItem('cl1cookie', cl1.value, 365);
		
		var cl2cookie = document.getElementById("cl2");
		localStorage.setItem('cl2cookie', cl2.value, 365);
		
		var cl3cookie = document.getElementById("cl3");
		localStorage.setItem('cl3cookie', cl3.value, 365);
		
		var cl4cookie = document.getElementById("cl4");
		localStorage.setItem('cl4cookie', cl4.value, 365);
		
		var cl5cookie = document.getElementById("cl5");
		localStorage.setItem('cl5cookie', cl5.value, 365);
		
		var cl6cookie = document.getElementById("cl6");
		localStorage.setItem('cl6cookie', cl6.value, 365);
		
		var cl7cookie = document.getElementById("cl7");
		localStorage.setItem('cl7cookie', cl7.value, 365);
		
		var cl8cookie = document.getElementById("cl8");
		localStorage.setItem('cl8cookie', cl8.value, 365);

	//save Name Cookies

		var cl1txtcookie = document.getElementById("cl1txt");
		localStorage.setItem('cl1txtcookie', cl1txt.value, 365);

		var cl2txtcookie = document.getElementById("cl2txt");
		localStorage.setItem('cl2txtcookie', cl2txt.value, 365);

		var cl3txtcookie = document.getElementById("cl3txt");
		localStorage.setItem('cl3txtcookie', cl3txt.value, 365);

		var cl4txtcookie = document.getElementById("cl4txt");
		localStorage.setItem('cl4txtcookie', cl4txt.value, 365);

		var cl5txtcookie = document.getElementById("cl5txt");
		localStorage.setItem('cl5txtcookie', cl5txt.value, 365);

		var cl6txtcookie = document.getElementById("cl6txt");
		localStorage.setItem('cl6txtcookie', cl6txt.value, 365);

		var cl7txtcookie = document.getElementById("cl7txt");
		localStorage.setItem('cl7txtcookie', cl7txt.value, 365);

		var cl8txtcookie = document.getElementById("cl8txt");
		localStorage.setItem('cl8txtcookie', cl8txt.value, 365);

		var cl8txtcookie = document.getElementById("cl8txt");
		localStorage.setItem('cl8txtcookie', cl8txt.value, 365);

		var visitcookie = "True";
	localStorage.setItem('visitcookie', "True", 365);

		var gpacookie = gpa;
	localStorage.setItem('gpacookie', gpa, 365);

	//save Date
		const d = String(new Date());

	num = d.search(':')
	num = d.length - num
	num = num - 6

	modifiedDate = d.substring(0,d.length-num);

	const input = modifiedDate;

	const [day1, month2, date3, year4, time5] = input.split(' ');

	input2 = time5;

	[hr, min, sec] = input2.split(':');

	if (hr > 12){
		hr = hr - 12
		ampm = "PM."
	}else{
		ampm = "AM."
	}

	modifiedDate = month2 + " " + date3 + " " + year4 + " at " + hr + ":" + min + ":" + sec + " " + ampm

		var refreshcookie = document.getElementById("dateandtime").innerHTML;
		localStorage.setItem('refreshcookie', String(modifiedDate), 365);
	//print date last saved
		var refreshcookie = localStorage.getItem('refreshcookie');
		document.getElementById("dateandtime").innerHTML = "Last Saved: " + refreshcookie;

	//cookieEnabled text

	if(navigator.cookieEnabled) {
	//pass
	}
	else {
	document.getElementById("cookiesdis").innerHTML =
	"Cookies Are Disabled, Without Them Some Site Data Will Not Save! Please Enable Cookies in your Browser to Restore Functionality to These Features!";
	}

}
*/
