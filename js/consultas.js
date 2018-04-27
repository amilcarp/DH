//---- Variables
var tipoDer = [];
var acumula = [];
var tablaInd =  '';
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
    
    $.ajax({
		  type: 'GET',
		  url: "https://datosabiertos.unam.mx/api/alice/search?q=right_id:6&rows=100",
		  data: {},
		  success: function( data, textStatus, jqxhr ) {      
              tipoDer = data['results']['records'];
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
    
    
    function getTipoIndicador(tipoIndicador){
        return tipoIndicador === "E"? '<p class="tipoIndicador colorE" data-toggle="tooltip" data-placement="top" title="Indicador Estructural">E</p>' :  tipoIndicador === "P"? '<p class="tipoIndicador colorP" data-toggle="tooltip" data-placement="top" title="Indicador de Proceso">P</p>':  tipoIndicador === "R"? '<p class="tipoIndicador colorR" data-toggle="tooltip" data-placement="top" title="Indicador de Resultado">R</p>': 'N/D';
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
    
});