sap.ui.jsview("ilim.pdm.subst.view.Main", {

    getControllerName : function() {

      return "ilim.pdm.subst.controller.Main";

    },


    createContent : function(oController) {

      this.setDisplayBlock(true);
      var oApp  = new sap.m.App(this.createId('rootControlId'));

      var oView = new sap.ui.core.mvc.JSView(this.createId("form_view"),{
                    viewName: "ilim.pdm.subst.view.Form",
                    type:     sap.ui.core.mvc.ViewType.JS
                  });

      var oTabs = new sap.m.IconTabBar({
                    items: [
                      new sap.m.IconTabFilter({
                        //text : "{i18n>}",
                        icon : "sap-icon://edit",
                        visible: true,
                        iconColor: sap.ui.core.IconColor.Positive,
                        content : [oView]
                      })
                    ]
                  });

      var oPage = new sap.m.Page({
                    title: "{i18n>title}",
                    showHeader: true,
                    content: [ oTabs ],
                    showNavButton: true,
                    navButtonPress: function(){
                        window.history.go(-1);
                    },
                    footer: [new sap.m.Bar({
                              contentRight: [
                                new sap.m.Button({
                                  //icon:"sap-icon://form",
                                  text: "{i18n>send}",
                                  type: sap.m.ButtonType.Accept,
                                  press:function(evt){oController.send(evt)}
                                }),
                                new sap.m.Button({
                                  //icon:"sap-icon://work-history",
                                  text: "{i18n>history}",
                                  //type: sap.m.ButtonType.,
                                  press:function(evt){oController.toHistory(evt)}
                                }),
                              ]
                            })],
                  });

      oApp.addPage(oPage);
      return oApp;

    },

});