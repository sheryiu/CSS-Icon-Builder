function changeBasicShape(radius) {
	if (currLayer == 0) {
		if (!iconData.main.hasOwnProperty("baseShape")) {
			iconData.main.baseShape = "rectangle";
			iconData.main.position = {"x":20, "y":20};
			iconData.main.size = {"x":20, "y":20};
		}
		iconData.main.borderRadius = radius;
		iconData.main.borderRadiusType = (radius > 0)?"%":null;
	}
}
