// ==UserScript==
// @name                VrtuCar/Reserveauto UI tweaks
// @namespace	        http://piepalace.ca/blog/projects/vrtucar_easy
// @description	        Improves car selection on VC/RA website.
// @include		https://www.reservauto.net/Scripts/Client/ReservationDisponibility.asp*
// ==/UserScript==

// Flag the tables as being available or unavailable
var tables = document.getElementsByTagName("table");

var maxWidth = -1;

for (var i = 4; i < tables.length - 1; i = i + 1) {
    // Set the class
	var newClass = " __vrtucar_easy_unavail";
	if (tables[i].getElementsByTagName("input").length > 0) {
		newClass = " __vrtucar_easy_available";
	}
	
	tables[i].className += newClass;
	tables[i].className += " __vrtucar_easy_both";

    // Find the maximum width
    var w = 0;
    w = tables[i].offsetWidth;

    maxWidth = Math.max(w, maxWidth);
}

// Set the width
var sheet = document.createElement('style')
sheet.innerHTML = ".__vrtucar_easy_both {width: " + maxWidth + "px;} .__vrtucar_easy_both input {float: right;}";
document.head.appendChild(sheet);


// Create style sheets to control the appearance of unavailable stations
sheet = document.createElement('style')
sheet.innerHTML = ".__vrtucar_easy_unavail {opacity: .6;}";
document.head.appendChild(sheet);

sheet = document.createElement('style')
sheet.innerHTML = ".__vrtucar_easy_unavail, .__vrtucar_easy_unavail + br {display: none;}";
document.head.appendChild(sheet);


// Add a control
var showCon = document.createElement('button');
var hideCon = document.createElement('button');

showCon.innerHTML = 'Show unavailable stations';
showCon.style.position = 'fixed';
showCon.style.right = '0px';
showCon.style.top = '0px';
showCon.onclick = function() {
	// Disable our style sheet
	var last = document.styleSheets.length - 1;
	document.styleSheets[last].disabled = true;
	showCon.style.display = 'none';
	hideCon.style.display = 'block';
};
document.body.appendChild(showCon);

hideCon.innerHTML = 'Hide unavailable stations';
hideCon.style.position = 'fixed';
hideCon.style.right = '0px';
hideCon.style.top = '0px';
hideCon.style.display = 'none';
hideCon.onclick = function() {
	var last = document.styleSheets.length - 1;
	document.styleSheets[last].disabled = false;
	hideCon.style.display = 'none';
	showCon.style.display = 'block';
};
document.body.appendChild(hideCon);
