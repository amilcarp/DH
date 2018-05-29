//---- Variables
var pathAPI = "https://datosabiertos.unam.mx/api/alice/";
var datosDer = [];
var acumula = [];
var tablaInd =  '';
var contenido, cuali, cuanti;

var url_string = window.location.href; //window.location.href
var url = new URL(url_string);
var c = url.searchParams.get("codigo");


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


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
//            console.log(datosDer);
//            console.log(datosDer[0].indicator_code);
//
//              console.log(indicadorCuali(datosDer));

            if(datosDer.is_cuantitative == false){
                $('#indicadores').html(indicadorCuali(datosDer));
            }else{
                $('#indicadores').html(indicadorCuanti(datosDer));
            }
              
            $('#claveInd').html(datosDer.indicator_code);
            $('#categoriaInd').html(datosDer.right_name_short);
            $('#tituloInd').html(datosDer.indicator_code + ' - ' + datosDer.indicator_name);
            $('#tInd').html(datosDer.indicator_code + ' - ' + datosDer.indicator_name);
            $('#fuenteInd').html(datosDer.evidence_name + ' - <a href="'+ datosDer.evidence_url + '">' + datosDer.evidence_url + '</a>');
            $('#descarDatos1').html(datosDer.indicator_code + ' - ' + datosDer.indicator_name);
            $('#descarDatos2').html(datosDer.indicator_definition);
            $('#descarDatos3').html(datosDer.institution_name_evidencie);
              
              
		  },
		  async:true
		});
    
    
    function getTipoIndicador(tipoIndicador){
        return tipoIndicador === "E" ? '<p class="tipoIndicador colorE" data-toggle="tooltip" data-placement="top" title="Indicador Estructural">E</p>' :  tipoIndicador === "P" ? '<p class="tipoIndicador colorP" data-toggle="tooltip" data-placement="top" title="Indicador de Proceso">P</p>':  tipoIndicador === "R" ? '<p class="tipoIndicador colorR" data-toggle="tooltip" data-placement="top" title="Indicador de Resultado">R</p>': 'N/D';
    }
   
    
    function getMetadatos(){
        
    }

    
