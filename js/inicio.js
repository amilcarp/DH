//---- Variables
var pathAPI = "https://datosabiertos.unam.mx/api/alice/";
var tipoDer = [];
var countDer = [];
var acumula = [];
var tablaInd, cuadroDer =  '';
var contenido;

$(document).ready(function () {
    
    console.log(nombreDerechos());
    
    function init(){
        var x;
         var valores = nombreDerechos();
        //var valores = nombreDerechos();
        console.log(valores);
        for (x = 0; x < valores.length; x++){
            //getValores(valores[i]);
            console.log(valores[x]);
        }
    }
    
//    derechos();
   //getValores('Alimentación');
//
   //function getValores(derecho){
        var derecho = "Medio Ambiente";
         $.ajax({
		  type: 'GET',
		  url: pathAPI + "search?q=right_name_short_lit:"+derecho+"&rows=100",
		  data: {},
		  success: function( data, textStatus, jqxhr ) {      
              tipoDer = data['results']['records'];
              derechos();

		  },
		  async:true
		});
    //}
    
    var estatusDerecho = nombreDerechos();
    function estatus(derecho){
        var uno = "";
        for(var i = 0; i < estatusDerecho.length; i++){
            uno = estatusDerecho[i];
        }
        uno = derecho;
        
        return uno === "Alimentación" ? 'Disponible' :  uno === "Medio Ambiente" ? 'Cuantis':  uno === "Sindicales" ? 'Cualis': uno === "Culturales" ? 'No disponible': 'Trabajo';
    }
    
    
//    
//    https://datosabiertos.unam.mx/api/alice/search?q=*:*&rows=0&fac.json={array:{type:%22terms%22,field:%22right_name_lit%20AND%20is_cuantitative:false%22,limit:10,facet:{unique_indicators:%22unique(indicator_name_lit)%22,indicators_null:{type:%22query%22,q:%22-indicator_name:[*%20TO%20*]%22}}}}
//    
//    
    
   
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
                                     '<p><a href="#'+ countDer[i]['val']+'" data-toggle="modal" data-target="#'+ countDer[i]['val']+'"><b>'+estatus(countDer[i]['val'])+'</b></a></p>'+
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
                                     '<p><a href="#'+ countDer[i]['val']+'" data-toggle="modal" data-target="#'+ countDer[i]['val']+'"><b>'+estatus(countDer[i]['val'])+'</b></a></p>'+
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
                                     '<p><a href="#'+ countDer[i]['val']+'" data-toggle="modal" data-target="#'+ countDer[i]['val']+'"><b>'+estatus(countDer[i]['val'])+'</b></a></p>'+
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
    

});