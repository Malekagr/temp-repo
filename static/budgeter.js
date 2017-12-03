var timeoutID;
var timeout = 45000;

function setup() {
	document.getElementById("theButton").addEventListener("click", makePost, true);

	timeoutID = window.setTimeout(poller, timeout);
}

function makePost() {
	var httpRequest = new XMLHttpRequest();

	if (!httpRequest) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	var spent = 0
	var name = document.getElementById("BudgetName").value+" - ";
	var val = " Spent $"+spent+"/$"+document.getElementById("BudgetValue").value;
	//var spent = "You have spent: "+0;
	var row = [name, val]
	httpRequest.onreadystatechange = function() { handlePost(httpRequest, row) };

	httpRequest.open("POST", "/new_item");
	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	var data;
	data = "name=" + name + "&val=" + val;

	httpRequest.send(data);
}

function handlePost(httpRequest, row) {
	if (httpRequest.readyState === XMLHttpRequest.DONE) {
		if (httpRequest.status === 200) {
			addRow(row);
			clearInput();

		} else {
			alert("There was a problem with the post request.");
		}
	}
}

function poller() {
	var httpRequest = new XMLHttpRequest();

	if (!httpRequest) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}

	httpRequest.onreadystatechange = function() { handlePoll(httpRequest) };
	httpRequest.open("GET", "/items");
	httpRequest.send();
}

function clearInput() {
	document.getElementById("BudgeTitle").value = "";
	document.getElementById("BudgetValue").value = "";
}

function handlePoll(httpRequest) {
	if (httpRequest.readyState === XMLHttpRequest.DONE) {
		if (httpRequest.status === 200) {
			var tab = document.getElementById("theTable");
			while (tab.rows.length > 0) {
				tab.deleteRow(0);
			}

			var rows = JSON.parse(httpRequest.responseText);
			for (var i = 0; i < rows.length; i++) {
				addRow(rows[i]);
			}

			timeoutID = window.setTimeout(poller, timeout);

		} else {
			alert("There was a problem with the poll request.  you'll need to refresh the page to recieve updates again!");
		}
	}
}

function addRow(row) {
	var tableRef = document.getElementById("theTable");
	var newRow   = tableRef.insertRow();

	var newCell, newText;
	for (var i = 0; i < row.length; i++) {
		newCell  = newRow.insertCell();
		newText  = document.createTextNode(row[i]);
		newCell.appendChild(newText);
	}
}


window.addEventListener("load", setup, true);