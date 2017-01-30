var canvas;
var context;
var animationID;

var iconData = {
	"main":{
		"baseShape":"rectangle",
		"borderRadius":0,
		"borderRadiusType":null,
		"position": {"x":20, "y":20},
		"size": {"x":200, "y":200}
	},
	"before":{},
	"after":{}
};

// cursor x y
var x, y;
// x and y from the top left of shape
var xOffset, yOffset;
var clickDown = false;
// 0 = main, 1 = before, 2 = after
var currLayer = 0;
var currClickShape = null;
var currAnchorPos = null;
var currClickAnchor = null;
// x and y moved
var xDelta = 0, yDelta = 0, wDelta = 0, hDelta = 0;
// store temporary data
var movingData;

var WIDTH = 500;
var HEIGHT = 500;
var RULER_SIZE = 20;

function draw() {
	context.clearRect(RULER_SIZE, RULER_SIZE, WIDTH, HEIGHT);

	drawIconMain();
	drawCrosshairs();

	animationID = requestAnimationFrame(draw);
}


function drawIconMain() {
	var mainData = iconData.main;
	if (mainData.baseShape == "rectangle") {
		context.fillStyle = "#000";
		if (mainData.borderRadiusType == "em") {
			drawRoundedRect(RULER_SIZE+mainData.position.x+xDelta, RULER_SIZE+mainData.position.y+yDelta, mainData.size.x+wDelta, mainData.size.y+hDelta, mainData.borderRadius, mainData.borderRadius);
			context.fill();
		} else if (mainData.borderRadiusType == "%") {
			drawRoundedRect(RULER_SIZE+mainData.position.x+xDelta, RULER_SIZE+mainData.position.y+yDelta, mainData.size.x+wDelta, mainData.size.y+hDelta, mainData.borderRadius*(mainData.size.x+wDelta), mainData.borderRadius*(mainData.size.y+hDelta));
			context.fill();
		} else {
			// normal rectangle
			drawRoundedRect(RULER_SIZE+mainData.position.x+xDelta, RULER_SIZE+mainData.position.y+yDelta, mainData.size.x+wDelta, mainData.size.y+hDelta, 0, 0);
			context.fill();
		}
	}
	if (currAnchorPos != null) {
		context.strokeStyle = "#48B8E0";
		context.fillStyle = "#FFF";
		context.beginPath();
		for (var anchor in currAnchorPos) {
			context.rect(RULER_SIZE+currAnchorPos[anchor][0]+xDelta + (anchor.indexOf("r")>=0?wDelta:0)+((anchor=="t"||anchor=="b")?wDelta/2:0),
			RULER_SIZE+currAnchorPos[anchor][1]+yDelta + (anchor.indexOf("b")>=0?hDelta:0)+((anchor=="l"||anchor=="r")?hDelta/2:0),
			6, 6);
		}
		context.fill();
		context.stroke();
	}
}




function mouseDown(e) {
	x = e.pageX - canvas.offsetLeft - RULER_SIZE;
	y = e.pageY - canvas.offsetTop - RULER_SIZE;

	clickDown = true;
	for (var anchor in currAnchorPos) {
		if (x-currAnchorPos[anchor][0] <= 6 && x-currAnchorPos[anchor][0] >= 0 && y-currAnchorPos[anchor][1] <= 6 && y-currAnchorPos[anchor][1] >= 0) {
			currClickAnchor = anchor;
			console.log(currClickAnchor);
			// use to store click down position
			xOffset = x;
			yOffset = y;
			document.getElementById("sizeX").disabled = true;
			document.getElementById("sizeY").disabled = true;
		}
	}

	if (currClickAnchor == null) {
		if (currLayer == 0) {
			var mainData = iconData.main;
			if (mainData.baseShape == "rectangle") {
				if (mainData.borderRadiusType == "em") {
					drawRoundedRect(RULER_SIZE+mainData.position.x+xDelta, RULER_SIZE+mainData.position.y+yDelta, mainData.size.x+wDelta, mainData.size.y+hDelta, mainData.borderRadius, mainData.borderRadius);
				} else if (mainData.borderRadiusType == "%") {
					drawRoundedRect(RULER_SIZE+mainData.position.x+xDelta, RULER_SIZE+mainData.position.y+yDelta, mainData.size.x+wDelta, mainData.size.y+hDelta, mainData.borderRadius*(mainData.size.x+wDelta), mainData.borderRadius*(mainData.size.y+hDelta));
				} else {
					// normal rectangle
					drawRoundedRect(RULER_SIZE+mainData.position.x+xDelta, RULER_SIZE+mainData.position.y+yDelta, mainData.size.x+wDelta, mainData.size.y+hDelta, 0, 0);
				}
			}
			if (context.isPointInPath(RULER_SIZE+x, RULER_SIZE+y)) {
				currClickShape = "main";
				currAnchorPos = {"tl":[mainData.position.x-3, mainData.position.y-3, "nwse"],
				"t":[mainData.position.x+mainData.size.x/2-3, mainData.position.y-3, "ns"],
				"tr":[mainData.position.x+mainData.size.x-3, mainData.position.y-3, "nesw"],
				"l":[mainData.position.x-3, mainData.position.y+mainData.size.y/2-3, "ew"],
				"r":[mainData.position.x+mainData.size.x-3, mainData.position.y+mainData.size.y/2-3, "ew"],
				"bl":[mainData.position.x-3, mainData.position.y+mainData.size.y-3, "nesw"],
				"b":[mainData.position.x+mainData.size.x/2-3, mainData.position.y+mainData.size.y-3, "ns"],
				"br":[mainData.position.x+mainData.size.x-3, mainData.position.y+mainData.size.y-3, "nwse"]};
				xOffset = mainData.position.x - x;
				yOffset = mainData.position.y - y;
				movingData = {"position": mainData.position, "size": mainData.size};
				document.getElementById("posX").value = mainData.position.x/WIDTH + "em";
				document.getElementById("posX").disabled = true;
				document.getElementById("posY").value = mainData.position.y/HEIGHT + "em";
				document.getElementById("posY").disabled = true;
				document.getElementById("sizeX").value = iconData.main.size.x/WIDTH + "em";
				document.getElementById("sizeY").value = iconData.main.size.y/HEIGHT + "em";
				document.getElementById("bRadius").value = (iconData.main.borderRadiusType=="%"?iconData.main.borderRadius*100:iconData.main.borderRadius/WIDTH) + iconData.main.borderRadiusType;
			} else {
				// reset things
				currClickShape = null;
				currAnchorPos = null;
				xOffset = 0;
				yOffset = 0;
				document.getElementById("posX").value = "";
				document.getElementById("posY").value = "";
				document.getElementById("sizeX").value = "";
				document.getElementById("sizeY").value = "";
				document.getElementById("bRadius").value = "";
			}
		}
	}
}

