sap.ui.controller("ilim.pdm.subst.controller.History", {

  onInit: function() {

    var oConfig = this.getOwnerComponent().getMetadata().getConfig();

  },

  onSelect: function(evt){
    var path = evt.getSource().getBindingContextPath();
    var oModel = this.getView().getModel();
    that = this;
    var data = oModel.read(path, {success: function(odata, resp){
      var hdata = { items: [{
              Pernr : odata.Pernr1,
              Name  : odata.Name1,
              Plans : odata.Plans1,
              Begda : odata.Begda1,
              Endda : odata.Endda1,
              Dopl  : odata.Dopl1,
      },{
              Pernr : odata.Pernr2,
              Name  : odata.Name2,
              Plans : odata.Plans2,
              Begda : odata.Begda2,
              Endda : odata.Endda2,
              Dopl  : odata.Dopl2,
      },{
              Pernr : odata.Pernr3,
              Name  : odata.Name3,
              Plans : odata.Plans3,
              Begda : odata.Begda3,
              Endda : odata.Endda3,
              Dopl  : odata.Dopl3,
      },
      ]
      };
     var oModel = new sap.ui.model.json.JSONModel(hdata);
     that.getView().setModel(oModel,'history');
    }});
    var oDetails = this.byId('Details');
    oDetails.bindElement( path );

  },

  onUpdateFinished: function() {

    var firstItem = this.byId("DetailList").getItems()[0];

    if (firstItem) {
      this.byId("DetailList").setSelectedItem(firstItem, true);
      firstItem.firePress();
    }

  },

});