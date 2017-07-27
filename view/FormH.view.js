sap.ui.jsview("ilim.pdm.subst.view.FormH", {

  getControllerName : function() {

      return "ilim.pdm.subst.controller.FormH";

  },


  createContent : function(oController) {

    var oTable = new sap.m.Table(this.createId('hTable'), {
                   columns: [new sap.m.Column({
                               header: new sap.m.Label({text:"{i18n>empl}"})
                             }),
                             new sap.m.Column({
                               header: new sap.m.Label({text:"{i18n>begda}"})
                             }),
                             new sap.m.Column({
                               header: new sap.m.Label({text:"{i18n>endda}"})
                             }),
                             new sap.m.Column({
                               header: new sap.m.Label({text:"{i18n>perc}"})
                             })
                            ]
                 });

    var oTemplate = new sap.m.ColumnListItem({
                      cells: [new sap.m.ObjectIdentifier({title:"{history>Name}",
                                text:"{history>Plans}",
                              }),
                              new sap.m.Text({text:"{history>Begda}"}),
                              new sap.m.Text({text:"{history>Endda}"}),
                              new sap.m.Text({text:"{history>Dopl}"})
                             ]
                    });

    oTable.bindAggregation("items", "history>/items", oTemplate);

    return oTable;

  }

});