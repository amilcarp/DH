//---- Variables
var pathAPI = "https://datosabiertos.unam.mx/api/alice/";
var pathAPIGob = "https://api.datos.gob.mx/v1/";
var datosDer = [];
var acumula = [];
var tablaInd =  '';
var contenido, cuali, cuanti;
var datoInd = [];
var datoInd2 = [];
var miObj = new Object();
var todo = [];
var gob = [];
var muestraGrafica = false;
//var gobGrupo = [];
var res = '';
var rec = '';
var clas = '';
var res2 = '';
var rec2 = '';
var clas2 = '';
var dat111;
var str = "0";
var tados;
var tabulado1, tabulado2;

var JSONvar = [];

var url_string = window.location.href; //window.location.href
var url = new URL(url_string);
var c = url.searchParams.get("codigo");


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};



function apiGOB(resource, dataset, page, total){
        $.ajax({
		  type: 'GET',
		  url: pathAPIGob + 'ckan.'+dataset+'.'+resource+'?page='+page+'',
		  data: {},
		  success: function( data, textStatus, jqxhr ) {
              gob = data;
		  },
		  async:false
		});
        return gob;
    }
    
    
    function apiGobGrupo(resource, dataset, atributo, variable){
        var gobGrupo = [];
        
        if(atributo === null || variable === null){
            $.ajax({
              type: 'GET',
              url: pathAPIGob + 'ckan.'+dataset+'.'+resource,
              data: {},
              success: function( data, textStatus, jqxhr ) {
                  gobGrupo = data['results'];
              },
              async:false
          });
        }else{
            $.ajax({
              type: 'GET',
              url: pathAPIGob + 'ckan.'+dataset+'.'+resource+'?'+atributo+'='+variable,
              data: {},
              success: function( data, textStatus, jqxhr ) {
                  gobGrupo = data['results'];
              },
              async:false
		  });
        }
        
        return gobGrupo;
    }


