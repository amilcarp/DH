//---- Variables
var pathAPI = "https://datosabiertos.unam.mx/api/alice/";
var tipoDer = [];
var countDer = [];
var cuadroDer =  '';
var tablaIndContAE = '', tablaIndContAP = '', tablaIndContAR = '';
var tablaIndContCE = '', tablaIndContCP = '', tablaIndContCR = '';
var tablaIndContDE = '', tablaIndContDP = '', tablaIndContDR = '';
var tablaIndContFE = '', tablaIndContFP = '', tablaIndContFR = '';
var tablaIndContIE = '', tablaIndContIP = '', tablaIndContIR = '';
var tablaIndContJE = '', tablaIndContJP = '', tablaIndContJR = '';
var tablaIndContMatrizAE = '';
var tablaIndContMatrizCE = '';
var tablaIndContMatrizDE = '';
var tablaIndContMatrizFE = '';
var tablaIndContMatrizIE = '';
var tablaIndContMatrizJE = '';
var tablaIndContMatrizAP = '';
var tablaIndContMatrizCP = '';
var tablaIndContMatrizDP = '';
var tablaIndContMatrizFP = '';
var tablaIndContMatrizIP = '';
var tablaIndContMatrizJP = '';
var tablaIndContMatrizAR = '';
var tablaIndContMatrizCR = '';
var tablaIndContMatrizDR = '';
var tablaIndContMatrizFR = '';
var tablaIndContMatrizIR = '';
var tablaIndContMatrizJR = '';


