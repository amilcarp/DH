//---- Variables
var pathAPI = "https://datosabiertos.unam.mx/api/alice/";
var tipoDer = [];
var countDer = [];
var acumula = [];
var tablaInd, cuadroDer =  '';
var tablaIndContA = '';
var tablaIndContC = '';
var tablaIndContD = '';
var tablaIndContF = '';
var tablaIndContI = '';
var tablaIndContJ = '';
var tablaIndContMatrizA = '';
var tablaIndContMatrizC = '';
var tablaIndContMatrizD = '';
var tablaIndContMatrizF = '';
var tablaIndContMatrizI = '';
var tablaIndContMatrizJ = '';
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
var contenido;

$(document).ready(function() {
    
    console.log(nombreDerechos());
    
//    $.ajax({
//		  type: 'GET',
//		  url: pathAPI + "search?q=right_name_short_id:"+derecho+"&rows=100",
//		  data: {},
//		  success: function( data, textStatus, jqxhr ) {      
//              tipoDer = data['results']['records'];
//              derechos();
//              recepDer();
//              recepDerMatriz();
//              
//              
//                $('#recepDerA').html('<table class="table"><tbody>' + tablaIndContA + '</tbody></table>' );
//                $('#recepDerC').html('<table class="table"><tbody>' + tablaIndContC + '</tbody></table>' );
//                $('#recepDerD').html('<table class="table"><tbody>' + tablaIndContD + '</tbody></table>' );
//                $('#recepDerF').html('<table class="table"><tbody>' + tablaIndContF + '</tbody></table>' );
//                $('#recepDerI').html('<table class="table"><tbody>' + tablaIndContI + '</tbody></table>' );
//                $('#recepDerJ').html('<table class="table"><tbody>' + tablaIndContJ + '</tbody></table>' );
//                // Vista matriz
//                $('#recepDerMatrizA').html('<div><div class="matrizCol"><div><p class="tipoIndicador colorE alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador Estructural">E</p> <span>Estructural</span></div>' + tablaIndContMatrizAE + '</div><div class="matrizCol"><div><p class="tipoIndicador colorP alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Proceso">P</p> <span>De Proceso</span></div>' + tablaIndContMatrizAP + '</div><div class="matrizCol"><div><p class="tipoIndicador colorR alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Resultado">R</p> <span>De Resultado</span></div>' + tablaIndContMatrizAR + '</div></div>');
//                $('#recepDerMatrizC').html('<div><div class="matrizCol"><div><p class="tipoIndicador colorE alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador Estructural">E</p> <span>Estructural</span></div>' + tablaIndContMatrizCE + '</div><div class="matrizCol"><div><p class="tipoIndicador colorP alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Proceso">P</p> <span>De Proceso</span></div>' + tablaIndContMatrizCP + '</div><div class="matrizCol"><div><p class="tipoIndicador colorR alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Resultado">R</p> <span>De Resultado</span></div>' + tablaIndContMatrizCR + '</div></div>');
//                $('#recepDerMatrizD').html('<div><div class="matrizCol"><div><p class="tipoIndicador colorE alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador Estructural">E</p> <span>Estructural</span></div>' + tablaIndContMatrizDE + '</div><div class="matrizCol"><div><p class="tipoIndicador colorP alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Proceso">P</p> <span>De Proceso</span></div>' + tablaIndContMatrizDP + '</div><div class="matrizCol"><div><p class="tipoIndicador colorR alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Resultado">R</p> <span>De Resultado</span></div>' + tablaIndContMatrizDR + '</div></div>');
//                $('#recepDerMatrizF').html('<div><div class="matrizCol"><div><p class="tipoIndicador colorE alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador Estructural">E</p> <span>Estructural</span></div>' + tablaIndContMatrizFE + '</div><div class="matrizCol"><div><p class="tipoIndicador colorP alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Proceso">P</p> <span>De Proceso</span></div>' + tablaIndContMatrizFP + '</div><div class="matrizCol"><div><p class="tipoIndicador colorR alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Resultado">R</p> <span>De Resultado</span></div>' + tablaIndContMatrizFR + '</div></div>');
//                $('#recepDerMatrizI').html('<div><div class="matrizCol"><div><p class="tipoIndicador colorE alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador Estructural">E</p> <span>Estructural</span></div>' + tablaIndContMatrizIE + '</div><div class="matrizCol"><div><p class="tipoIndicador colorP alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Proceso">P</p> <span>De Proceso</span></div>' + tablaIndContMatrizIP + '</div><div class="matrizCol"><div><p class="tipoIndicador colorR alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Resultado">R</p> <span>De Resultado</span></div>' + tablaIndContMatrizIR + '</div></div>');
//                $('#recepDerMatrizJ').html('<div><div class="matrizCol"><div><p class="tipoIndicador colorE alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador Estructural">E</p> <span>Estructural</span></div>' + tablaIndContMatrizJE + '</div><div class="matrizCol"><div><p class="tipoIndicador colorP alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Proceso">P</p> <span>De Proceso</span></div>' + tablaIndContMatrizJP + '</div><div class="matrizCol"><div><p class="tipoIndicador colorR alineaTipoInd" data-toggle="tooltip" data-placement="top" title="Indicador de Resultado">R</p> <span>De Resultado</span></div>' + tablaIndContMatrizJR + '</div></div>');
//		  },
//		  async:true
//		});
    
    init();
    
   var valores = nombreDerechos();
    
    function init(){
        //var valores = nombreDerechos();
        for(var z = 0; z < valores.length; z++){
            //getValores(valores[i]);
            console.log(valores[z]);
        }
        
    }
    
    
   //getValores('Alimentación');
//
   function getValores(derecho){
        //var derecho = "Alimentación";
         $.ajax({
		  type: 'GET',
		  url: pathAPI + "search?q=right_name_short_lit:"+derecho+"&rows=100",
		  data: {},
		  success: function( data, textStatus, jqxhr ) {      
              tipoDer = data['results']['records'];
              derechos();
              recepDer();
              recepDerMatriz();
              
              
                $('#recepDerA').html('<table class="table"><tbody>' + tablaIndContA + '</tbody></table>' );
                $('#recepDerC').html('<table class="table"><tbody>' + tablaIndContC + '</tbody></table>' );
                $('#recepDerD').html('<table class="table"><tbody>' + tablaIndContD + '</tbody></table>' );
                $('#recepDerF').html('<table class="table"><tbody>' + tablaIndContF + '</tbody></table>' );
                $('#recepDerI').html('<table class="table"><tbody>' + tablaIndContI + '</tbody></table>' );
                $('#recepDerJ').html('<table class="table"><tbody>' + tablaIndContJ + '</tbody></table>' );
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
                console.log(countDer);
              
              var k = 3;
              
              for(var i = 0; i < countDer.length; i++){
                  var h = i+1;
                  console.log(countDer[i]['val']);
                      if(h == 1 || h == 4 || h == 7 || h == 10 || h == 13 || h == 16){
                          cuadroDer += '<div class="row">';
                          cuadroDer += '<div class="col-md-4">'+
                                     '<a href="#'+ sinEspacios(countDer[i]['val']) +'">'+
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
                                     '<a href="#'+ sinEspacios(countDer[i]['val']) +'">'+
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
                                     '<a href="#'+ sinEspacios(countDer[i]['val']) +'">'+
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
              $('#derechos').html(cuadroDer);
              
		  },
		  async:true
		});
    }
    
    function nombreDerechos(){
        // Función para visualizar derechos disponibles
        var nombres = []; 
        $.ajax({
		  type: 'GET',
		  url: pathAPI + "search?q=*:*&rows=0&fac.json={array:{type:%22terms%22,field:%22right_name_short_lit%22,limit:10,facet:{unique_indicators:%22unique(indicator_name_lit)%22,indicators_null:{type:%22query%22,q:%22-indicator_name:[*%20TO%20*]%22}}}}",
		  data: {},
		  success: function( data, textStatus, jqxhr ) {      
              countDer = data['fac.json']['array']['buckets'];
                console.log(countDer);
              
              for(var i = 0; i < countDer.length; i++){
                  nombres.push(countDer[i]['val']);
              }
              
         
		  },
		  async:true
		});
        console.log(nombres);
        return nombres;
    }
    
    function sinEspacios(dato){
        var contenido=dato;
//        for (var i = 0; i < dato.length; i ++){
//        contenido += (dato.charAt(i) == " ") ? "_" : dato.charAt(i);
//        }//fin del for
        return contenido;
    }
    
    function recepDer(){
        for(var i=0; i < tipoDer.length; i++){
            if(tipoDer[i].indicator_category_key == 'a'){
                tablaIndContA += '<tr>' +
                              '<td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +
                              '<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name +'</a></td>' +
                              '<td>'+ tipoDer[i].indicator_definition +'</td>' +
                          '</tr>';
            }else if(tipoDer[i].indicator_category_key == 'c'){
                 tablaIndContC += '<tr>' +
                              '<td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +
                              '<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name +'</a></td>' +
                              '<td>'+ tipoDer[i].indicator_definition +'</td>' +
                          '</tr>';
            }else if(tipoDer[i].indicator_category_key == 'd'){
                tablaIndContD += '<tr>' +
                              '<td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +
                              '<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name +'</a></td>' +
                              '<td>'+ tipoDer[i].indicator_definition +'</td>' +
                          '</tr>';
            }else if(tipoDer[i].indicator_category_key == 'f'){
                tablaIndContF += '<tr>' +
                              '<td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +
                              '<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name +'</a></td>' +
                              '<td>'+ tipoDer[i].indicator_definition +'</td>' +
                          '</tr>';
            }else if(tipoDer[i].indicator_category_key == 'i'){
                tablaIndContI += '<tr>' +
                              '<td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +
                              '<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name +'</td>' +
                              '<td>'+ tipoDer[i].indicator_definition +'</td>' +
                          '</tr>';
            }else if(tipoDer[i].indicator_category_key == 'j'){
                tablaIndContJ += '<tr>' +
                              '<td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +
                              '<td><a href="indicadores.html?codigo='+ tipoDer[i].guid +'">'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name +'</a></td>' +
                              '<td>'+ tipoDer[i].indicator_definition +'</td>' +
                          '</tr>';
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
                    '        <button type="button" class="btn btn-primary btnMatriz">Vista matríz</button>' + 
                    '    </div>' + 
                    '    <div class="example">' + 
                    '        <div class="panel-group ficha-collapse" id="accordion">' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion" data-toggle="collapse" href="#panel-01" aria-expanded="true" aria-controls="panel-01">Recepción del derecho</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button" data-parent="#accordion" data-toggle="collapse" href="#panel-01"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse in" id="panel-01">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div id="recepDerA"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '        </div>' + 

                    '       <div class="panel-group ficha-collapse" id="accordion">' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion" data-toggle="collapse" href="#panel-02" aria-expanded="true" aria-controls="panel-02">Contexto financiero y presupuestal</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button collapsed" data-parent="#accordion" data-toggle="collapse" href="#panel-02"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse" id="panel-02">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div id="recepDerC"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '        </div>' + 

                    '       <div class="panel-group ficha-collapse" id="accordion">' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion" data-toggle="collapse" href="#panel-03" aria-expanded="true" aria-controls="panel-03">Capacidades estatales</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button collapsed" data-parent="#accordion" data-toggle="collapse" href="#panel-03"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse" id="panel-03">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div id="recepDerD"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '        </div>' + 

                    '        <div class="panel-group ficha-collapse" id="accordion">' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion" data-toggle="collapse" href="#panel-04" aria-expanded="true" aria-controls="panel-04">Igualdad y no discriminación</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button collapsed" data-parent="#accordion" data-toggle="collapse" href="#panel-04"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse" id="panel-04">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div id="recepDerF"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '        </div>' + 

                    '        <div class="panel-group ficha-collapse" id="accordion">' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion" data-toggle="collapse" href="#panel-05" aria-expanded="true" aria-controls="panel-05">Acceso a información pública y participación</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button collapsed" data-parent="#accordion" data-toggle="collapse" href="#panel-05"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse" id="panel-05">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div id="recepDerI"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '        </div>' + 

                    '        <div class="panel-group ficha-collapse" id="accordion">' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion" data-toggle="collapse" href="#panel-06" aria-expanded="true" aria-controls="panel-06">Acceso a la justicia</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button collapsed" data-parent="#accordion" data-toggle="collapse" href="#panel-06"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse" id="panel-06">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div id="recepDerJ"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '        </div>' + 
                    '    </div>' + 

                    '</div>' + 

                    '<!--  Vista Matríz -->' + 

                  '<div class="row internoDerechoMatriz" >' + 
                    '  <div class="row alinea-derecha">' + 
                    '    <button type="button" class="btn btn-primary btnListado">Vista listado</button>' + 
                    '    <button type="button" class="btn btn-primary btnMatriz">Vista matríz</button>' + 
                    '  </div>' + 

                    '  <div class="example">' + 
                    '        <div class="panel-group ficha-collapse" id="accordion">' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion" data-toggle="collapse" href="#panel-011" aria-expanded="true" aria-controls="panel-011">Recepción del derecho</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button" data-parent="#accordion" data-toggle="collapse" href="#panel-011"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse in" id="panel-011">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div id="recepDerMatrizA"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '        </div>' + 

                    '       <div class="panel-group ficha-collapse" id="accordion">' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion" data-toggle="collapse" href="#panel-021" aria-expanded="true" aria-controls="panel-021">Contexto financiero y presupuestal</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button collapsed" data-parent="#accordion" data-toggle="collapse" href="#panel-021"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse" id="panel-021">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div id="recepDerMatrizC"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '        </div>' + 

                    '        <div class="panel-group ficha-collapse" id="accordion">' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion" data-toggle="collapse" href="#panel-031" aria-expanded="true" aria-controls="panel-031">Capacidades estatales</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button collapsed" data-parent="#accordion" data-toggle="collapse" href="#panel-031"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse" id="panel-031">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div id="recepDerMatrizD"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '        </div>' + 

                    '        <div class="panel-group ficha-collapse" id="accordion">' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion" data-toggle="collapse" href="#panel-041" aria-expanded="true" aria-controls="panel-041">Igualdad y no discriminación</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button collapsed" data-parent="#accordion" data-toggle="collapse" href="#panel-041"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse" id="panel-041">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div id="recepDerMatrizF"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '        </div>' + 

                    '        <div class="panel-group ficha-collapse" id="accordion">' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion" data-toggle="collapse" href="#panel-051" aria-expanded="true" aria-controls="panel-051">Acceso a información pública y participación</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button collapsed" data-parent="#accordion" data-toggle="collapse" href="#panel-051"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse" id="panel-051">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div id="recepDerMatrizI"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '        </div>' + 

                    '        <div class="panel-group ficha-collapse" id="accordion">' + 
                    '            <div class="panel panel-default">' + 
                    '                <div class="panel-heading">' + 
                    '                    <h4 class="panel-title">' + 
                    '                        <a data-parent="#accordion" data-toggle="collapse" href="#panel-061" aria-expanded="true" aria-controls="panel-061">Acceso a la justicia</a>' + 
                    '                    </h4>' + 
                    '                    <button type="button" class="collpase-button collapsed" data-parent="#accordion" data-toggle="collapse" href="#panel-061"></button>' + 
                    '                </div>' + 
                    '                <div class="panel-collapse collapse" id="panel-061">' + 
                    '                    <div class="panel-body">' + 
                    '                        <div id="recepDerMatrizJ"><p>Cargando información...</p></div>' + 
                    '                    </div>' + 
                    '                </div>' + 
                    '            </div>' + 
                    '        </div>' + 
                    '  </div>' + 
                  '</div>';
        return indis;
    }
    
});