$(document).ready(function() {    
    
       function reemplazaChar(string){
            //string = string.replace(/\r\n/g,"\n");
            var utftex= "";
            var letr = ["á","é","í","ó","ú","Á","É","Í","Ó","Ú","ñ","Ñ","\n"," "];
            var cambio = ["\\acute{a}","\\acute{e}","\\acute{i}","\\acute{o}","\\acute{u}","\\acute{A}","\\acute{E}","\\acute{I}","\\acute{O}","\\acute{U}","\\tilde{n}","\\tilde{N}","\\*","\~"];
       
            for(var i = 0; i < letr.length; i++)
            {
                string = string.replaceAll(new RegExp(letr[i], 'g'),cambio[i]);      
            }
            //console.log(string);
            return string;
        }
    
    
    // Aquí se cargan los datos de los derechos
    $.ajax({
		  type: 'GET',
		  url: pathAPI + "data/" + c,
		  data: {},
		  success: function( data, textStatus, jqxhr ) {      
            datosDer = data;

            if(datosDer.is_cuantitative == false){
                $('#indicadores').html(indicadorCuali(datosDer));
            }else{
                if(datosDer.breakdown_group != null){
                    $('#indicadores').html(indicadorCuanti(datosDer,true));
                }else{
                    $('#indicadores').html(indicadorCuanti(datosDer,false));
                }
            }
              
            $('#claveInd').html(datosDer.indicator_code);
            $('#categoriaInd').html('<a href="derechos.html#'+sinEspacios(datosDer.right_name_short)+'">' + datosDer.right_name_short+'</a>');
            $('#tituloInd').html(datosDer.indicator_code + ' - ' + datosDer.indicator_name);
            $('#tInd').html(datosDer.indicator_code + ' - ' + datosDer.indicator_name);
            $('#fuenteInd').html(datosDer.evidence_name + ' - <a href="'+ datosDer.evidence_url + '">' + datosDer.evidence_url + '</a>');
            $('#descarDatos1').html(datosDer.indicator_code + ' - ' + datosDer.indicator_name);
            $('#descarDatos2').html(datosDer.indicator_definition);
            $('#descarDatos3').html(datosDer.responsible_institution);
              

            //Muestra u oculta botones para las gráficas y los tabulados
            $(".btnGrafica").show();
            //$(".btnGrafica").show();
            $(".btnTabla").hide();
            $(".divGrafica").hide();
            $(".divTabla").show();
            $(".btnGrafica").on("click",function(){ 
                $(".btnGrafica").hide();
                $(".btnTabla").show();
                $(".divGrafica").show();
                $(".divTabla").hide();
                //$(".verGrafica").html(graficaCuanti(JSONvar,'Ln',str)); //fuente, tipoGrafica, ejeX, ejeY, color, datos 
                var variable = $('#breakdown').val();
                
                $(".verGrafica .divGrafica svg").html('');
            $(".verGrafica").html(tipoGrafica(datosDer.breakdown_group[variable].graphic[0].graphic_key, datosGrafica(data.breakdown_group[str].resource_id, data.breakdown_group[str].variable_dataset_id, data.breakdown_group[str].breakdown_attribute_result, data.breakdown_group[str].breakdown_attribute, data.breakdown_group[str].breakdown_group_year, data.breakdown_group[str].breakdown_resource_name), 'Periodo', datosDer.breakdown_group[variable].breakdown_resource_name[0], '#f00', datosDer));
                
                //$(".verGrafica").html(tipoGrafica('Ln', "AaR02.json", 'Periodo', 'poblacion_de_18_anios_o_mas', '#f00', datosDer));
                //tipoGrafica(tipo, fuente, ejeX, ejeY, color, datos)
            });
            $(".btnTabla").on("click",function(){
                $(".btnGrafica").show();
                $(".btnTabla").hide();
                $(".divGrafica").hide();
                $(".divTabla").show();
            });
        
        
        function armaTabla(data, str){
            var cua = "";
           // cua += datosGrafica(data.breakdown_group[str].resource_id, data.breakdown_group[str].variable_dataset_id, data.breakdown_group[str].breakdown_attribute_result, data.breakdown_group[str].breakdown_attribute, data.breakdown_group[str].breakdown_group_year, data.breakdown_group[str].breakdown_resource_name);
            //console.log(datosTabulado(data.breakdown_group[str].resource_id, data.breakdown_group[str].variable_dataset_id, data.breakdown_group[str].breakdown_attribute_result, data.breakdown_group[str].breakdown_attribute, data.breakdown_group[str].breakdown_group_year, data.breakdown_group[str].breakdown_resource_name));
            console.log(data.breakdown_group[str].breakdown_attribute);
            cua += '<div class="tabulado'+str+'" style="padding:25px 0 0 0;">';
//            cua += '<h3>' + data.breakdown_group[str].breakdown_group_name + '</h3><br />';
            cua += datosTabulado(data.breakdown_group[str].resource_id, data.breakdown_group[str].variable_dataset_id, data.breakdown_group[str].breakdown_attribute_result, data.breakdown_group[str].breakdown_attribute, data.breakdown_group[str].breakdown_group_year, data.breakdown_group[str].breakdown_resource_name);
            cua += '</div>';
            console.log(cua);
            return cua;
        }
              
            $("#breakdown").on("change", function() {
                console.log("Si jaló ------------------------");
                str = $(this).val();
                console.log(str);
                console.log(datosDer);
                if($('.btnGrafica').show()){
                    muestraGrafica = true;
                    $(".divGrafica").hide();
                    $(".divTabla").show();
                    $(".btnGrafica").show();
                    $(".btnTabla").hide();
                    $(".verTabla").html(armaTabla(datosDer,str));
                }else{
                    muestraGrafica = false;
                    $(".divGrafica").show();
                    $(".divTabla").hide();
                    $(".btnGrafica").hide();
                    $(".btnTabla").show();
//                    $(".verGrafica").html(graficaCuanti(datosDer,'Ln',str)); //fuente, tipoGrafica, ejeX, ejeY, color, datos
                    $(".verGrafica").append('<div class="divGrafica"><svg id="graph" width="960" height="500"></svg></div>');
                    console.log('Pone la gráfica');
                }
                //$(".verTabla").html(armaTabla(datosDer,str));
//                $(".verGrafica").html('<div class="divGrafica"><svg id="graph" width="960" height="500"></svg></div>');
//                $(".verGrafica").append(graficaCuanti(datosDer,str));
                //$(".verGrafica").html(graficaCuanti(datosDer,str));
                console.log("Aquí hace algo------------------");
            });
            
            // Mostramos
              $('#breakdown').val('0').change();
              
              
              
		  },
		  async:true
		});
    
    
    function getTipoIndicador(tipoIndicador){
        return tipoIndicador === "E" ? '<p class="tipoIndicador colorE" data-toggle="tooltip" data-placement="top" title="Indicador Estructural">E</p>' :  tipoIndicador === "P" ? '<p class="tipoIndicador colorP" data-toggle="tooltip" data-placement="top" title="Indicador de Proceso">P</p>':  tipoIndicador === "R" ? '<p class="tipoIndicador colorR" data-toggle="tooltip" data-placement="top" title="Indicador de Resultado">R</p>' : 'N/D';
    }
   
     
    function indicadorCuali(data){
        
        cuali = '<!-- Inicia Bloque -->' +
		      '<div class="row">' +
			      '<div class="col-md-12">' +
				      '<h1 id="tituloInd">' + data.indicator_code + ' - ' + data.indicator_name + '</h1>' +
				      '<hr />' +
				      '<div class="row">' +
					  	'<ul class="nav nav-tabs">' +
                            '<li class="active"><a data-toggle="tab" href="#tab-01">Indicador</a></li>' +
                            '<li><a data-toggle="tab" href="#tab-02">Evidencias</a></li>' +
                        '</ul>' +
                        '<div class="tab-content">' +
                            '<div class="tab-pane active" id="tab-01">' +
                                
                                '<h2>' + datosDer.indicator_name + '</h2>' +
                                
                                '<table class="table table-striped">' +
                                    '<tbody>' +
                                        '<tr>' +
                                            '<td>Derecho</td>' +
                                            '<td>'+ data.right_name_short +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Categoría/Principio Transversal</td>' +
                                            '<td>'+ data.indicator_category_name +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Clave</td>' +
                                            '<td>' + data.indicator_code + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Nombre</td>' +
                                            '<td>' + data.indicator_name + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Tipo de Indicador</td>' +
                                            '<td>' + data.indicator_type_short + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Descripción</td>' +
                                            '<td>' + data.indicator_definition + '</td>' +
                                        '</tr>' +
                                    '</tbody>' +
                                '</table>' +
                                
                            '</div>' +
                            
                            '<div class="tab-pane" id="tab-02">' +
                                '<table class="table table-striped">' +
                                    '<tbody>' +
                                       '<tr>' +
                                            '<td>Clave</td>' +
                                            '<td>' + data.indicator_code + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Descripción</td>' +
                                            '<td>' + data.indicator_definition + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Evidencias</td><td style="line-height:1.2;">';
            
                                            for(var i = 0; i< data.evidence.length; i++){
                                                var vigencia = data.evidence[i].validity_year_start + '-' + data.evidence[i].validity_end_start;
                                                 cuali += '<p><b>Evidencia:</b> ' + data.evidence[i].evidence_name + '</p>' +
                                                        '<p><b>Unidad de Observación:</b> ' + data.evidence[i].observation_unit_name + '</p>' +
                                                        '<p><b>URL:</b> ' + '<a href="' + data.evidence[i].evidence_url + '" target="_blank">' + data.evidence[i].evidence_url + '</a>' + '</p>' +
                                                        '<p><b>Entidad que valida:</b> ' + data.evidence[i].institution_name_evidencie  + '</p>';
                                                        cuali += (data.evidence[i].validity_year_start === null || data.evidence[i].validity_end_start === null) ? '' : '<p><b>Vigencia:</b> ' + vigencia + '</p>' +
                                                        '<p><b>Fecha de actualización de la evidencia:</b> ' + moment(data.evidence[i].update_date).format('DD-MM-YYYY') + '</p>';
                                                if(typeof data.evidence[i].validity_date_evidence !== 'undefined'){
                                                    for(var j = 0; j< data.evidence[i].validity_date_evidence.length; j++){
                                                        cuali += '<p><b>Fecha de '+ data.evidence[i].validity_date_evidence[j].date_type_name +':</b> ' + moment(data.evidence[i].validity_date_evidence[j].validity_date).format('DD-MM-YYYY') + '</p>';
                                                    }
                                                }
                                                if(typeof data.evidence[i].objective !== 'undefined'){
                                                    for(var k = 0; k< data.evidence[i].objective.length; k++){
                                                        cuali += '<br />';
                                                        cuali += (data.evidence[i].objective[k].objective_sequence === null) ? '' : '<p><b>Objetivo '+ data.evidence[i].objective[k].objective_sequence +':</b> ' + data.evidence[i].objective[k].objective_name + '</p>';
                                                        cuali += (data.evidence[i].objective[k].strategy_sequence === null) ? '' : '<p><b>Estrategia '+ data.evidence[i].objective[k].strategy_sequence +':</b> ' + data.evidence[i].objective[k].strategy_name + '</p>';
                                                        cuali += (data.evidence[i].objective[k].action_line_sequence === null) ? '' : '<p><b>Línea de acción '+ data.evidence[i].objective[k].action_line_sequence +':</b> ' + data.evidence[i].objective[k].action_line_name + '</p>';
                                                        
                                                    }
                                                }
                                                if(typeof data.evidence[i].complementary_attribute !== 'undefined'){
                                                    for(var l = 0; l < data.evidence[i].complementary_attribute.length; l++){
                                                        cuali += (data.evidence[i].complementary_attribute[l].objective_sequence === null) ? '' : '<p><b>'+ data.evidence[i].complementary_attribute[l].complementary_attribute_name +':</b> ' + data.evidence[i].complementary_attribute[l].complementary_attribute_description + '</p>';
                                                    }
                                                }
                                                if(typeof data.evidence[i].paper !== 'undefined'){
                                                    for(var m = 0; m < data.evidence[i].paper.length; m++){
                                                        cuali += (data.evidence[i].paper[m].paper_sequence === null) ? '' : '<p><b>Artículo '+ data.evidence[i].paper[m].paper_sequence +':</b> ' + data.evidence[i].paper[m].paper_name + '</p>';
                                                    }
                                                }

                                                cuali += '<hr>';
                                            }
                              
                                       cuali += '</td></tr>' +
                                    '</tbody>' +
                                '</table>' +
                            '</div>'
                        '</div>' +
				      '</div>' +
				      
			      '</div>' +
		      '</div><!-- Termina Bloque -->';
		      return cuali;
    }
    
    
    function formulas(formula){
        var img = '';
        var j = 2;
        
        if(formula !== null){
            for(var i = 0; i < formula.length-1; i++){
            i++;
            if(formula[i] === null){
                
            }else{
                img += '<img src="http://latex.codecogs.com/svg.latex?'+formula[i]+'" border="0" style="" /> <span>'+formula[i+1]+'</span><br/>';
//                console.log(formula[i]);
            }
           }
        }else{
            img += 'Sin información';
        }
        return img;
    }
    
    function muestraDatos(array){
        var dato = '';
        for(var i=0;i<array.length;i++){
            dato += array[i];
        }
        return dato;
    }
    
    function iuio(tados){
        for(var rrr = 0; rrr < tados.length; rrr++){
            cuanti += '<div class="tabulado'+rrr+'">';
            cuanti += '<h3>' + tados[rrr].breakdown_group_name + '</h3><br />';
            cuanti += datosTabulado(tados[rrr].resource_id, tados[rrr].variable_dataset_id, tados[rrr].breakdown_attribute_result, tados[rrr].breakdown_attribute, tados[rrr].breakdown_group_year, tados[rrr].breakdown_resource_name);
            cuanti += '</div>';
        }
    }
    
    
    function llamaDatos(data, key){
            cuanti += '<div class="tabulado'+key+'">';
            cuanti += '<h3>' + tados[key].breakdown_group_name + '</h3><br />';
            cuanti += datosTabulado(tados[key].resource_id, tados[key].variable_dataset_id, tados[key].breakdown_attribute_result, tados[key].breakdown_attribute, tados[key].breakdown_group_year, tados[key].breakdown_resource_name);
            cuanti += '</div>';
    }
    
    function armaTabla(data, str){
        var cua = '';
            cua += '<div class="tabulado'+str+'">';
            cua += '<h3>' + data.breakdown_group[str].breakdown_group_name + '</h3><br />';
            cua += datosTabulado(data.breakdown_group[str].resource_id, data.breakdown_group[str].variable_dataset_id, data.breakdown_group[str].breakdown_attribute_result, data.breakdown_group[str].breakdown_attribute, data.breakdown_group[str].breakdown_group_year, data.breakdown_group[str].breakdown_resource_name);
            cua += '</div>';
        console.log(cua);
        return cua;
    }
    
    
    function indicadorCuanti(data,tieneBreakdown){

        var formCalculo = data.indicator_calculation_element;
        var res;
        if(formCalculo === null){
            res = null;
        }else{
         res = formCalculo.split("$* ");   
        }

        cuanti = '<!-- Inicia Bloque -->' +
		      '<div class="row">' +
			      '<div class="col-md-12">' +
				      '<h1 id="tituloInd">' + data.indicator_code + ' - ' + data.indicator_name + '</h1>' +
				      '<hr />' +
				      '<div class="row">' +
					  	'<ul class="nav nav-tabs">' +
                            '<li class="active"><a data-toggle="tab" href="#tab-011">Indicador</a></li>' +
                            '<li><a data-toggle="tab" href="#tab-022">Metadato</a></li>' +
//                            '<li><a data-toggle="tab" href="#tab-033">Datos para el cálculo</a></li>' +
                        '</ul>' +
                        '<div class="tab-content">' +
                            '<div class="tab-pane active" id="tab-011">' +
                                '<div class="row">';
        
                                    if(tieneBreakdown === true){
                                        cuanti += '<div class="col-md-10">';
                                        tados = data.breakdown_group;
                                        if(tados.length > 1){
                                            cuanti += '<br/><span>Elige un desglose: </span><select name="breakdown" id="breakdown">';
                                            for (var m=0;m<tados.length;m++){
                                                cuanti += '<option value="' + m + '">' + data.breakdown_group[m].breakdown_group_name + '</option>';
                                            }
                                            cuanti += '</select>';
                                           }else{
                                               cuanti += '<select name="breakdown" id="breakdown" style="visibility:hidden">';
                                                for (var m=0;m<tados.length;m++){
                                                    cuanti += '<option value="' + m + '">' + data.breakdown_group[m].breakdown_group_name + '</option>';
                                                }
                                                cuanti += '</select>';
                                           }
                                        
                                        cuanti += '</div>' +
                                                '<div class="col-md-2">' +
                                                    '<button type="button" class="btn btn-primary btnGrafica">Ver Gráfica</button> <button type="button" class="btn btn-primary btnTabla">Ver Tabla</button>' +
                                                '</div>';
                                    }else{
                                        cuanti += '<h3>Sin información disponible.</h3>';
                                    }

                                    cuanti += '</div>';
        
                                //var tados = data.breakdown_group;
                                
                                cuanti += '<div class="divTabla">';
                                cuanti += '<div class="verTabla" style="width: 100%;overflow-x: auto;"></div>';
        
                                cuanti += '</div>';
                                
                                cuanti += '<div class="verGrafica" style="padding:30px 0 10px 0;"><div class="divGrafica"><svg id="graph" width="960" height="500"></svg></div></div>';
        
                                //cuanti += '<div class="divGrafica"><svg id="graph" width="960" height="500"></svg></div>';
                                
        
                                cuanti += '<div class="row"><div class="col-md-12">';
                                cuanti += (tieneBreakdown === false) ? '' : '<p><b>Nota: </b> ' + data.indicator_reference + '</p>';

                                cuanti += '</div></div>' +
                            '</div>' +
                            '<div class="tab-pane" id="tab-022">' +
                                '<table class="table table-striped">' +
                                    '<tbody>' +
                                        '<tr>' +
                                            '<td>Derecho</td>' +
                                            '<td>' + data.indicator_name + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Categoría conceptual / Principio Transversal</td>' +
                                            '<td>' + data.indicator_category_name + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Tipo de indicador</td>' +
                                            '<td>' + data.indicator_type + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Definición</td>' +
                                            '<td>' + data.indicator_definition + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fórmula</td>' +
                                            '<td><img src="http://latex.codecogs.com/svg.latex?'+data.indicator_formule_code+'" border="0" style="max-width:600px;" /></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Elementos del cálculo</td>' +
                                            '<td>'+formulas(res)+'</td>' +
                                        '</tr>';
                                    
                                    cuanti += (data.indicator_source_formule === null) ? '' : '<tr><td>Fuente de la fórmula</td><td>'+data.indicator_source_formule+'</td></tr>';
                                        
                                        cuanti += '<tr>' +
                                            '<td>Unidad de Medida</td>' +
                                            '<td>'+data.indicator_measure_unit+'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Referencia</td>' +
                                            '<td>'+data.indicator_reference+'</td>' +
                                        '</tr>';
        
        
                            cuanti += (data.indicator_observation === null) ? '': '<tr><td>Observaciones</td><td>'+data.indicator_observation+'</td></tr>';
                            cuanti += '<tr>' +
                                            '<td>Fecha de actualización</td>' +
                                            '<td>'+moment(data.lastmodified).format('DD-MM-YYYY')+'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Entidad responsable del indicador</td>' +
                                            '<td>'+data.responsible_institution+'</td>' +
                                        '</tr>' +
                                    '</tbody>' +
                                '</table>' +
                                
                            '</div>' +
                            
//                            '<div class="tab-pane" id="tab-033">' +
//                                '<h3>[Aquí iría una tabla que represente los datos para el cálculo]</h3>' +
//                            '</div>' +
                            
                        '</div>' +
				      '</div>' +
				      
			      '</div>' +
		      '</div>' +
		      '<!-- Termina Bloque -->';
                
        return cuanti;
    }
    
    
    function tipoGrafica(tipo, fuente, ejeX, ejeY, color, datos){
        // Tipos de gráfica reportados por la API según el recurso breakdown_group.graphic[n].graphic_key
        // Bre = Gráfica de Dotplot para comparación entre 2 variables
        // ColAg = Gráfica de columnas agrupadas para comparación entre 2 variables
        // Ln = Gráfica de línea simple
        // Col = Gráfica de barras simple
        // Mapa = Visualiza un mapa de México con las 32 entidades

        var salida;
        
        switch(tipo){
            case "Bre":
                //salida = dotplot();
                salida = columnaAgrupada(fuente,ejeX,ejeY,ejeY, ["rgba(71, 73, 160,1)","rgba(71, 73, 160,0.8)"]);
            break;
            case "ColAg":
                salida = columnaAgrupada(fuente,ejeX,ejeY,ejeY, ["rgba(71, 73, 160,1)","rgba(71, 73, 160,0.8)"]);
            break;
            case "Ln":
                salida = lineas(fuente,ejeX,ejeY, color);
            break;
            case "Col":
                salida = barras(fuente,ejeX,ejeY, color);
            break;
            case "Mapa":
                salida = mapa();
            break;
            default:
                salida = barras();
            break;
                
        }
               
        return salida;
                
    }
    
    
//    function graficaCuanti(fuente, tipoGrafica, ejeX, ejeY, color, datos){
//        var graf = '<div class="divGrafica"><svg id="graph" width="960" height="500"></svg></div>';
//            
//            graf += '<script>' +
//                'var svg = d3.select("#graph"),' +
//                'margin = {top: 20, right: 20, bottom:130, left: 40},' +
//                'width = +svg.attr("width") - margin.left - margin.right,' +
//                'height = +svg.attr("height") - margin.top - margin.bottom;' +
//
//                'var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),' +
//                'y = d3.scaleLinear().rangeRound([height, 0]);' +
//
//                'var g = svg.append("g")' +
//                '.attr("transform", "translate(" + margin.left + "," + margin.top + ")");' +
//
//                'var tooltip = d3.select("body").append("div").attr("class", "toolTip");' +
//
//                'd3.json("'+fuente+'", function(d) {' +
//                'd'+ejeY+' = +d'+ejeY+' * 100;' +
//                'console.log(d.results[0]);' +
//                'return d.results[0];' +
//                '}, function(error, data) {' +
//                'if (error) throw error;' +
//
//                'x.domain(data.map(function(d) { return d'+ejeX+'; }));' +
//                'y.domain([0, d3.max(data, function(d) { return d'+ejeY+'; })]);' +
//
//                'g.append("g")' +
//                '.attr("class", "axis axis--x")' +
//                '.attr("transform", "translate(0," + height  + ")")' +
//                '.call(d3.axisBottom(x));' +
//
//                'g.append("g")' +
//                '.attr("class", "axis axis--y")' +
//                '.call(d3.axisLeft(y))' +
//                '.append("text")' +
//                '.attr("transform", "rotate(-90)")' +
//                '.attr("y", 6)' +
//                '.attr("dy", "0.71em")' +
//                '.attr("text-anchor", "end")' +
//                '.text("Porcentaje");' +
//
//                'g.append("g")' +
//                '.call(d3.axisLeft(y))' +
//                '.append("text")' +
//                '.attr("fill", "#000")' +
//                '.attr("transform", "rotate(-90)")' +
//                '.attr("y", 6)' +
//                '.attr("dy", "0.71em")' +
//                '.attr("text-anchor", "end")' +
//                '.text("Porcentaje");' +
//
//                'g.selectAll(".bar")' +
//                '.data(data)' +
//                '.enter().append("rect")' +
//                '.attr("class", "bar")' +
//                '.attr("x", function(d) { return x(d'+ejeX+'); })' +
//                '.attr("y", function(d) { return height; })' +
//                '.attr("width", x.bandwidth())' +
//                '.attr("height", function(d) { return 0})' +
//                '.on("mousemove", function(d){' +
//                'tooltip' +
//                '.style("left", d3.event.pageX - 25 + "px")' +
//                '.style("top", d3.event.pageY - 40 + "px")' +
//                '.style("display", "inline-block")' +
//                '.text(d'+ejeY+');' +
//                '})' +
//                '.on("mouseout", function(d){ tooltip.style("display", "none");})' +
//                '.transition()' +
//                '.delay(function(d,i){ return i*100 })' +
//                '.duration(2000)' +
//                '.attr("y", function(d){ return y(d'+ejeY+')})' +
//                '.attr("height", function(d){ return height - y(d'+ejeY+') });' +
//                '});' +
//                '</script>';
//        
//        return graf;
//    }
    
    function parseAPI(string){
        var contenido=string;
        if(string !== null){
            string=string.replace(/_/g,"-");
        }else{
            string=string;
        }
        
        return string;
    }
    
    //Esta función muestra los datos en una tabla de acuerdo a los siguiente criterios
    //resource: resource_id de los datos del indicador a consultar en API datos.gob.mx
    //dataset: Dataset del indicador a consultar en API datos.gob.mx
    //resultado: Nombre del campo con el valor a graficar o tabular para consultarse en la API de datos.gob.mx. Ej. porc_pob_carencia_alim
    //clasificacion: Atributo a llamar de la API de datos.gob.mx Ej. grupo-especifico
    //periodos: Periodos que se van a consultar para el indicador, según reporte la API y consumido desde la variable breakdown_group_year
    //recurso: Nombre del recurso para la clasificación y el periodo a consultar. Ej. poblacion_con_menos_de_18_anios
    function datosTabulado(resource, dataset, resultado, clasificacion, periodos, recurso){
        datoInd = [];
        datoInd2 = [];
        datoInd3 = [];
        dat1 = '';
        rec = recurso;//Trae el valor de la clasificación a consultar. Ej. poblacion_con_menos_de_18_anios
        res = parseAPI(resultado);//Trae la variable del valor del dato. Ej. porc-pob-carencia-alim
        clas = parseAPI(clasificacion);//Trae el valor de de la clasificación. Ej. grupo-especifico
        console.log(clas);
        if(clas === null || res === null){
            var inf = [];
            //for(var yy=0;yy<rec.length;yy++){
                datoInd.push(apiGobGrupo(resource,dataset,clas,rec[yy])); 
            //}
            
            console.log(datoInd);
            console.log(rec);//Muestra las entidades
        
            var periodos = [];
            for(var jj=0; jj < datoInd[0].length; jj++){
                periodos.push(datoInd[0][jj].legislatura);
            }
            
            console.log(periodos);
            console.log(datoInd);
            
            dat1 += '<table class="table" id="tabuls1">';
            dat1 += '<thead><th>Legistatura</th>';
            for(var hh=0;hh<periodos.length;hh++){
                dat1 += '<th>'+periodos[hh]+'</th>';
            }

            dat1 += '</thead><tbody>';
            
            for(var gg=0;gg<periodos.length;gg++){
                dat1 += '<tr>';
                    dat1 += '<td>' + periodos[gg] + '</td>';// + '<td>' + datoInd[ll][gg][res] + '</td>';
                for(var ii = 0; ii < datoInd[0][gg].length; ii++){
                    dat1 += '<td>' + datoInd[0][gg][ii]["porcentaje-de-iniciativas-legislativas-en-el-mbito-cultural-para-la-legislatura"] + '</td>';
                } 
                dat1 += '</tr>';
            }
            dat1 += '</tbody>';
            dat1 += '</table>';
        }else if(clas === "entidad" || clas === "Entidad Federativa" || clas === "Circuito Judicial"){
           var inf = [];
            for(var yy=0;yy<rec.length;yy++){
                datoInd.push(apiGobGrupo(resource,dataset,clas,rec[yy])); 
            }
            
            console.log(rec);//Muestra las entidades
        
            var periodos = [];
            for(var jj=0; jj < datoInd[0].length; jj++){
                periodos.push(datoInd[0][jj].periodo);
            }
            
            console.log(periodos);
            console.log(datoInd);
            
            dat1 += '<table class="table" id="tabuls1">';
            dat1 += '<thead><th>Entidad</th>';
            for(var hh=0;hh<periodos.length;hh++){
                dat1 += '<th>'+periodos[hh]+'</th>';
            }

            dat1 += '</thead><tbody>';
            
            for(var gg=0;gg<rec.length;gg++){
                dat1 += '<tr>';
                    dat1 += '<td>' + rec[gg] + '</td>';// + '<td>' + datoInd[ll][gg][res] + '</td>';
                for(var ii = 0; ii < datoInd[gg].length; ii++){
                    dat1 += '<td>' + datoInd[gg][ii][res] + '</td>';
                } 
                dat1 += '</tr>';
            }
            dat1 += '</tbody>';
            dat1 += '</table>';
            
        }else{
            
            var inf = [];
            for(var yy=0;yy<rec.length;yy++){
                datoInd.push(apiGobGrupo(resource,dataset,clas,rec[yy])); 
            }
        
            console.log(rec);
        
            dat1 += '<table class="table" id="tabuls1">';
            dat1 += '<thead><th>Periodo</th>';
            for(var hh=0;hh<rec.length;hh++){
                dat1 += '<th>'+rec[hh]+'</th>';
            }
            
            var periodos = [];
            for(var jj=0; jj < datoInd[0].length; jj++){
                periodos.push(datoInd[0][jj].periodo);
            }
            
            dat1 += '</thead><tbody>';
            for(var gg=0;gg<periodos.length;gg++){
                dat1 += '<tr>';
                    dat1 += '<td>' + periodos[gg] + '</td>';// + '<td>' + datoInd[ll][gg][res] + '</td>';
                for(var ii = 0; ii < datoInd.length; ii++){
                    dat1 += '<td>' + datoInd[ii][gg][res] + '</td>';
                } 
                dat1 += '</tr>';
            }
            dat1 += '</tbody>';
            dat1 += '</table>';
        }
        
        tabulado1 = dat1;
        return dat1;
    }
    
    
    
    //Esta función crea el JSON para la gráfica de acuerdo a los siguiente criterios
    //resource: resource_id de los datos del indicador a consultar en API datos.gob.mx
    //dataset: Dataset del indicador a consultar en API datos.gob.mx
    //resultado: Nombre del campo con el valor a graficar o tabular para consultarse en la API de datos.gob.mx. Ej. porc_pob_carencia_alim
    //clasificacion: Atributo a llamar de la API de datos.gob.mx Ej. grupo-especifico
    //periodos: Periodos que se van a consultar para el indicador, según reporte la API y consumido desde la variable breakdown_group_year
    //recurso: Nombre del recurso para la clasificación y el periodo a consultar. Ej. poblacion_con_menos_de_18_anios
    function datosGrafica(resource, dataset, resultado, clasificacion, periodos, recurso){
        datoInd = [];
        datoInd2 = [];
        datoInd3 = [];
        dat111 = [];
        rec2 = recurso;//Trae el valor de la clasificación a consultar. Ej. poblacion_con_menos_de_18_anios
        res2 = parseAPI(resultado);//Trae la variable del valor del dato. Ej. porc-pob-carencia-alim
        clas2 = parseAPI(clasificacion);//Trae el valor de de la clasificación. Ej. grupo-especifico
        
        
        if(clas === "entidad" || clas === "Entidad Federativa"){
        //if(clas === "1" || clas === "En"){
            
        var inf = [];
            
        for(var yy=0;yy<rec2.length;yy++){
            datoInd2.push(apiGobGrupo(resource,dataset,clas2,rec2[yy])); 
        }
        
        console.log(datoInd2);
        console.log(rec2);
            
            dat111 += '[';
            
            var periodos = [];
            for(var jj=0; jj < datoInd2[0].length; jj++){
                periodos.push(datoInd2[0][jj].periodo);
            }
            
            dat111 += '';
        
        for(var gg=0;gg<periodos.length;gg++){//Cuento cortes
                dat111 += '{';
                dat111 += '"Periodo" : ' + periodos[gg] + ',';
            
            for(var hh=0;hh<rec2.length;hh++){
                        dat111 += '"'+rec2[hh]+'" : ';
                        dat111 += '' + datoInd2[hh][gg][res2] + '';
                        if(hh === datoInd2.length-1){
                            dat111 += '';
                        }else{
                            dat111 += ',';
                        }
                        
                } 
                dat111 += '}';
                
                console.log(periodos.length);
                console.log(periodos[gg]); 
                if(gg === periodos.length-1){
                    dat111 += '';
                }else{
                    dat111 += ',';
                }
            }
            dat111 += ']';
            
//            var inf = [];
//                
//            for(var yy=0;yy<rec2.length;yy++){
//                datoInd2.push(apiGobGrupo(resource,dataset,clas2,rec2[yy])); 
//            }
//            
//            dat111 += '[';
//
//            var periodos = [];
//            for(var jj=0; jj < datoInd2[0].length; jj++)
//            {
//                periodos.push(datoInd2[0][jj].periodo);
//            }
//
//            dat111 += '';
//            
//            //Contamos estados
//            for(var gg=0; gg<rec2.length; gg++)
//            {
//                dat111 += '{';
//                dat111 += '"Entidad" : "' + rec2[gg] + '",';
//                
//                for(var hh = 0; hh < periodos.length; hh++)
//                {
//                    dat111 += '"'+periodos[hh]+'" : ';
//                    dat111 += '' + datoInd2[gg][hh][res2] + '';
//
//                    if(hh === periodos.length-1)
//                    {
//                        dat111 += '';
//                    }
//                    else
//                    {
//                        dat111 += ',';
//                    }      
//                } 
//
//                dat111 += '}';
//                    
//                if(gg === rec2.length-1)
//                {
//                    dat111 += '';
//                }
//                else
//                {
//                    dat111 += ',';
//                }
//            }
//dat111 += ']';
            
            
            
            
        }else{
            
            var inf = [];
        for(var yy=0;yy<rec2.length;yy++){
            datoInd2.push(apiGobGrupo(resource,dataset,clas2,rec2[yy])); 
        }
        
        console.log(datoInd2);
        console.log(rec2);
            dat111 += '[';
            
            var periodos = [];
            for(var jj=0; jj < datoInd2[0].length; jj++){
                periodos.push(datoInd2[0][jj].periodo);
            }
            
            dat111 += '';
        
        for(var gg=0;gg<periodos.length;gg++){//Cuento cortes
                dat111 += '{';
                dat111 += '"Periodo" : ' + periodos[gg] + ',';
            
            for(var hh=0;hh<rec2.length;hh++){
                        dat111 += '"'+rec2[hh]+'" : ';
                        dat111 += '' + datoInd2[hh][gg][res2] + '';
                        if(hh === datoInd2.length-1){
                            dat111 += '';
                        }else{
                            dat111 += ',';
                        }
                        
                } 
                dat111 += '}';
                
                console.log(periodos.length);
                console.log(periodos[gg]); 
                if(gg === periodos.length-1){
                    dat111 += '';
                }else{
                    dat111 += ',';
                }
            }
            dat111 += ']';
            
        }
        
        return dat111;
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

        function deselect(e) {
            $('.pop').slideFadeToggle(function() {
                e.removeClass('selected');
            });
        }

        function buscar(busqueda) {
            window.location.replace("busqueda.html?busqueda=" + busqueda);
        }

        
    
});