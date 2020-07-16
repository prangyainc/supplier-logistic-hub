sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"../utility/formatter",
	"sap/ui/core/Fragment",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV"
], function (Controller, JSONModel, formatter, Fragment, MessageBox, MessageToast, Export, ExportTypeCSV) {
	"use strict";

	return Controller.extend("inc.lch.FUS.FreightUnits_Supplier.controller.Home", {
		formatter: formatter,
		onInit: function () {
			var oMdlCommon = this.getOwnerComponent().getModel("oDataModel");
			var sRootPath = jQuery.sap.getModulePath("inc.lch.FUS.FreightUnits_Supplier");
			oMdlCommon.attachRequestCompleted(function (oEvent) {});
			oMdlCommon.loadData(sRootPath + "/model/Columns.json", null, false);
			var colModel = new JSONModel("model/Columns.json");
			this.getView().setModel(colModel, "ColModel");
			var oModel2 = new JSONModel("model/navigation.json");
			this.getView().setModel(oModel2, "oNavigationModel");
			var oModel3 = new JSONModel("model/products.json");
			this.getView().setModel(oModel3, "oTableModel");

			var aColumnCollection = colModel.getProperty("/ColumnCollection");
			this.getOwnerComponent().getModel("oDataModel").setProperty("/ColumnCollection", aColumnCollection);
			this.getOwnerComponent().getModel("oDataModel").setProperty("/ProductCollection", oModel3);
			//this.columnListItem();
			var oThisController = this;
			this.aDrafts = [];
			

		},
		onItemSelect: function (oEvent) {
			var oItem = oEvent.getParameter("item");
			this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
		},
		onSideNavButtonPress: function () {
			var oToolPage = this.byId("FU_supplier");
			var bSideExpanded = oToolPage.getSideExpanded();

			this._setToggleButtonTooltip(bSideExpanded);

			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
		},

		_setToggleButtonTooltip: function (bLarge) {
			var oToggleButton = this.byId("sideNavigationToggleButton");
			if (bLarge) {
				oToggleButton.setTooltip("Large Size Navigation");
			} else {
				oToggleButton.setTooltip("Small Size Navigation");
			}
		},
		populateItems: function (sId, oContext) {
			var that = this;
			var data = oContext;
			var sPath = oContext.getPath();
			var columns = this.getView().getModel("ColModel").getProperty("/ColumnCollection");
			var row = new sap.m.ColumnListItem(sId, {
				type: "Active",
				cells: [
					new sap.m.Text({
						text: data.getProperty(sPath + "/" + columns[0].columnKey)
					}),
					new sap.m.Text({
						text: data.getProperty(sPath + "/" + columns[1].columnKey)
					}),
					new sap.m.Text({
						text: data.getProperty(sPath + "/" + columns[2].columnKey)
					}),
					new sap.m.Text({
						text: data.getProperty(sPath + "/" + columns[3].columnKey)
					}),
					new sap.m.Text({
						text: data.getProperty(sPath + "/" + columns[4].columnKey)
					}),
					new sap.m.Text({
						text: data.getProperty(sPath + "/" + columns[5].columnKey)
					}),
					new sap.m.Text({
						text: data.getProperty(sPath + "/" + columns[6].columnKey)
					}),
					new sap.m.Text({
						text: data.getProperty(sPath + "/" + columns[7].columnKey)
					}),
					new sap.m.Text({
						text: data.getProperty(sPath + "/" + columns[8].columnKey)
					}),
					new sap.m.Text({
						text: data.getProperty(sPath + "/" + columns[9].columnKey)
					}),
					new sap.m.Text({
						text: data.getProperty(sPath + "/" + columns[10].columnKey)
					}),
					new sap.m.Text({
						text: data.getProperty(sPath + "/" + columns[11].columnKey)
					}),
					new sap.m.Text({
						text: data.getProperty(sPath + "/" + columns[12].columnKey)
					}),
					new sap.m.Button({
						icon: "sap-icon://edit",
						press: function () {
							that.onPressEdit(sPath);
						}
					})

				]
			});

			return row;
		},
		onPressGroupAndConfirm: function (oEvent) {
			var oTable = this.getView().byId("idRequestsTable");
			var idx = oTable.indexOfItem(oTable.getSelectedItem());
			if (idx !== -1) {
				var oItems = oTable.getSelectedItems();
				var oSelectedItems = [];
				for (var i = 0; i < oItems.length; i++) {
					oSelectedItems.push(oItems[i].getBindingContext("oTableModel").getObject());
				}
				if (oSelectedItems.length >= 2) {
					// var oGroupModel = new sap.ui.model.json.JSONModel();
					// this.getView().setModel(oGroupModel, "oGroupModel");
					this.getView().getModel("oTableModel").setProperty("/oSelectedItems", $.extend(true, [], oSelectedItems));
					var aColumnList = this.getView().getModel("ColModel").getProperty("/ColumnCollection");
					this.getView().getModel("ColModel").setProperty("/ColumnCollection", aColumnList);
					if (!this._oDialog) {
						//this._oDialog = sap.ui.xmlfragment("com.demo.odata.Demo_Odata_Service.fragment.addItem", this);
						this._oDialog = sap.ui.xmlfragment("idGroupandConfirm", "inc.lch.FUS.FreightUnits_Supplier.fragments.groupandconfirm", this);
					}
					this.getView().addDependent(this._oDialog);
					this._oDialog.open();
				} else {
					sap.m.MessageBox.alert("Please Select atleast 2 Items");
				}
			} else {
				sap.m.MessageBox.alert("Please Select the Items");
			}

		},

		ChangeOrder: function () {
			var openAssetTable = this.getView().byId("idProductsTable"),
				columnHeader = openAssetTable.getColumns();
			var openAssetColumns = [];
			for (var i = 0; i < columnHeader.length; i++) {
				var hText = columnHeader[i].getAggregation("header").getProperty("text");
				var columnObject = {};
				columnObject.columnKey = hText;
				columnObject.visible = columnHeader[i].getBindingContext("ColModel").
				getModel().getProperty(columnHeader[i].getBindingContext(
					"ColModel").getPath()).visible;
				openAssetColumns.push(columnObject);
			}

			var cJSONModel = new sap.ui.model.json.JSONModel({
				ColumnCollection: openAssetColumns
			});
			this.getView().setModel(cJSONModel, "p13Dialog");

			var dialog = sap.ui.xmlfragment("idPreference", "inc.lch.FUS.FreightUnits_Supplier.fragments.preferences", this.getView().getController());
			this.getView().addDependent(dialog);
			dialog.open();
		},
		onOK: function (oEvent) {
			var data = {
				ColumnCollection: oEvent.getParameter("payload").columns.tableItems
			};

			var oJSONModel = new sap.ui.model.json.JSONModel();
			oJSONModel.setData(data);
			this.getView().setModel(oJSONModel, "ColModel");
			this.byId("idProductsTable").setWidth("100%");
			this.columnListItem();
			oEvent.getSource().close();
		},
		columnListItem: function () {
			if (this.byId("newRow") !== undefined) {
				this.byId("newRow").destroy();
			}
			this.byId("idProductsTable").destroyItems();
			this.byId("idRequestsTable").destroyItems();
			var data = this.getView().getModel("ColModel").getData().ColumnCollection;
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
			this.fnTablePopulate("idProductsTable", columns);
			this.fnTablePopulate("idRequestsTable", columns);

		},
		fnTablePopulate: function (sId, aColumnList) {
			var Products = this.getView().getModel("oTableModel");
			var rows = Products.getProperty("/ProductCollection").length;
			for (var k = 0; k < rows; k++) {
				var newRow = new sap.m.ColumnListItem(this.createId(sId + "row" + k), {
					type: "Active",
					cells: [
						new sap.m.Text({
							text: Products.getProperty("/ProductCollection/" + k + "/" + aColumnList[0].coulmnKey)
						}),
						new sap.m.Text({
							text: Products.getProperty("/ProductCollection/" + k + "/" + aColumnList[1].coulmnKey)
						}),
						new sap.m.Text({
							text: Products.getProperty("/ProductCollection/" + k + "/" + aColumnList[2].coulmnKey)
						}),
						new sap.m.Text({
							text: Products.getProperty("/ProductCollection/" + k + "/" + aColumnList[3].coulmnKey)
						}),
						new sap.m.Text({
							text: Products.getProperty("/ProductCollection/" + k + "/" + aColumnList[4].coulmnKey)
						}),
						new sap.m.Text({
							text: Products.getProperty("/ProductCollection/" + k + "/" + aColumnList[5].coulmnKey)
						}),
						new sap.m.Text({
							text: Products.getProperty("/ProductCollection/" + k + "/" + aColumnList[6].coulmnKey)
						}),
						new sap.m.Text({
							text: Products.getProperty("/ProductCollection/" + k + "/" + aColumnList[7].coulmnKey)
						}),
						new sap.m.Text({
							text: Products.getProperty("/ProductCollection/" + k + "/" + aColumnList[8].coulmnKey)
						}),
						new sap.m.Text({
							text: Products.getProperty("/ProductCollection/" + k + "/" + aColumnList[9].coulmnKey)
						}),
						new sap.m.Text({
							text: Products.getProperty("/ProductCollection/" + k + "/" + aColumnList[10].coulmnKey)
						}),
						new sap.m.Text({
							text: Products.getProperty("/ProductCollection/" + k + "/" + aColumnList[11].coulmnKey)
						}),
						new sap.m.Text({
							text: Products.getProperty("/ProductCollection/" + k + "/" + aColumnList[12].coulmnKey)
						})

					]
				});
				this.byId(sId).addItem(newRow);
				//this.byId("idRequestsTable").addItem(newRow);
			}

		},
		onDownload: sap.m.Table.prototype.exportData || function () {

			//var oModel1 = sap.ui.getCore().getModel("oTableModel");
			var oModel = this.getView().getModel("oTableModel");
			var oExport = new Export({

				exportType: new ExportTypeCSV({
					fileExtension: "xls",
					mimeType: "application/vnd.ms-excel",
					separatorChar: "\t"
				}),

				models: oModel,

				rows: {
					path: "/ProductCollection"
				},
				columns: [{
					name: "ProductId",
					template: {
						content: "{ProductId}"
					}
				}, {
					name: "Name",
					template: {
						content: "{Name}"
					}
				}, {
					name: "SupplierName",
					template: {
						content: "{SupplierName}"
					}
				}, {
					name: "Category",
					template: {
						content: "{Category}"
					}
				}, {
					name: "Quantity",
					template: {
						content: "{Quantity}"
					}
				}, {
					name: "Price",
					template: {
						content: "{Price}"
					}
				}, {
					name: "Description",
					template: {
						content: "{Description}"
					}
				}]
			});
			console.log(oExport);
			oExport.saveFile().catch(function (oError) {

			}).then(function () {
				oExport.destroy();
			});
		},
		onPressAddNew: function () {
			this.bFlag = true;

			this._oDialog = sap.ui.xmlfragment("idAddItemFrag", "inc.lch.FUS.FreightUnits_Supplier.fragments.addnew", this);

			// var oModel = this.getView().getModel("oTableModel");
			// var data = this.getView().getModel("oTableModel").getProperty("/ProductCollection");
			//console.log(oDataGlobalModel);
			// var lastId = data[data.length - 1].ProductId + 1;
			// oModel.setProperty("/edit", {
			// 	"ProductId": lastId,
			// 	"Name": ""
			// });

			//Fragment.byId("idEditItemFrag", "idProdId").setVisible(false);

			this.getView().addDependent(this._oDialog);
			this._oDialog.open();
		},
		onSaveAdd: function (oEvent) {
			var that = this;
			//var oModel = that.getView().getModel("oTableModel");
			// var oTable = that.getView().byId("idGroupTable");
			// var oData = oTable.getBinding("items").getModel("oTableModel");
			// this.getView().getModel("oGroupModel").setProperty("/ProductCollection").push({
			// 	Name: ''
			// });
			//newArray.ProductCollection.push({Name : '', size : ''});
			//this.oModel.refresh();
			// var oGroupModel = new sap.ui.model.json.JSONModel();
			// this.getView().setModel(oGroupModel, "oGroupModel");
			var oProduct = sap.ui.core.Fragment.byId("idAddItemFrag", "idProdId").getValue();
			var oName = sap.ui.core.Fragment.byId("idAddItemFrag" ,"idName").getValue();
			var oModel = this.getView().getModel("oTableModel");
			var oData = {
				ProductId: oProduct,
				Name: oName
			};
			var oModelData = oModel.getProperty("/oSelectedItems");
			oModelData.push(oData);
			oModel.setProperty("/oSelectedItems", oModelData);
			
			this._oDialog.close();
			this._oDialog.destroy();
			this._oDialog = null;
		},
		onPressEdit: function (path) {
			this.bFlag = false;
			var model = this.getView().getModel("oTableModel");
			var obj = model.getProperty(path);

			var id = obj.ProductId;
			var name = obj.Name;
			var price = obj.Price;
			// var rating = obj.Rating;
			// var release = obj.ReleaseDate;

			var edit = {
				"ProductId": id,
				"Name": name,
				"Price": price,
				// "Rating": rating,
				// "ReleaseDate": release,
				"sPath": path

			};

			var oModel = new JSONModel();
			this.getView().setModel(oModel, "oViewModel");
			oModel.setProperty("/edit", edit);
			this.selectedBackUp = $.extend(true, {}, oModel.getData()["/ProductCollection"]);

			this._oDialog = sap.ui.xmlfragment("idEditItemFrag", "inc.lch.FUS.FreightUnits_Supplier.fragments.edit", this);

			this.getView().addDependent(this._oDialog);
			this._oDialog.open();
		},
		onSave: function () {
			if (this.bFlag === false) {
				var oModel = this.getView().getModel("oViewModel");
				var oTableModel = this.getView().getModel("oTableModel");
				var oEdit = $.extend(true, {}, oModel.getProperty("/edit"));
				var sPath = oEdit.sPath;
				oTableModel.setProperty(sPath, oEdit);
			}

			this._oDialog.close();
			this._oDialog.destroy();
			this._oDialog = null;

		},
		onCancel: function (sPath) {
			var that = this;

			this._oDialog.close();
			this._oDialog.destroy();
			this._oDialog = null;
			that.populateItems();
			if (this.bFlag === false) {
				var oModel = this.getView().getModel("oTableModel");
				oModel.setProperty("/ProductCollection", this.selectedBackUp);
			}
		},
		fnDelete: function (oEvent) {
			var that = this;
			sap.m.MessageBox.warning("Are you sure?", {
				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
				emphasizedAction: [sap.m.MessageBox.Action.CANCEL],
				onClose: function (sAction) {
					//MessageToast.show("Action selected: " + sAction);
					var action = sAction;
					if (action === "OK") {
						var oTable = that.getView().byId("idDraftsTable");
						var aSelectedItems = oTable.getSelectedItems();

						for (var i = aSelectedItems.length - 1; i >= 0; i--) { //start with highest index first 
							var oItemContextPath = aSelectedItems[i].getBindingContext("oTableModel").getPath();
							var aPathParts = oItemContextPath.split("/");
							var iIndex = aPathParts[aPathParts.length - 1]; //Index to delete into our array of objects

							var oData = that.getView().getModel("oTableModel").getProperty("/DraftsCollection");
							oData.splice(iIndex, 1); //Use splice to remove your object in the array
							that.getView().getModel("oTableModel").setProperty("/DraftsCollection",oData); //And set the new data to the model

					}
					}
				}
			});
		},

		fnSaveDraft: function (oEvent) {
			var aSelectedpaths = oEvent.getSource().getParent().getParent().getSelectedContextPaths();
			/*var items = contexts.map(function (c) {
			  return c.getObject();
			});*/

			for (var i = aSelectedpaths.length - 1; i >= 0; i--) { //start with highest index first 

				var aPathParts = aSelectedpaths[i].split("/");
				var iIndex = aPathParts[aPathParts.length - 1]; //Index to delete into our array of objects

				var oJSONData = this.getView().getModel("oTableModel").getProperty("/ProductCollection");
				this.aDrafts.push(this.getView().getModel("oTableModel").getProperty("/ProductCollection/" + iIndex));
				oJSONData.splice(iIndex, 1); //Use splice to remove your object in the array
				this.getView().getModel("oTableModel").setProperty("/ProductCollection", oJSONData); //And set the new data to the model

			}
			this.getView().getModel("oTableModel").setProperty("/DraftsCollection", this.aDrafts);
			oEvent.getSource().getParent().getParent().removeSelections(true);
		},
		fnselecteditems: function () {

		}
	});

});