$(document).ready(function () {
    //derechos();
    // Función para visualizar derechos disponibles
        var nombres = []; 
        $.ajax({
            type:'GET',
            url: pathAPI + "search?q=*:*&rows=0&fac.json={array:{type:%22terms%22,field:%22right_name_short_lit%22,limit:10,facet:{unique_indicators:%22unique(indicator_name_lit)%22,indicators_null:{type:%22query%22,q:%22-indicator_name:[*%20TO%20*]%22}}}}",
            data: {},
            success: function( data, textStatus, jqxhr ) {  
                
              countDer = data['fac.json']['array']['buckets'];
                //console.log(countDer);
              
              for(var i = 0; i < countDer.length; i++){
                  nombres.push(countDer[i]['val']);
              }
              
                
                var k = 3;
              
              for(var i = 0; i < countDer.length; i++){
                  var h = i+1;
                  //console.log(countDer[i]['val']);
                      if(h == 1 || h == 4 || h == 7 || h == 10 || h == 13 || h == 16){
                          cuadroDer += '<div class="row">';
                          cuadroDer += '<div class="col-md-4 ' + sinEspacios(countDer[i]['val']) + '">'+
                                     '<a href="#'+ sinEspacios(countDer[i]['val']) +'" class="">'+
                                         '<div class="cuadro-derechos b'+h+'">'+
                                             '<div class="d'+h+'">' +
                                                 '<h2>'+ countDer[i]['val']+'</h2>'+
                                              '</div>'+
                                        '</div>'+
                                     '</a>'+
                                     '<div class="arrow-up none"></div>'+
                                  '</div>';
                      }else if(h == 3 || h == 6 || h == 9 || h == 12 || h == 15 || h == 18 || h == countDer.length){
                          cuadroDer += '<div class="col-md-4 ' + sinEspacios(countDer[i]['val']) + '">'+
                                     '<a href="#'+ sinEspacios(countDer[i]['val']) +'" class="">'+
                                         '<div class="cuadro-derechos b'+h+'">'+
                                             '<div class="d'+h+'">' +
                                                 '<h2>'+ countDer[i]['val']+'</h2>'+
                                              '</div>'+
                                        '</div>'+
                                     '</a>'+
                                     '<div class="arrow-up none"></div>'+
                                  '</div>';
                               cuadroDer += '</div><br /><div class="indis'+h+'"></div>';
                      }else{
                          cuadroDer += '<div class="col-md-4 ' + sinEspacios(countDer[i]['val']) + '">'+
                                     '<a href="#'+ sinEspacios(countDer[i]['val']) +'" class="' + sinEspacios(countDer[i]['val']) + '">'+
                                         '<div class="cuadro-derechos b'+h+'">'+
                                             '<div class="d'+h+'">' +
                                                 '<h2>'+ countDer[i]['val']+'</h2>'+
                                              '</div>'+
                                        '</div>'+
                                     '</a>'+
                                     '<div class="arrow-up none"></div>'+
                                  '</div>';
                      }
                  
              }
                $('.Culturales .arrow-up').removeClass('none');
                $('#derechos').html(cuadroDer);

                
                $('.Culturales').on('click', function(){
                    $('.indis3').html('');
                    $('.indis5').html('');
                    $('.internoDerecho').css('display','none');
                    $('.internoDerechoMatriz').css('display','none');
                    $('.col-md-4 .arrow-up').addClass('none');
                    $('.Culturales .arrow-up').removeClass('none');
                    $('.indis3').html(indicadoresDerecho(idC));
                    $('.btnListado').hide();

                      $('.internoDerecho').show();
                      $('.internoDerechoMatriz').hide();

                      $('.btnMatriz').on( "click", function() {
                          $('.internoDerecho').hide();
                          $('.internoDerechoMatriz').show();
                          $('.btnMatriz').hide();
                          $('.btnListado').show();
                        });

                        $('.btnListado').on( "click", function() {
                          $('.internoDerecho').show();
                          $('.internoDerechoMatriz').hide();
                          $('.btnMatriz').show();
                          $('.btnListado').hide();
                        });
                    $('.btnEstructural').on('click', function(){
                        $('.trE').show();
                        $('.trP').hide();
                        $('.trR').hide();
                    });


                    $('.btnProceso').on('click', function(){
                        $('.trE').hide();
                        $('.trP').show();
                        $('.trR').hide();
                    });

                    $('.btnResultado').on('click', function(){
                        $('.trE').hide();
                        $('.trP').hide();
                        $('.trR').show();
                    });
                });
                $('.MedioAmbiente').on('click', function(){
                    $('.indis3').html('');
                    $('.indis5').html('');
                    $('.internoDerecho').css('display','none');
                    $('.internoDerechoMatriz').css('display','none');
                    $('.col-md-4 .arrow-up').addClass('none');
                    $('.MedioAmbiente .arrow-up').removeClass('none');
                    $('.indis3').html(indicadoresDerecho(idM));
                    $('.btnListado').hide();

                      $('.internoDerecho').show();
                      $('.internoDerechoMatriz').hide();

                      $('.btnMatriz').on( "click", function() {
                          $('.internoDerecho').hide();
                          $('.internoDerechoMatriz').show();
                          $('.btnMatriz').hide();
                          $('.btnListado').show();
                        });

                        $('.btnListado').on( "click", function() {
                          $('.internoDerecho').show();
                          $('.internoDerechoMatriz').hide();
                          $('.btnMatriz').show();
                          $('.btnListado').hide();
                        });
                    $('.btnEstructural').on('click', function(){
                        $('.trE').show();
                        $('.trP').hide();
                        $('.trR').hide();
                    });


                    $('.btnProceso').on('click', function(){
                        $('.trE').hide();
                        $('.trP').show();
                        $('.trR').hide();
                    });

                    $('.btnResultado').on('click', function(){
                        $('.trE').hide();
                        $('.trP').hide();
                        $('.trR').show();
                    });
                });
                $('.Trabajo').on('click', function(){
                    $('.indis3').html('');
                    $('.indis5').html('');
                    $('.internoDerecho').css('display','none');
                    $('.internoDerechoMatriz').css('display','none');
                    $('.col-md-4 .arrow-up').addClass('none');
                    $('.Trabajo .arrow-up').removeClass('none');
                    $('.indis3').html(indicadoresDerecho(idT));
                    $('.btnListado').hide();

                      $('.internoDerecho').show();
                      $('.internoDerechoMatriz').hide();

                      $('.btnMatriz').on( "click", function() {
                          $('.internoDerecho').hide();
                          $('.internoDerechoMatriz').show();
                          $('.btnMatriz').hide();
                          $('.btnListado').show();
                        });

                        $('.btnListado').on( "click", function() {
                          $('.internoDerecho').show();
                          $('.internoDerechoMatriz').hide();
                          $('.btnMatriz').show();
                          $('.btnListado').hide();
                        });
                    $('.btnEstructural').on('click', function(){
                        $('.trE').show();
                        $('.trP').hide();
                        $('.trR').hide();
                    });


                    $('.btnProceso').on('click', function(){
                        $('.trE').hide();
                        $('.trP').show();
                        $('.trR').hide();
                    });

                    $('.btnResultado').on('click', function(){
                        $('.trE').hide();
                        $('.trP').hide();
                        $('.trR').show();
                    });
                });
                $('.Sindicales').on('click', function(){
                    $('.indis3').html('');
                    $('.indis5').html('');
                    $('.internoDerecho').css('display','none');
                    $('.internoDerechoMatriz').css('display','none');
                    $('.col-md-4 .arrow-up').addClass('none');
                    $('.Sindicales .arrow-up').removeClass('none');
                    $('.indis5').html(indicadoresDerecho(idU));
                    $('.btnListado').hide();

                      $('.internoDerecho').show();
                      $('.internoDerechoMatriz').hide();

                      $('.btnMatriz').on( "click", function() {
                          $('.internoDerecho').hide();
                          $('.internoDerechoMatriz').show();
                          $('.btnMatriz').hide();
                          $('.btnListado').show();
                        });

                        $('.btnListado').on( "click", function() {
                          $('.internoDerecho').show();
                          $('.internoDerechoMatriz').hide();
                          $('.btnMatriz').show();
                          $('.btnListado').hide();
                        });
                    $('.btnEstructural').on('click', function(){
                        $('.trE').show();
                        $('.trP').hide();
                        $('.trR').hide();
                    });


                    $('.btnProceso').on('click', function(){
                        $('.trE').hide();
                        $('.trP').show();
                        $('.trR').hide();
                    });

                    $('.btnResultado').on('click', function(){
                        $('.trE').hide();
                        $('.trP').hide();
                        $('.trR').show();
                    });
                });
                 $('.Alimentacion').on('click', function(){
                    $('.indis3').html('');
                    $('.indis5').html('');
                    $('.internoDerecho').css('display','none');
                    $('.internoDerechoMatriz').css('display','none');
                    $('.col-md-4 .arrow-up').addClass('none');
                    $('.Alimentacion .arrow-up').removeClass('none');
                    $('.indis5').html(indicadoresDerecho(idA));
                     $('.btnListado').hide();

                      $('.internoDerecho').show();
                      $('.internoDerechoMatriz').hide();

                      $('.btnMatriz').on( "click", function() {
                          $('.internoDerecho').hide();
                          $('.internoDerechoMatriz').show();
                          $('.btnMatriz').hide();
                          $('.btnListado').show();
                        });

                        $('.btnListado').on( "click", function() {
                          $('.internoDerecho').show();
                          $('.internoDerechoMatriz').hide();
                          $('.btnMatriz').show();
                          $('.btnListado').hide();
                        });
                     $('.btnEstructural').on('click', function(){
                        $('.trE').show();
                        $('.trP').hide();
                        $('.trR').hide();
                    });


                    $('.btnProceso').on('click', function(){
                        $('.trE').hide();
                        $('.trP').show();
                        $('.trR').hide();
                    });

                    $('.btnResultado').on('click', function(){
                        $('.trE').hide();
                        $('.trP').hide();
                        $('.trR').show();
                    });
                });
                $('.SeguridadSocial').on('click', function(){
                    $('.indis3').html('');
                    $('.indis5').html('');
                    $('.internoDerecho').css('display','none');
                    $('.internoDerechoMatriz').css('display','none');
                    $('.col-md-4 .arrow-up').addClass('none');
                    $('.SeguridadSocial .arrow-up').removeClass('none');
                    $('.indis5').html(indicadoresDerecho(idSS));
                     $('.btnListado').hide();

                      $('.internoDerecho').show();
                      $('.internoDerechoMatriz').hide();

                      $('.btnMatriz').on( "click", function() {
                          $('.internoDerecho').hide();
                          $('.internoDerechoMatriz').show();
                          $('.btnMatriz').hide();
                          $('.btnListado').show();
                        });

                        $('.btnListado').on( "click", function() {
                          $('.internoDerecho').show();
                          $('.internoDerechoMatriz').hide();
                          $('.btnMatriz').show();
                          $('.btnListado').hide();
                        });
                    $('.btnEstructural').on('click', function(){
                        $('.trE').show();
                        $('.trP').hide();
                        $('.trR').hide();
                    });


                    $('.btnProceso').on('click', function(){
                        $('.trE').hide();
                        $('.trP').show();
                        $('.trR').hide();
                    });

                    $('.btnResultado').on('click', function(){
                        $('.trE').hide();
                        $('.trP').hide();
                        $('.trR').show();
                    });
                });
                $('.Educacion').on('click', function(){
                    $('.indis3').html('');
                    $('.indis5').html('');
                    $('.internoDerecho').css('display','none');
                    $('.internoDerechoMatriz').css('display','none');
                    $('.col-md-4 .arrow-up').addClass('none');
                    $('.Educacion .arrow-up').removeClass('none');
                    $('.indis5').html(indicadoresDerecho(idE));
                     $('.btnListado').hide();

                      $('.internoDerecho').show();
                      $('.internoDerechoMatriz').hide();

                      $('.btnMatriz').on( "click", function() {
                          $('.internoDerecho').hide();
                          $('.internoDerechoMatriz').show();
                          $('.btnMatriz').hide();
                          $('.btnListado').show();
                        });

                        $('.btnListado').on( "click", function() {
                          $('.internoDerecho').show();
                          $('.internoDerechoMatriz').hide();
                          $('.btnMatriz').show();
                          $('.btnListado').hide();
                        });
                    $('.btnEstructural').on('click', function(){
                        $('.trE').show();
                        $('.trP').hide();
                        $('.trR').hide();
                    });


                    $('.btnProceso').on('click', function(){
                        $('.trE').hide();
                        $('.trP').show();
                        $('.trR').hide();
                    });

                    $('.btnResultado').on('click', function(){
                        $('.trE').hide();
                        $('.trP').hide();
                        $('.trR').show();
                    });
                });
                $('.Salud').on('click', function(){
                    $('.indis3').html('');
                    $('.indis5').html('');
                    $('.internoDerecho').css('display','none');
                    $('.internoDerechoMatriz').css('display','none');
                    $('.col-md-4 .arrow-up').addClass('none');
                    $('.Salud .arrow-up').removeClass('none');
                    $('.indis5').html(indicadoresDerecho(idS));
                     $('.btnListado').hide();

                      $('.internoDerecho').show();
                      $('.internoDerechoMatriz').hide();

                      $('.btnMatriz').on( "click", function() {
                          $('.internoDerecho').hide();
                          $('.internoDerechoMatriz').show();
                          $('.btnMatriz').hide();
                          $('.btnListado').show();
                        });

                        $('.btnListado').on( "click", function() {
                          $('.internoDerecho').show();
                          $('.internoDerechoMatriz').hide();
                          $('.btnMatriz').show();
                          $('.btnListado').hide();
                        });
                    $('.btnEstructural').on('click', function(){
                        $('.trE').show();
                        $('.trP').hide();
                        $('.trR').hide();
                    });


                    $('.btnProceso').on('click', function(){
                        $('.trE').hide();
                        $('.trP').show();
                        $('.trR').hide();
                    });

                    $('.btnResultado').on('click', function(){
                        $('.trE').hide();
                        $('.trP').hide();
                        $('.trR').show();
                    });
                });
                
                
                var url = window.location.href;
                var rom = url.split("#");
                $( "."+rom[1] ).trigger("click");
                
            },
            async:true
		});
    
    
    
   //getValores(5);

   function getValores(derecho){
        //var derecho = "Medio Ambiente";
        //var id_derecho = 5;
         $.ajax({
		  type: 'GET',
//		  url: pathAPI + "search?q=right_name_short_lit:"+derecho+"&rows=100",
            url: pathAPI + "search?q=right_id:"+derecho+"&rows=100",
		  data: {},
		  success: function( data, textStatus, jqxhr ) {   
              
              tablaIndContAE = '';
              tablaIndContAP = '';
              tablaIndContAR = '';
              tablaIndContCE = '';
              tablaIndContCP = '';
              tablaIndContCR = '';
              tablaIndContDE = '';
              tablaIndContDP = '';
              tablaIndContDR = '';
              tablaIndContFE = '';
              tablaIndContFP = '';
              tablaIndContFR = '';
              tablaIndContIE = '';
              tablaIndContIP = '';
              tablaIndContIR = '';
              tablaIndContJE = '';
              tablaIndContJP = '';
              tablaIndContJR = '';
              
              tablaIndContMatrizAE = '';
              tablaIndContMatrizAP = '';
              tablaIndContMatrizAR = '';
              tablaIndContMatrizCE = '';
              tablaIndContMatrizCP = '';
              tablaIndContMatrizCR = '';
              tablaIndContMatrizDE = '';
              tablaIndContMatrizDP = '';
              tablaIndContMatrizDR = '';
              tablaIndContMatrizFE = '';
              tablaIndContMatrizFP = '';
              tablaIndContMatrizFR = '';
              tablaIndContMatrizIE = '';
              tablaIndContMatrizIP = '';
              tablaIndContMatrizIR = '';
              tablaIndContMatrizJE = '';
              tablaIndContMatrizJP = '';
              tablaIndContMatrizJR = '';
              
              tipoDer = data['results']['records'];
              recepDer();
              recepDerMatriz();
                
                $('#recepDerA').html('');
                $('#recepDerC').html('');
                $('#recepDerD').html('');
                $('#recepDerF').html('');
                $('#recepDerI').html('');
                $('#recepDerJ').html('');
                $('#recepDerMatrizA').html('');
                $('#recepDerMatrizC').html('');
                $('#recepDerMatrizD').html('');
                $('#recepDerMatrizF').html('');
                $('#recepDerMatrizI').html('');
                $('#recepDerMatrizJ').html('');
              
                
              
                $('#recepDerA').html('<table class="table"><tbody>' + tablaIndContAE + tablaIndContAP + tablaIndContAR + '</tbody></table>' );
                $('#recepDerC').html('<table class="table"><tbody>' + tablaIndContCE + tablaIndContCP + tablaIndContCR + '</tbody></table>' );
                $('#recepDerD').html('<table class="table"><tbody>' + tablaIndContDE + tablaIndContDP + tablaIndContDR + '</tbody></table>' );
                $('#recepDerF').html('<table class="table"><tbody>' + tablaIndContFE + tablaIndContFP + tablaIndContFR + '</tbody></table>' );
                $('#recepDerI').html('<table class="table"><tbody>' + tablaIndContIE + tablaIndContIP + tablaIndContIR + '</tbody></table>' );
                $('#recepDerJ').html('<table class="table"><tbody>' + tablaIndContJE + tablaIndContJP + tablaIndContJR + '</tbody></table>' );
                // Vista matriz
                $('#recepDerMatrizA').html('<div><div class="matrizCol"><div><p class="tipoIndicador colorE alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador Estructural">E</p> <span>Estructural</span></div>' + tablaIndContMatrizAE + '</div><div class="matrizCol"><div><p class="tipoIndicador colorP alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Proceso">P</p> <span>De Proceso</span></div>' + tablaIndContMatrizAP + '</div><div class="matrizCol"><div><p class="tipoIndicador colorR alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Resultado">R</p> <span>De Resultado</span></div>' + tablaIndContMatrizAR + '</div></div>');
                $('#recepDerMatrizC').html('<div><div class="matrizCol"><div><p class="tipoIndicador colorE alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador Estructural">E</p> <span>Estructural</span></div>' + tablaIndContMatrizCE + '</div><div class="matrizCol"><div><p class="tipoIndicador colorP alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Proceso">P</p> <span>De Proceso</span></div>' + tablaIndContMatrizCP + '</div><div class="matrizCol"><div><p class="tipoIndicador colorR alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Resultado">R</p> <span>De Resultado</span></div>' + tablaIndContMatrizCR + '</div></div>');
                $('#recepDerMatrizD').html('<div><div class="matrizCol"><div><p class="tipoIndicador colorE alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador Estructural">E</p> <span>Estructural</span></div>' + tablaIndContMatrizDE + '</div><div class="matrizCol"><div><p class="tipoIndicador colorP alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Proceso">P</p> <span>De Proceso</span></div>' + tablaIndContMatrizDP + '</div><div class="matrizCol"><div><p class="tipoIndicador colorR alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Resultado">R</p> <span>De Resultado</span></div>' + tablaIndContMatrizDR + '</div></div>');
                $('#recepDerMatrizF').html('<div><div class="matrizCol"><div><p class="tipoIndicador colorE alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador Estructural">E</p> <span>Estructural</span></div>' + tablaIndContMatrizFE + '</div><div class="matrizCol"><div><p class="tipoIndicador colorP alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Proceso">P</p> <span>De Proceso</span></div>' + tablaIndContMatrizFP + '</div><div class="matrizCol"><div><p class="tipoIndicador colorR alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Resultado">R</p> <span>De Resultado</span></div>' + tablaIndContMatrizFR + '</div></div>');
                $('#recepDerMatrizI').html('<div><div class="matrizCol"><div><p class="tipoIndicador colorE alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador Estructural">E</p> <span>Estructural</span></div>' + tablaIndContMatrizIE + '</div><div class="matrizCol"><div><p class="tipoIndicador colorP alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Proceso">P</p> <span>De Proceso</span></div>' + tablaIndContMatrizIP + '</div><div class="matrizCol"><div><p class="tipoIndicador colorR alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Resultado">R</p> <span>De Resultado</span></div>' + tablaIndContMatrizIR + '</div></div>');
                $('#recepDerMatrizJ').html('<div><div class="matrizCol"><div><p class="tipoIndicador colorE alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador Estructural">E</p> <span>Estructural</span></div>' + tablaIndContMatrizJE + '</div><div class="matrizCol"><div><p class="tipoIndicador colorP alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Proceso">P</p> <span>De Proceso</span></div>' + tablaIndContMatrizJP + '</div><div class="matrizCol"><div><p class="tipoIndicador colorR alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Resultado">R</p> <span>De Resultado</span></div>' + tablaIndContMatrizJR + '</div></div>');
		  },
		  async:true
		});
    }
    
    
    function getTipoIndicador(tipoIndicador){
        return tipoIndicador === "E"? '<p class="tipoIndicador colorE" data-toggle="tooltip" data-placement="top" title="Indicador Estructural">E</p>' :  tipoIndicador === "P"? '<p class="tipoIndicador colorP" data-toggle="tooltip" data-placement="top" title="Indicador de Proceso">P</p>':  tipoIndicador === "R"? '<p class="tipoIndicador colorR" data-toggle="tooltip" data-placement="top" title="Indicador de Resultado">R</p>': 'N/D';
    }
   
    function derechos(){
        // Función para visualizar derechos disponibles
        $.ajax({
		  type: 'GET',
		  url: pathAPI + "search?q=*:*&rows=0&fac.json={array:{type:%22terms%22,field:%22right_name_short_lit%22,limit:10,facet:{unique_indicators:%22unique(indicator_name_lit)%22,indicators_null:{type:%22query%22,q:%22-indicator_name:[*%20TO%20*]%22}}}}",
		  data: {},
		  success: function( data, textStatus, jqxhr ) {      
              countDer = data['fac.json']['array']['buckets'];
                //console.log(countDer);
              
              var k = 3;
              
              for(var i = 0; i < countDer.length; i++){
                  var h = i+1;
                  //console.log(countDer[i]['val']);
                      if(h == 1 || h == 4 || h == 7 || h == 10 || h == 13 || h == 16){
                          cuadroDer += '<div class="row">';
                          cuadroDer += '<div class="col-md-4">'+
                                     '<a href="#'+ sinEspacios(countDer[i]['val']) +'" class="' + sinEspacios(countDer[i]['val']) + '">'+
                                         '<div class="cuadro-derechos b'+h+'">'+
                                             '<div class="d'+h+'">' +
                                                 '<h2>'+ countDer[i]['val']+'</h2>'+
                                              '</div>'+
                                        '</div>'+
                                     '</a>'+
                                     '<div class="arrow-up none"></div>'+
                                  '</div>';
                      }else if(h == 3 || h == 6 || h == 9 || h == 12 || h == 15 || h == 18 || h == countDer.length){
                          cuadroDer += '<div class="col-md-4">'+
                                     '<a href="#'+ sinEspacios(countDer[i]['val']) +'" class="' + sinEspacios(countDer[i]['val']) + '">'+
                                         '<div class="cuadro-derechos b'+h+'">'+
                                             '<div class="d'+h+'">' +
                                                 '<h2>'+ countDer[i]['val']+'</h2>'+
                                              '</div>'+
                                        '</div>'+
                                     '</a>'+
                                     '<div class="arrow-up none"></div>'+
                                  '</div>';
                               cuadroDer += '</div><br /><div class="indis'+h+'"></div>';
                      }else{
                          cuadroDer += '<div class="col-md-4">'+
                                     '<a href="#'+ sinEspacios(countDer[i]['val']) +'" class="' + sinEspacios(countDer[i]['val']) + '">'+
                                         '<div class="cuadro-derechos b'+h+'">'+
                                             '<div class="d'+h+'">' +
                                                 '<h2>'+ countDer[i]['val']+'</h2>'+
                                              '</div>'+
                                        '</div>'+
                                     '</a>'+
                                     '<div class="arrow-up none"></div>'+
                                  '</div>';
                      }
              }
              
//              for(var kl = 0; kl < valores.length; kl++){
//                  valores[kl];
//                  
//              }
              
              
              $('#derechos').html(cuadroDer);
              
		  },
		  async:true
		});
    }
    
    function nombreDerechos(){
        
        //console.log(nombres);
      //  return nombres;
    }
    
    function sinEspacios(dato){
        var contenido=dato;
        contenido=contenido.replace(/ /g,"");
        contenido=contenido.replace(/á/g,"a");
        contenido=contenido.replace(/é/g,"e");
        contenido=contenido.replace(/í/g,"i");
        contenido=contenido.replace(/ó/g,"o");
        contenido=contenido.replace(/ú/g,"u");
        contenido=contenido.replace(/ñ/g,"n");
//        for (var i = 0; i < contenido.length; i ++){
//        contenido += (contenido.charAt(i) == " ") ? "" : contenido.charAt(i);
//        }//fin del for
        return contenido;
    }
    
    function recepDer(){
        //console.log(tipoDer);
        for(var i=0; i < tipoDer.length; i++){
            if(tipoDer[i].indicator_category_key == 'a'){
                if(tipoDer[i].indicator_type_code === "E"){
                   tablaIndContAE += '<tr class="trE"><td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +'<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a></td>' + '<td><p>'+ tipoDer[i].indicator_definition +'</p></td></tr>';
                }
                else if(tipoDer[i].indicator_type_code === "P"){
                    tablaIndContAP += '<tr class="trP"><td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +'<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a></td>' + '<td><p>'+ tipoDer[i].indicator_definition +'</p></td></tr>';
                }
                else if(tipoDer[i].indicator_type_code === "R"){
                   tablaIndContAR += '<tr class="trR"><td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +'<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a></td>' + '<td><p>'+ tipoDer[i].indicator_definition +'</p></td></tr>';
                }
            }else if(tipoDer[i].indicator_category_key == 'c'){
                if(tipoDer[i].indicator_type_code === "E"){
                   tablaIndContCE += '<tr class="trE"><td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +'<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a></td>' + '<td><p>'+ tipoDer[i].indicator_definition +'</p></td></tr>';
                }
                else if(tipoDer[i].indicator_type_code === "P"){
                    tablaIndContCP += '<tr class="trP"><td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +'<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a></td>' + '<td><p>'+ tipoDer[i].indicator_definition +'</p></td></tr>';
                }
                else if(tipoDer[i].indicator_type_code === "R"){
                   tablaIndContCR += '<tr class="trR"><td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +'<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a></td>' + '<td><p>'+ tipoDer[i].indicator_definition +'</p></td></tr>';
                }
            }else if(tipoDer[i].indicator_category_key == 'd'){
                 if(tipoDer[i].indicator_type_code === "E"){
                   tablaIndContDE += '<tr class="trE"><td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +'<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a></td>' + '<td><p>'+ tipoDer[i].indicator_definition +'</p></td></tr>';
                }
                else if(tipoDer[i].indicator_type_code === "P"){
                    tablaIndContDP += '<tr class="trP"><td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +'<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a></td>' + '<td><p>'+ tipoDer[i].indicator_definition +'</p></td></tr>';
                }
                else if(tipoDer[i].indicator_type_code === "R"){
                   tablaIndContDR += '<tr class="trR"><td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +'<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a></td>' + '<td><p>'+ tipoDer[i].indicator_definition +'</p></td></tr>';
                }
            }else if(tipoDer[i].indicator_category_key == 'f'){
                 if(tipoDer[i].indicator_type_code === "E"){
                   tablaIndContFE += '<tr class="trE"><td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +'<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a></td>' + '<td><p>'+ tipoDer[i].indicator_definition +'</p></td></tr>';
                }
                else if(tipoDer[i].indicator_type_code === "P"){
                    tablaIndContFP += '<tr class="trP"><td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +'<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a></td>' + '<td><p>'+ tipoDer[i].indicator_definition +'</p></td></tr>';
                }
                else if(tipoDer[i].indicator_type_code === "R"){
                   tablaIndContFR += '<tr class="trR"><td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +'<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a></td>' + '<td><p>'+ tipoDer[i].indicator_definition +'</p></td></tr>';
                }
            }else if(tipoDer[i].indicator_category_key == 'i'){
                 if(tipoDer[i].indicator_type_code === "E"){
                   tablaIndContIE += '<tr class="trE"><td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +'<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a></td>' + '<td><p>'+ tipoDer[i].indicator_definition +'</p></td></tr>';
                }
                else if(tipoDer[i].indicator_type_code === "P"){
                    tablaIndContIP += '<tr class="trP"><td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +'<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a></td>' + '<td><p>'+ tipoDer[i].indicator_definition +'</p></td></tr>';
                }
                else if(tipoDer[i].indicator_type_code === "R"){
                   tablaIndContIR += '<tr class="trR"><td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +'<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a></td>' + '<td><p>'+ tipoDer[i].indicator_definition +'</p></td></tr>';
                }
            }else if(tipoDer[i].indicator_category_key == 'j'){
                 if(tipoDer[i].indicator_type_code === "E"){
                   tablaIndContJE += '<tr class="trE"><td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +'<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a></td>' + '<td><p>'+ tipoDer[i].indicator_definition +'</p></td></tr>';
                }
                else if(tipoDer[i].indicator_type_code === "P"){
                    tablaIndContJP += '<tr class="trP"><td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +'<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a></td>' + '<td><p>'+ tipoDer[i].indicator_definition +'</p></td></tr>';
                }
                else if(tipoDer[i].indicator_type_code === "R"){
                   tablaIndContJR += '<tr class="trR"><td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +'<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a></td>' + '<td><p>'+ tipoDer[i].indicator_definition +'</p></td></tr>';
                }
            }

        }       
    }// Termina function 
    
    function recepDerMatriz(){
        for(var i=0; i < tipoDer.length; i++){
            if(tipoDer[i].indicator_category_key == 'a'){
                if(tipoDer[i].indicator_type_code === "E"){
                   tablaIndContMatrizAE += '<div><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' +                      tipoDer[i].indicator_name + '</a>' + '<p>'+ tipoDer[i].indicator_definition +'</p></div>';
                }
                if(tipoDer[i].indicator_type_code === "P"){
                    tablaIndContMatrizAP += '<div><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a>' + '<p>'+ tipoDer[i].indicator_definition +'</p></div>';
                }
                if(tipoDer[i].indicator_type_code === "R"){
                   tablaIndContMatrizAR += '<div><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a>' + '<p>'+ tipoDer[i].indicator_definition +'</p></div>';
                } 
            }else if(tipoDer[i].indicator_category_key == 'c'){
                 if(tipoDer[i].indicator_type_code === "E"){
                   tablaIndContMatrizCE += '<div><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' +                      tipoDer[i].indicator_name + '</a>' + '<p>'+ tipoDer[i].indicator_definition +'</p></div>';
                }
                if(tipoDer[i].indicator_type_code === "P"){
                    tablaIndContMatrizCP += '<div><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a>' + '<p>'+ tipoDer[i].indicator_definition +'</p></div>';
                }
                if(tipoDer[i].indicator_type_code === "R"){
                   tablaIndContMatrizCR += '<div><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a>' + '<p>'+ tipoDer[i].indicator_definition +'</p></div>';
                } 
            }else if(tipoDer[i].indicator_category_key == 'd'){
                if(tipoDer[i].indicator_type_code === "E"){
                   tablaIndContMatrizDE += '<div><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' +                      tipoDer[i].indicator_name + '</a>' + '<p>'+ tipoDer[i].indicator_definition +'</p></div>';
                }
                if(tipoDer[i].indicator_type_code === "P"){
                    tablaIndContMatrizDP += '<div><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a>' + '<p>'+ tipoDer[i].indicator_definition +'</p></div>';
                }
                if(tipoDer[i].indicator_type_code === "R"){
                   tablaIndContMatrizDR += '<div><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a>' + '<p>'+ tipoDer[i].indicator_definition +'</p></div>';
                } 
            }else if(tipoDer[i].indicator_category_key == 'f'){
                if(tipoDer[i].indicator_type_code === "E"){
                   tablaIndContMatrizFE += '<div><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' +                      tipoDer[i].indicator_name + '</a>' + '<p>'+ tipoDer[i].indicator_definition +'</p></div>';
                }
                if(tipoDer[i].indicator_type_code === "P"){
                    tablaIndContMatrizFP += '<div><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a>' + '<p>'+ tipoDer[i].indicator_definition +'</p></div>';
                }
                if(tipoDer[i].indicator_type_code === "R"){
                   tablaIndContMatrizFR += '<div><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a>' + '<p>'+ tipoDer[i].indicator_definition +'</p></div>';
                } 
            }else if(tipoDer[i].indicator_category_key == 'i'){
                if(tipoDer[i].indicator_type_code === "E"){
                   tablaIndContMatrizIE += '<div><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' +                      tipoDer[i].indicator_name + '</a>' + '<p>'+ tipoDer[i].indicator_definition +'</p></div>';
                }
                if(tipoDer[i].indicator_type_code === "P"){
                    tablaIndContMatrizIP += '<div><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a>' + '<p>'+ tipoDer[i].indicator_definition +'</p></div>';
                }
                if(tipoDer[i].indicator_type_code === "R"){
                   tablaIndContMatrizIR += '<div><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a>' + '<p>'+ tipoDer[i].indicator_definition +'</p></div>';
                } 
            }else if(tipoDer[i].indicator_category_key == 'j'){
                if(tipoDer[i].indicator_type_code === "E"){
                   tablaIndContMatrizJE += '<div><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' +                      tipoDer[i].indicator_name + '</a>' + '<p>'+ tipoDer[i].indicator_definition +'</p></div>';
                }
                if(tipoDer[i].indicator_type_code === "P"){
                    tablaIndContMatrizJP += '<div><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a>' + '<p>'+ tipoDer[i].indicator_definition +'</p></div>';
                }
                if(tipoDer[i].indicator_type_code === "R"){
                   tablaIndContMatrizJR += '<div><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name + '</a>' + '<p>'+ tipoDer[i].indicator_definition +'</p></div>';
                } 
            }

        }       
    }// Termina function 
    
    function indicadoresDerecho(derecho){
        var indis = ' <div class="row internoDerecho" >' + 
                    '    <div class="row alinea-derecha">' + 
                    '        <button type="button" class="btn btn-primary btnListado">Vista listado</button>' + 
                    '        <button type="button" class="btn btn-primary btnMatriz">Vista matriz</button>' + 
                    '    </div>' + 
                    '    <div class="example">' + 
                    '        <div class="panel-group ficha-collapse" id="accordion">' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion" data-toggle="collapse" href="#panel-01" aria-expanded="true" aria-controls="panel-01" title="Categoría conceptual cuyos indicadores permiten identificar información sobre la forma en que cada derecho se encuentra incorporado en el sistema legal y en las políticas públicas, así como los resultados generales sobre su garantía.">Recepción del derecho</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button" data-parent="#accordion" data-toggle="collapse" href="#panel-01"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse in" id="panel-01">' + 
                    '                    <div class="panel-body">' + 
                    '                       <div><p>Categoría conceptual cuyos indicadores permiten identificar información sobre la forma en que cada derecho se encuentra incorporado en el sistema legal y en las políticas públicas, así como los resultados generales sobre su garantía.</p></div>' +
                    '                       <div class="botoneraTipos"><a href="#btnEstructural" class="btn btn-primary btnEstructural colorE">Estructurales</a><a href="#btnProceso" class="btn btn-primary btnProceso colorP">Proceso</a><a href="#btnResultado" class="btn btn-primary btnResultado colorR">Resultado</a></div>' +
                    '                        <div id="recepDerA"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '           <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion" data-toggle="collapse" href="#panel-02" aria-expanded="true" aria-controls="panel-02" title="Categoría conceptual cuyos indicadores se orientan a valorar la disponibilidad efectiva de recursos financieros del Estado para el gasto público social, así como sus compromisos presupuestarios para los derechos.">Contexto financiero y presupuestal</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button collapsed" data-parent="#accordion" data-toggle="collapse" href="#panel-02"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse" id="panel-02">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div><p>Categoría conceptual cuyos indicadores se orientan a valorar la disponibilidad efectiva de recursos financieros del Estado para el gasto público social, así como sus compromisos presupuestarios para los derechos.</p></div>' +
            '                       <div class="botoneraTipos"><a href="#btnEstructural" class="btn btn-primary btnEstructural colorE">Estructurales</a><a href="#btnProceso" class="btn btn-primary btnProceso colorP">Proceso</a><a href="#btnResultado" class="btn btn-primary btnResultado colorR">Resultado</a></div>' +
                    '                        <div id="recepDerF"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' +
                    '           <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion" data-toggle="collapse" href="#panel-03" aria-expanded="true" aria-controls="panel-03" title="Categoría conceptual cuyos indicadores incorporan los aspectos instrumentales y de disponibilidad de recursos al interior del aparato estatal para la atención de los derechos.">Capacidades estatales</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button collapsed" data-parent="#accordion" data-toggle="collapse" href="#panel-03"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse" id="panel-03">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div><p>Categoría conceptual cuyos indicadores incorporan los aspectos instrumentales y de disponibilidad de recursos al interior del aparato estatal para la atención de los derechos.</p></div>' +
            '                       <div class="botoneraTipos"><a href="#btnEstructural" class="btn btn-primary btnEstructural colorE">Estructurales</a><a href="#btnProceso" class="btn btn-primary btnProceso colorP">Proceso</a><a href="#btnResultado" class="btn btn-primary btnResultado colorR">Resultado</a></div>' +
                    '                        <div id="recepDerC"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion" data-toggle="collapse" href="#panel-04" aria-expanded="true" aria-controls="panel-04" title="Principio transversal cuyos indicadores se orientan a asegurar la protección igualitaria y no discriminatoria de los derechos; detallan los mecanismos y políticas específicos disponibles para los grupos de población en situación de vulnerabilidad.">Igualdad y no discriminación</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button collapsed" data-parent="#accordion" data-toggle="collapse" href="#panel-04"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse" id="panel-04">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div><p>Principio transversal cuyos indicadores se orientan a asegurar la protección igualitaria y no discriminatoria de los derechos; detallan los mecanismos y políticas específicos disponibles para los grupos de población en situación de vulnerabilidad.</p></div>' +
            '                       <div class="botoneraTipos"><a href="#btnEstructural" class="btn btn-primary btnEstructural colorE">Estructurales</a><a href="#btnProceso" class="btn btn-primary btnProceso colorP">Proceso</a><a href="#btnResultado" class="btn btn-primary btnResultado colorR">Resultado</a></div>' +
                    '                        <div id="recepDerD"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion" data-toggle="collapse" href="#panel-05" aria-expanded="true" aria-controls="panel-05" title="Principio transversal cuyos indicadores revisan, por un lado, el nivel de información y transparencia sobre los derechos, para una adecuada rendición de cuentas; y por el otro, examinan la disponibilidad de mecanismos para la participación en el diseño, implementación y seguimiento de las políticas públicas correspondientes.">Acceso a información pública y participación</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button collapsed" data-parent="#accordion" data-toggle="collapse" href="#panel-05"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse" id="panel-05">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div><p>Principio transversal cuyos indicadores revisan, por un lado, el nivel de información y transparencia sobre los derechos, para una adecuada rendición de cuentas; y por el otro, examinan la disponibilidad de mecanismos para la participación en el diseño, implementación y seguimiento de las políticas públicas correspondientes.</p></div>' +
            '                       <div class="botoneraTipos"><a href="#btnEstructural" class="btn btn-primary btnEstructural colorE">Estructurales</a><a href="#btnProceso" class="btn btn-primary btnProceso colorP">Proceso</a><a href="#btnResultado" class="btn btn-primary btnResultado colorR">Resultado</a></div>' +
                    '                        <div id="recepDerI"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion" data-toggle="collapse" href="#panel-06" aria-expanded="true" aria-controls="panel-06" title="Principio transversal cuyos indicadores están dirigidos a garantizar los recursos para la exigibilidad de los derechos y el apropiado acceso a la justicia, incluyendo el examen sobre la posibilidad de acceso a mecanismos de reclamo y protección.">Acceso a la justicia</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button collapsed" data-parent="#accordion" data-toggle="collapse" href="#panel-06"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse" id="panel-06">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div><p>Principio transversal cuyos indicadores están dirigidos a garantizar los recursos para la exigibilidad de los derechos y el apropiado acceso a la justicia, incluyendo el examen sobre la posibilidad de acceso a mecanismos de reclamo y protección.</p></div>' +
            '                       <div class="botoneraTipos"><a href="#btnEstructural" class="btn btn-primary btnEstructural colorE">Estructurales</a><a href="#btnProceso" class="btn btn-primary btnProceso colorP">Proceso</a><a href="#btnResultado" class="btn btn-primary btnResultado colorR">Resultado</a></div>' +
                    '                        <div id="recepDerJ"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '        </div>' + 

                    '</div>' + 
            '</div>' + 

                    '<!--  Vista Matríz -->' + 

                  '<div class="row internoDerechoMatriz" >' + 
                    '  <div class="row alinea-derecha">' + 
                    '    <button type="button" class="btn btn-primary btnListado">Vista listado</button>' + 
                    '    <button type="button" class="btn btn-primary btnMatriz">Vista matriz</button>' + 
                    '  </div>' + 

                    '  <div class="example">' + 
                    '        <div class="panel-group ficha-collapse" id="accordion2">' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion2" data-toggle="collapse" href="#panel-011" aria-expanded="true" aria-controls="panel-011" title="Categoría conceptual cuyos indicadores permiten identificar información sobre la forma en que cada derecho se encuentra incorporado en el sistema legal y en las políticas públicas, así como los resultados generales sobre su garantía.">Recepción del derecho</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button" data-parent="#accordion2" data-toggle="collapse" href="#panel-011"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse in" id="panel-011">' + 
                    '                    <div class="panel-body">' + 
                    '                       <div><p>Categoría conceptual cuyos indicadores permiten identificar información sobre la forma en que cada derecho se encuentra incorporado en el sistema legal y en las políticas públicas, así como los resultados generales sobre su garantía.</p></div>' +
                    '                        <div id="recepDerMatrizA"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion2" data-toggle="collapse" href="#panel-021" aria-expanded="true" aria-controls="panel-021" title="Categoría conceptual cuyos indicadores se orientan a valorar la disponibilidad efectiva de recursos financieros del Estado para el gasto público social, así como sus compromisos presupuestarios para los derechos.">Contexto financiero y presupuestal</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button collapsed" data-parent="#accordion2" data-toggle="collapse" href="#panel-021"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse" id="panel-021">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div><p>Categoría conceptual cuyos indicadores se orientan a valorar la disponibilidad efectiva de recursos financieros del Estado para el gasto público social, así como sus compromisos presupuestarios para los derechos.</p></div>' +
                    '                        <div id="recepDerMatrizF"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion2" data-toggle="collapse" href="#panel-031" aria-expanded="true" aria-controls="panel-031" title="Categoría conceptual cuyos indicadores incorporan los aspectos instrumentales y de disponibilidad de recursos al interior del aparato estatal para la atención de los derechos.">Capacidades estatales</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button collapsed" data-parent="#accordion2" data-toggle="collapse" href="#panel-031"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse" id="panel-031">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div><p>Categoría conceptual cuyos indicadores incorporan los aspectos instrumentales y de disponibilidad de recursos al interior del aparato estatal para la atención de los derechos.</p></div>' +
                    '                        <div id="recepDerMatrizC"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion2" data-toggle="collapse" href="#panel-041" aria-expanded="true" aria-controls="panel-041" title="Principio transversal cuyos indicadores se orientan a asegurar la protección igualitaria y no discriminatoria de los derechos; detallan los mecanismos y políticas específicos disponibles para los grupos de población en situación de vulnerabilidad.">Igualdad y no discriminación</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button collapsed" data-parent="#accordion2" data-toggle="collapse" href="#panel-041"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse" id="panel-041">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div><p>Principio transversal cuyos indicadores se orientan a asegurar la protección igualitaria y no discriminatoria de los derechos; detallan los mecanismos y políticas específicos disponibles para los grupos de población en situación de vulnerabilidad.</p></div>' +
                    '                        <div id="recepDerMatrizD"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion2" data-toggle="collapse" href="#panel-051" aria-expanded="true" aria-controls="panel-051" title="Principio transversal cuyos indicadores revisan, por un lado, el nivel de información y transparencia sobre los derechos, para una adecuada rendición de cuentas; y por el otro, examinan la disponibilidad de mecanismos para la participación en el diseño, implementación y seguimiento de las políticas públicas correspondientes.">Acceso a información pública y participación</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button collapsed" data-parent="#accordion2" data-toggle="collapse" href="#panel-051"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse" id="panel-051">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div><p>Principio transversal cuyos indicadores revisan, por un lado, el nivel de información y transparencia sobre los derechos, para una adecuada rendición de cuentas; y por el otro, examinan la disponibilidad de mecanismos para la participación en el diseño, implementación y seguimiento de las políticas públicas correspondientes.</p></div>' +
                    '                        <div id="recepDerMatrizI"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion2" data-toggle="collapse" href="#panel-061" aria-expanded="true" aria-controls="panel-061" title="Principio transversal cuyos indicadores están dirigidos a garantizar los recursos para la exigibilidad de los derechos y el apropiado acceso a la justicia, incluyendo el examen sobre la posibilidad de acceso a mecanismos de reclamo y protección.">Acceso a la justicia</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button collapsed" data-parent="#accordion2" data-toggle="collapse" href="#panel-061"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse" id="panel-061">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div><p>Principio transversal cuyos indicadores están dirigidos a garantizar los recursos para la exigibilidad de los derechos y el apropiado acceso a la justicia, incluyendo el examen sobre la posibilidad de acceso a mecanismos de reclamo y protección.</p></div>' +
                    '                        <div id="recepDerMatrizJ"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
            
                    '        </div>' + 
                    '  </div>' + 
                  '</div>';
        getValores(derecho);
        return indis;
    }
    
});