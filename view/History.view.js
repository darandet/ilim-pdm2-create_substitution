sap.ui.jsview("ilim.pdm.subst.view.History", {

    getControllerName : function() {
        return "ilim.pdm.subst.controller.History";
      },

    createContent : function(oController) {
      this.setDisplayBlock(true);
      var oList = new sap.m.List(this.createId("DetailList"),{
      //mode:"Delete",
      noDataText: "{i18n>nodata}",
      //headerText: "{i18n>checklists}",
      select:function(evt){
        oController.onSelect(evt);
      },
      updateFinished: function(evt){
        oController.onUpdateFinished(evt);
      }
    });

        that = this;

    oList.bindItems('/historySet', function(sId, oContext) {

      var status = oContext.getProperty('Status');
      var s = [];
      s.push( that.getModel('i18n').getProperty('status0') );
      s.push( that.getModel('i18n').getProperty('status1') );
      s.push( that.getModel('i18n').getProperty('status2') );

      var s1 = [];
      s1.push('None');
      s1.push('Success');
      s1.push('Error');
      var statusText  = s[status];
      var statusState = s1[status];

      return new sap.m.ObjectListItem({
        title: "{i18n>itemtitle} {Idznaz}",
          type: sap.m.ListType.Active,
          press: function(evt){
            oController.onSelect(evt);
          },
          attributes: [
                       new sap.m.ObjectAttribute({
                          text:"{Date}"
                       }),
                       new sap.m.ObjectAttribute({
                          text:"{Begda} - {Endda}"
                       })
                       ],
          firstStatus: new sap.m.ObjectStatus({text:  "{Status}",
                             state: {
                                    path: "StatusCode",
                                    formatter: function(val){
                                        switch (val){
                                        case "1": return "Success";
                                        case "2": return "Error";
                                        case "0": return "None";
                                        case "": return "None";
                                        }
                                    }
        }
        })
      })

    });
//      {path: "/historySet",
//      template: new sap.m.ObjectListItem({
//        title: "{i18n>itemtitle} {Idznaz}",
//          type: sap.m.ListType.Active,
//          press: function(evt){
//            oController.onSelect(evt);
//          },
//          attributes: [
//                       new sap.m.ObjectAttribute({
//                          text:"{Date}"
//                       }),
//                       new sap.m.ObjectAttribute({
//                          text:"{Begda} - {Endda}"
//                       })
//                       ],
//        firstStatus: new sap.m.ObjectStatus({text:"{Status}",
//                             state: "Success"})
//      })
//    });

        var oHeader = new sap.m.ObjectHeader(this.createId('Details'),{
          //binding:"{historyItem>/item}",
          title:"{i18n>itemtitle} {Idznaz} {i18n>from} {Date}",
          attributes:[
                     new sap.m.ObjectAttribute({
                        text:"{Pole2}"
                     }),
                     new sap.m.ObjectAttribute({
                        text:"{Pole3}"
                     }),
                     new sap.m.ObjectAttribute({
                        text:"{Pole4}"
                     }),
                     new sap.m.ObjectAttribute({
                        text:"{i18n>vac_request} {Pole5}"
                     }),
                     new sap.m.ObjectAttribute({
                        text:"{Pole6}"
                     }),
                     ],
          statuses: [
       	            new sap.m.ObjectStatus({
                    text:"{Subty}",
                    state: "None"
                  }),
       	            new sap.m.ObjectStatus({
                    text:"{Begda} - {Endda}",
                    state: "None"
                  }),
                  new sap.m.ObjectStatus({
                    text:"{Status}",
                    state: {
                    path: "StatusCode",
                    formatter: function(val){
                        switch (val){
                        case "1": return "Success";
                        case "2": return "Error";
                        case "0": return "None";
                        case "": return "None";
                        }
                    }
                  }
                  }),
                                           ]
        });

    var oTabs = new sap.m.IconTabBar({
      items: [
              new sap.m.IconTabFilter({
                //text : "{i18n>}",
                icon : "sap-icon://notification",
                visible: true,
                iconColor: sap.ui.core.IconColor.Positive,
                content : [
                  new sap.ui.core.mvc.JSView({
                    viewName: "ilim.pdm.subst.view.FormH",
                    type:   sap.ui.core.mvc.ViewType.JS
                    })
                 ]
              })
      ]
    });


        var oApp = new sap.m.SplitApp(this.createId("rootControlId2"));
        var oPage = new sap.m.Page({
          title: "{i18n>requests}",
          showHeader: true,
          showNavButton: true,
          navButtonTap: function(evt){window.history.go(-1)},
          content: [ oList ]

        });
        var oPage2 = new sap.m.Page({
          title: "{i18n>request}",
          showHeader: true,
          //showNavButton: true,
          navButtonTap: function(evt){window.history.go(-1)},
          content: [ oHeader, oTabs ]

        });
        oApp.addMasterPage(oPage);
        oApp.addDetailPage(oPage2);
        return oApp;
    },

} );