//    function reemplazaChar(string){
//            string = string.replace(/\r\n/g,"\n");
//            var utftex= "";
//            var letr = ["á","é","í","ó","ú","Á","É","Í","Ó","Ú","ñ","Ñ"];
//            var cambio = ["\acute{a}","\acute{e}","\acute{i}","\acute{o}","\acute{u}","\acute{A}","\acute{E}","\acute{I}","\acute{O}","\acute{U}","\tilde{n}","\tilde{N}"];
//
//            for(var v = 0; v < string.length; v++)
//            {
//                utftex += string[v].replace(letr[v], cambio[v]);
//            }
//        
//            return utftex;
//    }
    
    var Utf8 = {
        // public method for url encoding
        encode : function (string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        },
        mia : function (string) {
            string = string.replace(/\r\n/g,"\n");
            var utftex= "";
            var letr = ["á","é","í","ó","ú","Á","É","Í","Ó","Ú","ñ","Ñ"];
            var cambio = ["\acute{a}","\acute{e}","\acute{i}","\acute{o}","\acute{u}","\acute{A}","\acute{E}","\acute{I}","\acute{O}","\acute{U}","\tilde{n}","\tilde{N}"];

            for(var v = 0; v < string.length; v++)
            {
                utftex += string[v].replace(letr[v], cambio[v]);
            }
            return utftex;
        },

        // public method for url decoding
        decode : function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while ( i < utftext.length ) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }else if((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i+1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i+1);
                    c3 = utftext.charCodeAt(i+2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
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
                                            '<td>Nombre</td>' +
                                            '<td>' + data.indicator_name + '</td>' +
                                        '</tr>' +
                                       '<tr>' +
                                            '<td>Clave</td>' +
                                            '<td>' + data.indicator_code + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Descripción</td>' +
                                            '<td>' + data.indicator_definition + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Tipo de Indicador</td>' +
                                            '<td>' + data.indicator_type_short + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Categoría/Principio Transversal</td>' +
                                            '<td>'+ data.indicator_category_name +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Derecho</td>' +
                                            '<td>'+ data.right_name_short +'</td>' +
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
                                            '<td>Evidencia</td>' +
                                            '<td>' + data.evidence_name + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Unidad de Observación</td>' +
                                            '<td>'+ data.observation_unit_name +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Firma</td>' +
                                            '<td>'+ data.validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Aceptación</td>' +
                                            '<td>'+ data.validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Promulgación</td>' +
                                            '<td>'+ data.validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Adhesión</td>' +
                                            '<td>'+ data.validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                           '<td>Fecha de Vinculación</td>' +
                                            '<td>'+ data.validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Publicación</td>' +
                                            '<td>'+ data.validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Entrada en Vigor</td>' +
                                            '<td>'+ data.validity_date +'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>URL</td>' +
                                            '<td><a href="' + data.evidence_url + '" target="_blank">' + data.evidence_url + '</a></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fecha de Actualización</td>' +
                                            '<td>' + data.update_date_lit + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Entidad Responsable de Validación</td>' +
                                            '<td>' + data.institution_name_evidencie + '</td>' +
                                        '</tr>' +
                                    '</tbody>' +
                                '</table>' +
                                '<div class="row">' +
                                    '<div class="col-md-10">' +
//                                        '<p><b>Nota: </b> [Aquí va la nota de los datos del indicador, sí es que la hay]</p>' +
                                        '<p><b>Fuente: </b> ' + data.evidence_name + ' - <a href="' + data.evidence_url + '" target="_blank">' + data.evidence_url + '</a></p>' +
                                        '<p><b>Fecha de actualización: </b> '+ data.update_date_lit +'</p>' +
                                    '</div>' +
                                '</div>' +
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
        for(var i = 0; i < formula.length; i++){
            i++;
            if(formula[i] == null){
                
            }else{
                img += '<img src="http://latex.codecogs.com/svg.latex?'+formula[i]+'" border="0" style="" /> <span>'+formula[i+1]+'</span><br/>';
//                console.log(formula[i]);
            }
        }
        return img;
    }
    
    function indicadorCuanti(data){

        var formCalculo = data[0].indicator_calculation_element;
        var res = formCalculo.split("$* ");

        cuanti = '<!-- Inicia Bloque -->' +
		      '<div class="row">' +
			      '<div class="col-md-12">' +
				      '<h1 id="tituloInd">' + data.indicator_code + ' - ' + data.indicator_name + '</h1>' +
				      '<hr />' +
				      '<div class="row">' +
					  	'<ul class="nav nav-tabs">' +
                            '<li class="active"><a data-toggle="tab" href="#tab-011">Indicador</a></li>' +
                            '<li><a data-toggle="tab" href="#tab-022">Metadato</a></li>' +
                            '<li><a data-toggle="tab" href="#tab-033">Datos para el cálculo</a></li>' +
                        '</ul>' +
                        '<div class="tab-content">' +
                            '<div class="tab-pane active" id="tab-011">' +
                                
                                '<h2>' + data.indicator_definition + '</h2>' +
                                
                                '<svg id="graph" width="960" height="500"></svg>' +
                                
                                '<div class="row">' +
                                    '<div class="col-md-10">' +
                                        '<p><b>Nota: </b> ' + data.indicator_reference + '</p>' +
                                        '<p><b>Fuente: </b> <span id="fuenteInd">'+data.indicator_reference+'</span></p>' +
                                    '</div>' +
                                '</div>' +
                                
                            '</div>' +
                            
                            '<div class="tab-pane" id="tab-022">' +
                            
                                '<table class="table table-striped">' +
                                    '<tbody>' +
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
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Fuente de la fórmula</td>' +
                                            '<td>'+data.indicator_source_formule+'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Estado de Validación de la fórmula</td>' +
                                            '<td>En datos.gob.mx</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Unidad de Medida</td>' +
                                            '<td>'+data.indicator_measure_unit+'</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td>Referencia</td>' +
                                            '<td>'+data.indicator_reference+'</td>' +
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
        
        cuanti += graficaCuanti("https://api.datos.gob.mx/v1/ckan.18b64e85-2b3a-4688-8a72-fd9b6e7d21b8.f1c66f48-5160-45d6-851e-8f3ecc2b05ce?periodo=2016", "Barras", "['results'][0]['grupo-especifico']", "['results'][0]['pob-con-carencia-alim-miles']", "#898989", "Abierto");
        
        console.log(graficaCuanti("https://api.datos.gob.mx/v1/ckan.18b64e85-2b3a-4688-8a72-fd9b6e7d21b8.f1c66f48-5160-45d6-851e-8f3ecc2b05ce?periodo=2016", "Barras", "['results'][0]['grupo-especifico']", "['results'][0]['pob-con-carencia-alim-miles']", "#898989", "Abierto"));
//        cuanti += '<script>' +
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
//                'd3.json("https://api.datos.gob.mx/v1/ckan.18b64e85-2b3a-4688-8a72-fd9b6e7d21b8.f1c66f48-5160-45d6-851e-8f3ecc2b05ce?periodo=2016", function(d) {' +
//                'd.Porcentaje = +d.Porcentaje * 100;' +
//                'return d;' +
//                '}, function(error, data) {' +
//                'if (error) throw error;' +
//
//                'x.domain(data.map(function(d) { return d.Legislatura; }));' +
//                'y.domain([0, d3.max(data, function(d) { return d.Porcentaje; })]);' +
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
//                '.attr("x", function(d) { return x(d.Legislatura); })' +
//                '.attr("y", function(d) { return height; })' +
//                '.attr("width", x.bandwidth())' +
//                '.attr("height", function(d) { return 0})' +
//                '.on("mousemove", function(d){' +
//                'tooltip' +
//                '.style("left", d3.event.pageX - 25 + "px")' +
//                '.style("top", d3.event.pageY - 40 + "px")' +
//                '.style("display", "inline-block")' +
//                '.text(d.Porcentaje);' +
//                '})' +
//                '.on("mouseout", function(d){ tooltip.style("display", "none");})' +
//                '.transition()' +
//                '.delay(function(d,i){ return i*100 })' +
//                '.duration(2000)' +
//                '.attr("y", function(d){ return y(d.Porcentaje)})' +
//                '.attr("height", function(d){ return height - y(d.Porcentaje) });' +
//                '});' +
//                '</script>';
//        
//        cuanti += '<script>' +
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
//                'd3.csv("CcE04_Barras.csv", function(d) {' +
//                'd.Porcentaje = +d.Porcentaje * 100;' +
//                'return d;' +
//                '}, function(error, data) {' +
//                'if (error) throw error;' +
//
//                'x.domain(data.map(function(d) { return d.Legislatura; }));' +
//                'y.domain([0, d3.max(data, function(d) { return d.Porcentaje; })]);' +
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
//                '.attr("x", function(d) { return x(d.Legislatura); })' +
//                '.attr("y", function(d) { return height; })' +
//                '.attr("width", x.bandwidth())' +
//                '.attr("height", function(d) { return 0})' +
//                '.on("mousemove", function(d){' +
//                'tooltip' +
//                '.style("left", d3.event.pageX - 25 + "px")' +
//                '.style("top", d3.event.pageY - 40 + "px")' +
//                '.style("display", "inline-block")' +
//                '.text(d.Porcentaje);' +
//                '})' +
//                '.on("mouseout", function(d){ tooltip.style("display", "none");})' +
//                '.transition()' +
//                '.delay(function(d,i){ return i*100 })' +
//                '.duration(2000)' +
//                '.attr("y", function(d){ return y(d.Porcentaje)})' +
//                '.attr("height", function(d){ return height - y(d.Porcentaje) });' +
//                '});' +
//                '</script>';
        return cuanti;
    }
    
    function graficaCuanti(fuente, tipoGrafica, ejeX, ejeY, color, datos){
        var graf = '<script>' +
                'var svg = d3.select("#graph"),' +
                'margin = {top: 20, right: 20, bottom:130, left: 40},' +
                'width = +svg.attr("width") - margin.left - margin.right,' +
                'height = +svg.attr("height") - margin.top - margin.bottom;' +

                'var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),' +
                'y = d3.scaleLinear().rangeRound([height, 0]);' +

                'var g = svg.append("g")' +
                '.attr("transform", "translate(" + margin.left + "," + margin.top + ")");' +

                'var tooltip = d3.select("body").append("div").attr("class", "toolTip");' +

                'd3.json("'+fuente+'", function(d) {' +
                'd'+ejeY+' = +d'+ejeY+' * 100;' +
                'return d;' +
                '}, function(error, data) {' +
                'if (error) throw error;' +

                'x.domain(data.map(function(d) { return d'+ejeX+'; }));' +
                'y.domain([0, d3.max(data, function(d) { return d'+ejeY+'; })]);' +

                'g.append("g")' +
                '.attr("class", "axis axis--x")' +
                '.attr("transform", "translate(0," + height  + ")")' +
                '.call(d3.axisBottom(x));' +

                'g.append("g")' +
                '.attr("class", "axis axis--y")' +
                '.call(d3.axisLeft(y))' +
                '.append("text")' +
                '.attr("transform", "rotate(-90)")' +
                '.attr("y", 6)' +
                '.attr("dy", "0.71em")' +
                '.attr("text-anchor", "end")' +
                '.text("Porcentaje");' +

                'g.append("g")' +
                '.call(d3.axisLeft(y))' +
                '.append("text")' +
                '.attr("fill", "#000")' +
                '.attr("transform", "rotate(-90)")' +
                '.attr("y", 6)' +
                '.attr("dy", "0.71em")' +
                '.attr("text-anchor", "end")' +
                '.text("Porcentaje");' +

                'g.selectAll(".bar")' +
                '.data(data)' +
                '.enter().append("rect")' +
                '.attr("class", "bar")' +
                '.attr("x", function(d) { return x(d'+ejeX+'); })' +
                '.attr("y", function(d) { return height; })' +
                '.attr("width", x.bandwidth())' +
                '.attr("height", function(d) { return 0})' +
                '.on("mousemove", function(d){' +
                'tooltip' +
                '.style("left", d3.event.pageX - 25 + "px")' +
                '.style("top", d3.event.pageY - 40 + "px")' +
                '.style("display", "inline-block")' +
                '.text(d'+ejeY+');' +
                '})' +
                '.on("mouseout", function(d){ tooltip.style("display", "none");})' +
                '.transition()' +
                '.delay(function(d,i){ return i*100 })' +
                '.duration(2000)' +
                '.attr("y", function(d){ return y(d'+ejeY+')})' +
                '.attr("height", function(d){ return height - y(d'+ejeY+') });' +
                '});' +
                '</script>';
        
        return graf;
    }
    
    
    
});