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
var contenido;

$(document).ready(function() {
    
    $.ajax({
		  type: 'GET',
		  url: "https://datosabiertos.unam.mx/api/alice/search?q=right_id:6&rows=100",
		  data: {},
		  success: function( data, textStatus, jqxhr ) {      
              tipoDer = data['results']['records'];
              recepDer();
                $('#recepDerA').html('<table class="table"><tbody>' + tablaIndContA + '</tbody></table>' );
                $('#recepDerC').html('<table class="table"><tbody>' + tablaIndContC + '</tbody></table>' );
                $('#recepDerD').html('<table class="table"><tbody>' + tablaIndContD + '</tbody></table>' );
                $('#recepDerF').html('<table class="table"><tbody>' + tablaIndContF + '</tbody></table>' );
                $('#recepDerI').html('<table class="table"><tbody>' + tablaIndContI + '</tbody></table>' );
                $('#recepDerJ').html('<table class="table"><tbody>' + tablaIndContJ + '</tbody></table>' );
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
                              '<td>'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name +'</td>' +
                              '<td>'+ tipoDer[i].indicator_definition +'</td>' +
                          '</tr>';
            }else if(tipoDer[i].indicator_category_key == 'c'){
                 tablaIndContC += '<tr>' +
                              '<td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +
                              '<td>'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name +'</td>' +
                              '<td>'+ tipoDer[i].indicator_definition +'</td>' +
                          '</tr>';
            }else if(tipoDer[i].indicator_category_key == 'd'){
                tablaIndContD += '<tr>' +
                              '<td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +
                              '<td>'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name +'</td>' +
                              '<td>'+ tipoDer[i].indicator_definition +'</td>' +
                          '</tr>';
            }else if(tipoDer[i].indicator_category_key == 'f'){
                tablaIndContF += '<tr>' +
                              '<td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +
                              '<td>'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name +'</td>' +
                              '<td>'+ tipoDer[i].indicator_definition +'</td>' +
                          '</tr>';
            }else if(tipoDer[i].indicator_category_key == 'i'){
                tablaIndContI += '<tr>' +
                              '<td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +
                              '<td>'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name +'</td>' +
                              '<td>'+ tipoDer[i].indicator_definition +'</td>' +
                          '</tr>';
            }else if(tipoDer[i].indicator_category_key == 'j'){
                tablaIndContJ += '<tr>' +
                              '<td>'+getTipoIndicador(tipoDer[i].indicator_type_code)+'</td>' +
                              '<td>'+ tipoDer[i].indicator_code + ' - ' + tipoDer[i].indicator_name +'</td>' +
                              '<td>'+ tipoDer[i].indicator_definition +'</td>' +
                          '</tr>';
            }

        }       
    }// Termina function 
    
});