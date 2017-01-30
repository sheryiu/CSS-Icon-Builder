function changePosX(value) {
	if (value.indexOf("em") >= 0) {
		value = value.substr(0, value.indexOf("em"))*WIDTH;
		if (currLayer == 0) {
			if (currClickShape == "main") {
				xDelta = value - iconData.main.position.x;
				mouseUp();
			}
		}
	}
}
function changePosY(value) {
	if (value.indexOf("em") >= 0) {
		value = value.substr(0, value.indexOf("em"))*HEIGHT;
		if (currLayer == 0) {
			if (currClickShape == "main") {
				yDelta = value - iconData.main.position.y;
				mouseUp();
			}
		}
	}
}
function changeSizeX(value) {
	if (value.indexOf("em") >= 0) {
		value = value.substr(0, value.indexOf("em"))*WIDTH;
		if (currLayer == 0) {
			if (currClickShape == "main") {
				wDelta = value - iconData.main.size.x;
				mouseUp();
			}
		}
	}
}
function changeSizeY(value) {
	if (value.indexOf("em") >= 0) {
		value = value.substr(0, value.indexOf("em"))*HEIGHT;
		if (currLayer == 0) {
			if (currClickShape == "main") {
				hDelta = value - iconData.main.size.y;
				mouseUp();
			}
		}
	}
}

function changeBRadius(value) {
	// TODO add individual corner
	if (value.indexOf("em") >= 0) {
		value = value.substr(0, value.indexOf("em"));
		if (currLayer == 0) {
			if (currClickShape == "main") {
				iconData.main.borderRadius = value*WIDTH;
				iconData.main.borderRadiusType = "em";
			}
		}
	} else if (value.indexOf("%") >= 0) {
		value = value.substr(0, value.indexOf("%"));
		if (currLayer == 0) {
			if (currClickShape == "main") {
				iconData.main.borderRadius = value/100;
				iconData.main.borderRadiusType = "%";
			}
		}
	}
}
