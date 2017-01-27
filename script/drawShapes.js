function drawRect(x, y, sizeX, sizeY) {
	drawRoundedRect(x, y, sizeX, sizeY, 0, 0);
}

function drawRoundedRect(x, y, sizeX, sizeY, xRadius, yRadius) {
	var roundMode = (xRadius > 0) || (yRadius > 0);
	if (roundMode) {
		// prevent radius going over width/2 or height/2
		if (xRadius > sizeX/2)
		xRadius = sizeX/2;
		if (yRadius > sizeY/2)
		yRadius = sizeY/2;
		
		// if using %, xRadius != yRadius
		// if using em, xRadius == yRadius
		if (xRadius != yRadius) {
			var radiusRatio = yRadius/xRadius;
		} else {
			var radiusRatio = 0;
		}
	}

	context.beginPath();
	// vertical line upward on left hand side
	context.moveTo(x, y+sizeY-yRadius);
	context.lineTo(x, y+yRadius);
	// top left corner
	if (roundMode) {
		if (radiusRatio) {
			context.save();
			context.scale(1, radiusRatio);
			context.arcTo(x, y*(1/radiusRatio), x+xRadius, y*(1/radiusRatio), xRadius);
			context.restore();
		} else {
			context.arcTo(x, y, x+xRadius, y, xRadius);
		}
	}
	// horizontal line on top
	context.lineTo(x+sizeX-xRadius, y);
	// top right corner
	if (roundMode) {
		if (radiusRatio) {
			context.save();
			context.scale(1, radiusRatio);
			context.arcTo(x+sizeX, y*(1/radiusRatio), x+sizeX, (y+yRadius)*(1/radiusRatio), xRadius);
			context.restore();
		} else {
			context.arcTo(x+sizeX, y, x+sizeX, y+yRadius, xRadius);
		}
	}
	context.lineTo(x+sizeX, y+sizeY-yRadius);
	// bottom right corner
	if (roundMode) {
		if (radiusRatio) {
			context.save();
			context.scale(1, radiusRatio);
			context.arcTo(x+sizeX, (y+sizeY)*(1/radiusRatio), x+sizeX-xRadius, (y+sizeY)*(1/radiusRatio), xRadius);
			context.restore();
		} else {
			context.arcTo(x+sizeX, y+sizeY, x+sizeX-xRadius, y+sizeY, xRadius);
		}
	}
	context.lineTo(x+xRadius, y+sizeY);
	// bottom left corner
	if (roundMode) {
		if (radiusRatio) {
			context.save();
			context.scale(1, radiusRatio);
			context.arcTo(x, (y+sizeY)*(1/radiusRatio), x, (y+sizeY-yRadius)*(1/radiusRatio), xRadius);
			context.restore();
		} else {
			context.arcTo(x, y+sizeY, x, y+sizeY-yRadius, xRadius);
		}
	}
}
