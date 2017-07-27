sap.ui.jsview("ilim.pdm.subst.view.Form", {

  getControllerName : function() {

      return "ilim.pdm.subst.controller.Form";

  },


  createContent : function(oController) {

    var oTable = new sap.m.Table({
                   columns: [new sap.m.Column({
                               header: new sap.m.Label({text:"{i18n>pernr}"})
                             }),
                             new sap.m.Column({
                               header: new sap.m.Label({text:"{i18n>pernm}"})
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
                      cells: [new sap.m.Input({
                                value:"{request>pernr}",
                                showValueHelp: true,
                                valueHelpRequest: function(evt){ oController.shPernr(evt) }
                              }),
                              new sap.m.Label({
                                text: "{request>name}"
                              }),
                              new sap.m.DatePicker({value:"{request>begda}",
                                displayFormat: "dd.MM.yyyy",
                                placeholder: "{i18n>begda}"
                              }),
                              new sap.m.DatePicker({value:"{request>endda}",
                                displayFormat: "dd.MM.yyyy",
                                placeholder: "{i18n>endda}"
                              }),
                              new sap.m.Input({
                                value:"{request>perc}"
                              })
                             ]
                    });

    oTable.bindAggregation("items", "request>/items", oTemplate);

    var oForm = new sap.ui.layout.form.SimpleForm({
                  maxContainerCols: 2,
                  editable: true,
                  layout: "ResponsiveGridLayout",
                  labelSpanL: 3,
                  labelSpanM: 3,
                  emptySpanL: 4,
                  emptySpanM: 4,
                  content: [new sap.m.Label({text:"{i18n>number}"}),
                            new sap.m.Input({
                              value:"{request>/number}",
                              showValueHelp: true,
                              valueHelpRequest:function(evt){ oController.shNumber(evt) }
                            }),
                           ]
                });

    var oPanel = new sap.m.Panel(this.createId("vac_panel"), {
                   expandable: true,
                   headerText: "{i18n>detailed_info}",
                 });

    var oVacForm = new sap.ui.layout.form.SimpleForm({
                     maxContainerCols: 2,
                     editable: true,
                     layout: "ResponsiveGridLayout",
                     labelSpanL: 3,
                     labelSpanM: 3,
                     emptySpanL: 4,
                     emptySpanM: 4,
                     content: [new sap.m.Label({text:"{i18n>vac_pernr}"}),
                               new sap.m.Text(this.createId("vac_pernr")),
                               new sap.m.Label({text:"{i18n>vac_fio}"}),
                               new sap.m.Text(this.createId("vac_fio")),
                               new sap.m.Label({text:"{i18n>vac_period}"}),
                               new sap.m.Text(this.createId("vac_period"))
                              ]
                   });

    oPanel.addContent(oVacForm);

    return [oForm, oPanel, oTable];

  }

});