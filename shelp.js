jQuery.sap.declare("ilim.pdm.subst.shelp");

ilim.pdm.subst.Shelp = function(oOptions){
	
	this.path    = oOptions.path;
	this.nofound = oOptions.nofound;
	this.title   = oOptions.title;
	this.view    = oOptions.view;
	this.fresult = oOptions.fresult;
	that = this;
	this.oDialog = new sap.m.SelectDialog({

		noDataText:this.nofound,
		title:  this.title,
		search: function(evt){that.handleSearch(evt)},
		confirm:function(evt){that.handleClose(evt)},
		close:  function(evt){that.handleClose(evt)},
		
	});
	
	this.oDialog.setModel(oOptions.model);
	
	this.oDialog.bindAggregation('items',this.path, new sap.m.StandardListItem({
			title: oOptions.ititle,
			description: oOptions.idescription,
		    type: sap.m.ListType.Active,
		})
	);	
	

};

ilim.pdm.subst.Shelp.prototype.handleSearch = function(oEvent){
	var sValue = oEvent.getParameter("value");
	var oFilter = new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sValue);
	var oBinding = oEvent.getSource().getBinding("items");
	oBinding.filter([oFilter]);	
};

ilim.pdm.subst.Shelp.prototype.handleClose = function(oEvent){
	var aContexts = oEvent.getParameter("selectedContexts");
	if (aContexts.length) {
		this.fresult( aContexts, this._source );
	}
	oEvent.getSource().getBinding("items").filter([]);	
};

ilim.pdm.subst.Shelp.prototype.show = function( source ) {
	this._source = source;
	jQuery.sap.syncStyleClass("sapUiSizeCompact", this.view, this.oDialog);
	this.oDialog.getBinding("items").filter([]);
	this.oDialog.open();	

};