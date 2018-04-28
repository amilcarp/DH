//---- Variables
var datosDer = [];
var acumula = [];
var tablaInd =  '';
var contenido;

var url_string = window.location.href; //window.location.href
var url = new URL(url_string);
var c = url.searchParams.get("codigo");

$(document).ready(function() {
    
    $.ajax({
		  type: 'GET',
		  url: "https://datosabiertos.unam.mx/api/alice/search?q=guid:/"+ c +"/",
		  data: {},
		  success: function( data, textStatus, jqxhr ) {      
              datosDer = data['results']['records'];
              console.log(datosDer);
              console.log(datosDer[0].indicator_code);
              
              $('#claveInd').html(datosDer[0].indicator_code);
              $('#categoriaInd').html(datosDer[0].right_name_short);
              $('#tituloInd').html(datosDer[0].indicator_code + ' - ' + datosDer[0].indicator_name);
              $('#tInd').html(datosDer[0].indicator_code + ' - ' + datosDer[0].indicator_name);
              $('#fuenteInd').html(datosDer[0].evidence_name + ' - ' + datosDer[0].evidence_url);
              
              
		  },
		  async:true
		});
    
    
    function getTipoIndicador(tipoIndicador){
        return tipoIndicador === "E"? '<p class="tipoIndicador colorE" data-toggle="tooltip" data-placement="top" title="Indicador Estructural">E</p>' :  tipoIndicador === "P"? '<p class="tipoIndicador colorP" data-toggle="tooltip" data-placement="top" title="Indicador de Proceso">P</p>':  tipoIndicador === "R"? '<p class="tipoIndicador colorR" data-toggle="tooltip" data-placement="top" title="Indicador de Resultado">R</p>': 'N/D';
    }
   
    
    function getMetadatos(){
        
    }
    
});