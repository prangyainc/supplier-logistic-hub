jQuery.sap.declare("inc.lch.FUS.FreightUnits_Supplier.utility.formatter");
inc.lch.FUS.FreightUnits_Supplier.utility.formatter = {
	columnListItem: function (sId,Products,columns) {
		
		
		var data = columns;
		var columnlist = [];
		var columnObject = {};
		columnObject.Column = new sap.m.Text({
			text: "ProductId"
		}).addStyleClass("sapUiSizeCompact");
		columnObject.coulmnKey = "ProductId";
		columnlist.push(columnObject);
		columnObject = {};
		columnObject.Column = new sap.m.Text({
			text: "Name"
		}).addStyleClass("sapUiSizeCompact");
		columnObject.coulmnKey = "Name";
		columnlist.push(columnObject);
		columnObject = {};
		columnObject.Column = new sap.m.Text({
			text: "SupplierName"
		}).addStyleClass("sapUiSizeCompact");
		columnObject.coulmnKey = "SupplierName";
		columnlist.push(columnObject);
		columnObject = {};
		columnObject.Column = new sap.m.Text({
			text: "Category"
		}).addStyleClass("sapUiSizeCompact");
		columnObject.coulmnKey = "Category";
		columnlist.push(columnObject);
		columnObject = {};
		columnObject.Column = new sap.m.Text({
			text: "Quantity"
		}).addStyleClass("sapUiSizeCompact");
		columnObject.coulmnKey = "Quantity";
		columnlist.push(columnObject);
		columnObject = {};
		columnObject.Column = new sap.m.Text({
			text: "Price"
		}).addStyleClass("sapUiSizeCompact");
		columnObject.coulmnKey = "Price";
		columnlist.push(columnObject);
		columnObject = {};
		columnObject.Column = new sap.m.Text({
			text: "MainCategory"
		}).addStyleClass("sapUiSizeCompact");
		columnObject.coulmnKey = "MainCategory";
		columnlist.push(columnObject);
		columnObject = {};
		columnObject.Column = new sap.m.Text({
			text: "TaxTarifCode"
		}).addStyleClass("sapUiSizeCompact");
		columnObject.coulmnKey = "TaxTarifCode";
		columnlist.push(columnObject);
		columnObject = {};
		columnObject.Column = new sap.m.Text({
			text: "WeightMeasure"
		}).addStyleClass("sapUiSizeCompact");
		columnObject.coulmnKey = "WeightMeasure";
		columnlist.push(columnObject);
		columnObject = {};
		columnObject.Column = new sap.m.Text({
			text: "Description"
		}).addStyleClass("sapUiSizeCompact");
		columnObject.coulmnKey = "Description";
		columnlist.push(columnObject);
		columnObject = {};
		columnObject.Column = new sap.m.Text({
			text: "DateOfSale"
		}).addStyleClass("sapUiSizeCompact");
		columnObject.coulmnKey = "DateOfSale";
		columnlist.push(columnObject);
		columnObject = {};
		columnObject.Column = new sap.m.Text({
			text: "Status"
		}).addStyleClass("sapUiSizeCompact");
		columnObject.coulmnKey = "Status";
		columnlist.push(columnObject);
		columnObject = {};
		columnObject.Column = new sap.m.Text({
			text: "UoM"
		}).addStyleClass("sapUiSizeCompact");
		columnObject.coulmnKey = "UoM";
		columnlist.push(columnObject);
		var columns = [];
		for (var i = 0; i < data.length; i++) {
			for (var j = 0; j < columnlist.length; j++) {
				if (data[i].columnKey === columnlist[j].coulmnKey) {
					columns.push(columnlist[j]);
				}
			}
		}
		var Products = this.getView().getModel("oTableModel");
		var rows = Products.getProperty("/ProductCollection").length;
		for (var k = 0; k < rows; k++) {
			var newRow = new sap.m.ColumnListItem(this.getView().createId("row" + k), {
				type: "Active",
				cells: [
					new sap.m.Text({
						text: Products.getProperty("/ProductCollection/" + k + "/" + columns[0].coulmnKey)
					}),
					new sap.m.Text({
						text: Products.getProperty("/ProductCollection/" + k + "/" + columns[1].coulmnKey)
					}),
					new sap.m.Text({
						text: Products.getProperty("/ProductCollection/" + k + "/" + columns[2].coulmnKey)
					}),
					new sap.m.Text({
						text: Products.getProperty("/ProductCollection/" + k + "/" + columns[3].coulmnKey)
					}),
					new sap.m.Text({
						text: Products.getProperty("/ProductCollection/" + k + "/" + columns[4].coulmnKey)
					}),
					new sap.m.Text({
						text: Products.getProperty("/ProductCollection/" + k + "/" + columns[5].coulmnKey)
					}),
					new sap.m.Text({
						text: Products.getProperty("/ProductCollection/" + k + "/" + columns[6].coulmnKey)
					}),
					new sap.m.Text({
						text: Products.getProperty("/ProductCollection/" + k + "/" + columns[7].coulmnKey)
					}),
					new sap.m.Text({
						text: Products.getProperty("/ProductCollection/" + k + "/" + columns[8].coulmnKey)
					}),
					new sap.m.Text({
						text: Products.getProperty("/ProductCollection/" + k + "/" + columns[9].coulmnKey)
					}),
					new sap.m.Text({
						text: Products.getProperty("/ProductCollection/" + k + "/" + columns[10].coulmnKey)
					}),
					new sap.m.Text({
						text: Products.getProperty("/ProductCollection/" + k + "/" + columns[11].coulmnKey)
					}),
					new sap.m.Text({
						text: Products.getProperty("/ProductCollection/" + k + "/" + columns[12].coulmnKey)
					})

				]
			});
			this.getView().byId("idProductsTable").addItem(newRow);
		}

	}

};