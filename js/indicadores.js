//---- Variables
var datosDer = [];
var acumula = [];
var tablaInd =  '';
var contenido, cuali, cuanti;

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

              console.log(indicadorCuali(datosDer));

            if(datosDer[0].is_cuantitative == false){
                $('#indicadores').html(indicadorCuali(datosDer));
            }else{
                $('#indicadores').html(indicadorCuanti(datosDer));
            }
              
            $('#claveInd').html(datosDer[0].indicator_code);
            $('#categoriaInd').html(datosDer[0].right_name_short);
            $('#tituloInd').html(datosDer[0].indicator_code + ' - ' + datosDer[0].indicator_name);
            $('#tInd').html(datosDer[0].indicator_code + ' - ' + datosDer[0].indicator_name);
            $('#fuenteInd').html(datosDer[0].evidence_name + ' - <a href="'+ datosDer[0].evidence_url + '">' + datosDer[0].evidence_url + '</a>');
            $('#descarDatos1').html(datosDer[0].indicator_code + ' - ' + datosDer[0].indicator_name);
            $('#descarDatos2').html(datosDer[0].indicator_definition);
            $('#descarDatos3').html(datosDer[0].institution_name_evidencie);
              
              
		  },
		  async:true
		});
    
    
    function getTipoIndicador(tipoIndicador){
        return tipoIndicador === "E" ? '<p class="tipoIndicador colorE" data-toggle="tooltip" data-placement="top" title="Indicador Estructural">E</p>' :  tipoIndicador === "P" ? '<p class="tipoIndicador colorP" data-toggle="tooltip" data-placement="top" title="Indicador de Proceso">P</p>':  tipoIndicador === "R" ? '<p class="tipoIndicador colorR" data-toggle="tooltip" data-placement="top" title="Indicador de Resultado">R</p>': 'N/D';
    }
   
    
    function getMetadatos(){
        
    }
    
    function indicadorCuali(data){
        
        cuali = '<!-- Inicia Bloque -->' +
		      '<div class="row">' +
			      '<div class="col-md-12">' +
				      '<h1 id="tituloInd">' + data[0].indicator_code + ' - ' + data[0].indicator_name + '</h1>' +
				      '<hr />' +
				      '<div class="row">' +
					  	'<ul class="nav nav-tabs">' +
                            '<li class="active"><a data-toggle="tab" href="#tab-01">Indicador</a></li>' +
                            '<li><a data-toggle="tab" href="#tab-02">Evidencias</a></li>' +
                        '</ul>' +
                        '<div class="tab-content">' +
                            '<div class="tab-pane active" id="tab-01">' +
                                
                                '<h2>' + datosDer[0].indicator_name + '</h2>' +
                                
                                '<table class="table table-striped">' +
                                    '<tbody>' +
                                       '<tr>' +
                                            '<td>Clave</td>' +
                                            '<td>' + data[0].indicator_code + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Descripción</td>' +
                                            '<td>' + data[0].indicator_definition + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Evidencia</td>' +
                                            '<td>' + data[0].evidence_name + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Unidad de Observación</td>' +
                                            '<td>'+ data[0].observation_unit_name +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Firma</td>' +
                                            '<td>'+ data[0].validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Aceptación</td>' +
                                            '<td>'+ data[0].validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Promulgación</td>' +
                                            '<td>'+ data[0].validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Adhesión</td>' +
                                            '<td>'+ data[0].validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                           '<td>Fecha de Vinculación</td>' +
                                            '<td>'+ data[0].validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Publicación</td>' +
                                            '<td>'+ data[0].validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Entrada en Vigor</td>' +
                                            '<td>'+ data[0].validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>URL</td>' +
                                            '<td><a href="' + data[0].evidence_url + '" target="_blank">' + data[0].evidence_url + '</a></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Actualización</td>' +
                                            '<td>' + data[0].update_date_lit + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Entidad Responsable de Validación</td>' +
                                            '<td>' + data[0].institution_name_evidencie + '</td>' +
                                        '</tr>' +
                                    '</tbody>' +
                                '</table>' +

                                '<div class="row">' +
                                    '<div class="col-md-10">' +
                                        '<p><b>Nota: </b> [Aquí va la nota de los datos del indicador, sí es que la hay]</p>' +
                                        '<p><b>Fuente: </b> ' + data[0].evidence_name + ' - <a href="' + data[0].evidence_url + '" target="_blank">' + data[0].evidence_url + '</a></p>' +
                                        '<p><b>Fecha de actualización: </b> '+ data[0].update_date_lit +'</p>' +
                                    '</div>' +
                                '</div>' +
                                
                            '</div>' +
                            
                            '<div class="tab-pane" id="tab-02">' +
                                '<table class="table table-striped">' +
                                    '<tbody>' +
                                       '<tr>' +
                                            '<td>Clave</td>' +
                                            '<td>' + data[0].indicator_code + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Descripción</td>' +
                                            '<td>' + data[0].indicator_definition + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Evidencia</td>' +
                                            '<td>' + data[0].evidence_name + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Unidad de Observación</td>' +
                                            '<td>'+ data[0].observation_unit_name +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Firma</td>' +
                                            '<td>'+ data[0].validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Aceptación</td>' +
                                            '<td>'+ data[0].validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Promulgación</td>' +
                                            '<td>'+ data[0].validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Adhesión</td>' +
                                            '<td>'+ data[0].validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                           '<td>Fecha de Vinculación</td>' +
                                            '<td>'+ data[0].validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Publicación</td>' +
                                            '<td>'+ data[0].validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Entrada en Vigor</td>' +
                                            '<td>'+ data[0].validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>URL</td>' +
                                            '<td><a href="' + data[0].evidence_url + '" target="_blank">' + data[0].evidence_url + '</a></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Actualización</td>' +
                                            '<td>' + data[0].update_date_lit + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Entidad Responsable de Validación</td>' +
                                            '<td>' + data[0].institution_name_evidencie + '</td>' +
                                        '</tr>' +
                                    '</tbody>' +
                                '</table>' +
                            '</div>'
                        '</div>' +
				      '</div>' +
				      
			      '</div>' +
		      '</div><!-- Termina Bloque -->';
		      return cuali;
    }
    
    function indicadorCuanti(data){
        
        cuanti = '<!-- Inicia Bloque -->' +
		      '<div class="row">' +
			      '<div class="col-md-12">' +
				      '<h1 id="tituloInd">' + data[0].indicator_code + ' - ' + data[0].indicator_name + '</h1>' +
				      '<hr />' +
				      '<div class="row">' +
					  	'<ul class="nav nav-tabs">' +
                            '<li class="active"><a data-toggle="tab" href="#tab-011">Indicador</a></li>' +
                            '<li><a data-toggle="tab" href="#tab-022">Metadato</a></li>' +
                            '<li><a data-toggle="tab" href="#tab-033">Datos para el cálculo</a></li>' +
                        '</ul>' +
                        '<div class="tab-content">' +
                            '<div class="tab-pane active" id="tab-011">' +
                                
                                '<h2>' + data[0].indicator_definition + '</h2>' +
                                
                                '<svg width="960" height="500"></svg>' +
                                
                                '<div class="row">' +
                                    '<div class="col-md-10">' +
                                        '<p><b>Nota: </b> ' + data[0].indicator_reference + '</p>' +
                                        '<p><b>Fuente: </b> <span id="fuenteInd">'+data[0].indicator_reference+'</span></p>' +
                                    '</div>' +
                                '</div>' +
                                
                            '</div>' +
                            
                            '<div class="tab-pane" id="tab-022">' +
                            
                                '<table class="table table-striped">' +
                                    '<tbody>' +
                                        '<tr>' +
                                            '<td>Definición</td>' +
                                            '<td>' + data[0].indicator_definition + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fórmula</td>' +
                                            '<td>'+data[0].indicator_formule_code+'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Elementos del cálculo</td>' +
                                            '<td>'+data[0].indicator_calculation_element+'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fuente de la fórmula</td>' +
                                            '<td>'+data[0].indicator_source_formule+'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Estado de Validación de la fórmula</td>' +
                                            '<td>En datos.gob.mx</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Unidad de Medida</td>' +
                                            '<td>'+data[0].indicator_measure_unit+'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Referencia</td>' +
                                            '<td>'+data[0].indicator_reference+'</td>' +
                                        '</tr>' +
                                    '</tbody>' +
                                '</table>' +
                                
                            '</div>' +
                            
                            '<div class="tab-pane" id="tab-033">' +
                                '<h3>[Aquí iría una tabla que represente los datos para el cálculo]</h3>' +
                            '</div>' +
                            
                        '</div>' +
				      '</div>' +
				      
			      '</div>' +
		      '</div>' +
		      '<!-- Termina Bloque -->';
        return cuanti;
    }
    
});