sap.ui.controller("ilim.pdm.subst.controller.Form", {

  onInit: function() {
    jQuery.sap.require("ilim.pdm.subst.shelp");
    //создаем модель по отсутствиям
    var oConfig = this.getOwnerComponent().getMetadata().getConfig();
  },


  onBeforeRendering: function() {

  },


  onAfterRendering: function() {

  },


  onExit: function() {

  },

  shPernr: function(evt){
    new ilim.pdm.subst.Shelp({
        path: '/pernrListSet',
        view: this.getView(),
        model: this.getView().getModel(),
        fresult: this.shPernrResult,
        ititle: '{Name}',
        idescription: '{Pernr}',
      }).show( evt.getSource() );
  },

  shPernrResult: function(obj, source){
    source.setValue(obj.map(function(o){return o.getObject().Pernr}));
    var sId = source.getId();
    var iInd = sId.slice(-1);
    var data  = this.view.getModel("request").getData();
    var sName = obj.map(function(o){return o.getObject().Name})[0];
    data.items[iInd].name = sName;
  },

  shNumber: function(evt){
    new ilim.pdm.subst.Shelp({
        path: '/leaveListSet',
        view: this.getView(),
        model: this.getView().getModel(),
        fresult: this.shNumberResult,
        ititle: '{Pernr}, {Name}',
        idescription: '№{Number}: {Begda} - {Endda}',
      }).show( evt.getSource() );
  },

  shNumberResult: function(obj, source){
    source.setValue(obj.map(function(o){return o.getObject().Number}));
    this.view.byId("vac_pernr").setText(obj.map(function(o){return o.getObject().Pernr}));
    this.view.byId("vac_fio").setText(obj.map(function(o){return o.getObject().Name}));
    var sText = obj.map(function(o){return o.getObject().Begda}) + " - ";
    sText = sText + obj.map(function(o){return o.getObject().Endda})
    this.view.byId("vac_period").setText(sText  );
  },

});