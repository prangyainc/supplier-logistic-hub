/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"inc/lch/FUS/FreightUnits_Supplier/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});