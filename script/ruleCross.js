function drawHorizontalRuler() {
	context.fillStyle = "#222";
	context.beginPath();
	context.rect(RULER_SIZE, 0, WIDTH, RULER_SIZE);
	context.fill();

	context.strokeStyle = "#999";
	context.beginPath();
	for (var i = 0; i <= 10; i++) {
		// Full Bar
		context.moveTo(RULER_SIZE + i*WIDTH/10, 0);
		context.lineTo(RULER_SIZE + i*WIDTH/10, RULER_SIZE);
		// Half Bar
		context.moveTo(RULER_SIZE + (i+0.5)*HEIGHT/10, RULER_SIZE/2);
		context.lineTo(RULER_SIZE + (i+0.5)*HEIGHT/10, RULER_SIZE);
		// Quarter Bar
		context.moveTo(RULER_SIZE + (i+0.25)*HEIGHT/10, RULER_SIZE*3/4);
		context.lineTo(RULER_SIZE + (i+0.25)*HEIGHT/10, RULER_SIZE);
		context.moveTo(RULER_SIZE + (i+0.75)*HEIGHT/10, RULER_SIZE*3/4);
		context.lineTo(RULER_SIZE + (i+0.75)*HEIGHT/10, RULER_SIZE);
	}
	context.stroke();

	context.fillStyle = "#999";
	context.font = "11px Arial";
	for (var i = 0; i < 10; i++) {
		var temp = "0" + (i>0?("."+i):"");
		context.fillText(temp, 24 + i*WIDTH/10, 11);
	}
}

function drawVerticalRuler() {
	context.fillStyle = "#222";
	context.beginPath();
	context.rect(0, RULER_SIZE, RULER_SIZE, HEIGHT);
	context.fill();

	context.strokeStyle = "#999";
	context.beginPath();
	for (var i = 0; i <= 10; i++) {
		// Full Bar
		context.moveTo(0, RULER_SIZE + i*HEIGHT/10);
		context.lineTo(RULER_SIZE, RULER_SIZE + i*HEIGHT/10);
		// Half Bar
		context.moveTo(RULER_SIZE/2, RULER_SIZE + (i+0.5)*HEIGHT/10);
		context.lineTo(RULER_SIZE, RULER_SIZE + (i+0.5)*HEIGHT/10);
		// Quarter Bar
		context.moveTo(RULER_SIZE*3/4, RULER_SIZE + (i+0.25)*HEIGHT/10);
		context.lineTo(RULER_SIZE, RULER_SIZE + (i+0.25)*HEIGHT/10);
		context.moveTo(RULER_SIZE*3/4, RULER_SIZE + (i+0.75)*HEIGHT/10);
		context.lineTo(RULER_SIZE, RULER_SIZE + (i+0.75)*HEIGHT/10);
	}
	context.stroke();

	context.save();
	context.rotate(90*Math.PI/180);
	context.fillStyle = "#999";
	context.font = "11px Arial";
	for (var i = 0; i < 10; i++) {
		var temp = "0" + (i>0?("."+i):"");
		context.fillText(temp, 24 + i*WIDTH/10, -3);
	}
	context.restore();
}

function drawCorner() {
	context.fillStyle = "#222";
	context.beginPath();
	context.rect(0, 0, RULER_SIZE, RULER_SIZE);
	context.fill();
}

function drawCrosshairs() {
	// Cursor Crosshairs
	if (x > RULER_SIZE || y > RULER_SIZE) {
		context.strokeStyle = "#444";
		context.beginPath();
		if (y > RULER_SIZE) {
			context.moveTo(RULER_SIZE, y);
			context.lineTo(RULER_SIZE+WIDTH, y);
		}
		if (x > RULER_SIZE) {
			context.moveTo(x, RULER_SIZE);
			context.lineTo(x, RULER_SIZE+HEIGHT);
		}
		context.stroke();
	}
}
