sap.ui.controller("ilim.pdm.subst.controller.Main", {

  onInit: function() {
    jQuery.sap.require("sap.m.MessageBox");
    var oConfig = this.getOwnerComponent().getMetadata().getConfig();
    //var oModel = new sap.ui.model.odata.v2.ODataModel(oConfig.modelFull);
    var oModel = new sap.ui.model.odata.v2.ODataModel(oConfig.model);
    oModel.attachRequestSent(function(){
        sap.ui.core.BusyIndicator.show(0);
    });

    oModel.attachRequestCompleted(function(){
        sap.ui.core.BusyIndicator.hide();
    });

    this.getView().setModel(oModel);
    this.oDataModel = oModel;
    this.initModel(this);
  },

  initModel: function(that){
    var data = {number: '',
                vac_pernr: '',
                vac_begda: '',
                vac_endda: '',
                items: [{ pernr: '',
                          name:  '',
                          begda: '',
                          endda: '',
                          perc:  '0' },
                        { pernr: '',
                          name:  '',
                          begda: '',
                          endda: '',
                          perc:  '' },
                        { pernr: '',
                          name:  '',
                          begda: '',
                          endda: '',
                          perc:  '' },
                       ]};
    var oModel = new sap.ui.model.json.JSONModel(data);
    oModel.setDefaultBindingMode("TwoWay");
    that.getView().setModel(oModel,'request');
    var oView = that.getView().byId("form_view");
    oView.byId("vac_pernr").setText('');
    oView.byId("vac_fio").setText('');
    oView.byId("vac_period").setText('');
    oView.byId("vac_panel").setExpanded(false);
  },

  toHistory: function(evt){
    this.getOwnerComponent().getRouter().navTo("history");
  },

  send: function(evt){
    var data  = this.getView().getModel("request").getData();
    var struc = {
        "Number":  data.number,
        "Pernr1":  data.items[0].pernr,
        "Pernr2":  data.items[1].pernr,
        "Pernr3":  data.items[2].pernr,
        "Begda1":  data.items[0].begda,
        "Begda2":  data.items[1].begda,
        "Begda3":  data.items[2].begda,
        "Endda1":  data.items[0].endda,
        "Endda2":  data.items[1].endda,
        "Endda3":  data.items[2].endda,
        "Dopl1":   data.items[0].perc,
        "Dopl2":   data.items[1].perc,
        "Dopl3":   data.items[2].perc,
    };

    oModel         = this.getView().getModel();
    //oModel.setHeaders({"content-type" : "application/json;charset=utf-8"});
    var oParams    = { };
    that           = this;
    var strSuccess = this.getView().getModel('i18n').getProperty('success');

    oParams.success = function(){
      var bCompact = that.getView().$().closest(".sapUiSizeCompact").length;
      sap.m.MessageBox.success(strSuccess, {
        styleClass: bCompact? "sapUiSizeCompact" : ""
      });
      that.initModel(that);
    };

    oParams.error = function(resp){
      var message = JSON.parse(resp.responseText).error.message.value;
      var bCompact = that.getView().$().closest(".sapUiSizeCompact").length;
      if ( message.indexOf("(") > 0 )
      {
        var msg2 = message.substring(message.indexOf("(")+1, message.lastIndexOf(")"));
      }
      else
      {
        var msg2 = message;
      };
      sap.m.MessageBox.error(msg2, {
        styleClass: bCompact? "sapUiSizeCompact" : ""
      });
    };

    oParams.async = true;
    oModel.create("/requestSet", struc, oParams);

  },

});