function mouseUp(e) {
	clickDown = false;
	if (currLayer == 0) {
		if (currClickShape == "main") {
			// Apply delta to data
			iconData.main.position.x += xDelta;
			document.getElementById("posX").value = iconData.main.position.x/WIDTH + "em";
			document.getElementById("posX").disabled = false;
			iconData.main.position.y += yDelta;
			document.getElementById("posY").value = iconData.main.position.y/HEIGHT + "em";
			document.getElementById("posY").disabled = false;
			iconData.main.size.x += wDelta;
			document.getElementById("sizeX").value = iconData.main.size.x/WIDTH + "em";
			document.getElementById("sizeX").disabled = false;
			iconData.main.size.y += hDelta;
			document.getElementById("sizeY").value = iconData.main.size.y/WIDTH + "em";
			document.getElementById("sizeY").disabled = false;
			for (var anchor in currAnchorPos) {
				currAnchorPos[anchor][0] += xDelta + (anchor.indexOf("r")>=0?wDelta:0)+((anchor=="t"||anchor=="b")?wDelta/2:0);
				currAnchorPos[anchor][1] += yDelta + (anchor.indexOf("b")>=0?hDelta:0)+((anchor=="l"||anchor=="r")?hDelta/2:0);
			}
		}
	}
	xDelta = 0;
	yDelta = 0;
	wDelta = 0;
	hDelta = 0;
	xOffset = 0;
	yOffset = 0;
	currClickAnchor = null;
}

function mouseMove(e) {
	x = e.pageX - canvas.offsetLeft - RULER_SIZE;
	y = e.pageY - canvas.offsetTop - RULER_SIZE;

	var matchAnchor = false;
	for (var anchor in currAnchorPos) {
		if (x-currAnchorPos[anchor][0] <= 6 && x-currAnchorPos[anchor][0] >= 0 && y-currAnchorPos[anchor][1] <= 6 && y-currAnchorPos[anchor][1] >= 0) {
			document.body.style.cursor = currAnchorPos[anchor][2]+"-resize";
			matchAnchor = true;
			break;
		}
	}
	if (!matchAnchor && document.body.style.cursor != "default")
	document.body.style.cursor = "default";

	//TODO fixed when out of border (should allow)
	if (clickDown) {
		if (currClickAnchor != null) {
			switch (currClickAnchor) {
				case "t":
				yDelta = y - yOffset;
				hDelta = yOffset - y;
				break;
				case "tr":
				wDelta = x - xOffset;
				yDelta = y - yOffset;
				hDelta = yOffset - y;
				break;
				case "tl":
				xDelta = x - xOffset;
				wDelta = xOffset - x;
				yDelta = y - yOffset;
				hDelta = yOffset - y;
				break;
				case "l":
				xDelta = x - xOffset;
				wDelta = xOffset - x;
				break;
				case "r":
				wDelta = x - xOffset;
				break;
				case "b":
				hDelta = y - yOffset;
				break;
				case "br":
				wDelta = x - xOffset;
				hDelta = y - yOffset;
				break;
				case "bl":
				xDelta = x - xOffset;
				wDelta = xOffset - x;
				hDelta = y - yOffset;
				break;
			}
		} else if (currClickShape != null) {
			if (x+xOffset >= 0) {
				xDelta = x+xOffset - movingData.position.x;
			}
			if (y+yOffset >= 0) {
				yDelta = y+yOffset - movingData.position.y;
			}
		}
	}
}

function mouseOut(e) {
	// TODO fix mouseout behaviour
	clickDown = false;
	x = 0;
	y = 0;
}
