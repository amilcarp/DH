//---- Variables
var pathAPI = "https://datosabiertos.unam.mx/api/alice/";
var pathAPIGob = "https://api.datos.gob.mx/v2/SNEDH-";
var datosDer = [];
var datosGlobal = [];
var atributos_global = [];
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
var str2 = "0";
var graficaDat = [];
var mapaDat = [];
var tados;
var tabulado1, tabulado2;
var atributos;
var estados_global;
var varis, ggg;

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
		  url: pathAPIGob+resource+'?page='+page+'',
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
              url: pathAPIGob+resource,
              data: {},
              success: function( data, textStatus, jqxhr ) {
                  gobGrupo = data['results'];
              },
              async:false
          });
        }else{
            $.ajax({
              type: 'GET',
              url: pathAPIGob+resource+'?'+atributo+'='+variable,
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
    var g = c.split(':');
    $.ajax({
		  type: 'GET',
            url: "json/"+g[2]+".json",
		  //url: pathAPI + "data/" + c,
		  data: {},
		  success: function( data, textStatus, jqxhr ) {      
              datosDer = data;
              datosGlobal = data;
              
              
            if(datosDer.is_cuantitative == false){
                //El Indicador es cualitativo
                $('#indicadores').html(indicadorCuali(datosDer));
                $('.descargaIndividual').html('<div class="col-md-12">'+
				      '<h2>Descargar Ficha</h2>'+
				      '<hr />'+
				      '<div class="row">'+
					  	'<div class="col-md-4"><b>Nombre del indicicador</b></div>'+
                        '<div class="col-md-4"><b>Descripción del indicador</b></div>'+
                        '<div class="col-md-4"><b>Formatos</b></div>'+
				      '</div>'+
                      '<div class="row">'+
					  	'<div class="col-md-4" id="descarDatos1">...</div>'+
                        '<div class="col-md-4" id="descarDatos2">...</div>'+
                        '<div class="col-md-4" id="btnDescarga">'+
                            '<a download="'+datosDer.indicator_code+'.xls" class="btn btn-primary" onclick="return ExcellentExport.excel(this, \'tabuls1\', \'Indicador\');">XLS</a> '+
                        '</div>'+
				      '</div>'+
			      '</div>');
            }else{
                if(datosDer.breakdown_group != null){
                    $('#indicadores').html(indicadorCuanti(datosDer,true));
                    $('.descargaIndividual').html('<div class="col-md-12">'+
				      '<h2>Descargar datos</h2>'+
				      '<hr />'+
				      '<div class="row">'+
					  	'<div class="col-md-3"><b>Nombre del indicicador</b></div>'+
                        '<div class="col-md-3"><b>Descripción del indicador</b></div>'+
                        '<div class="col-md-3"><b>Institución responsable de la información</b></div>'+
                        '<div class="col-md-3"><b>Formatos</b></div>'+
				      '</div>'+
                      '<div class="row">'+
					  	'<div class="col-md-3" id="descarDatos1">...</div>'+
                        '<div class="col-md-3" id="descarDatos2">...</div>'+
                        '<div class="col-md-3" id="descarDatos3">...</div>'+
                        '<div class="col-md-3" id="btnDescarga">'+
                            '<a download="'+datosDer.indicator_code+'.xls" class="btn btn-primary" onclick="return ExcellentExport.excel(this, \'tabuls1\', \'Indicador\');">XLS</a> '+
                            '<a download="'+datosDer.indicator_code+'.csv" class="btn btn-primary" onclick="return ExcellentExport.csv(this, \'tabuls1\');">CSV</a>'+
                        '</div>'+
				      '</div>'+
			      '</div>');
                }else{
                    $('#indicadores').html(indicadorCuanti(datosDer,false));
                }
            }
              
             // varis = (typeof datosDer.breakdown_group[str].breakdown_group_variable !== 'undefined') ? datosDer.breakdown_group[str].breakdown_group_variable : '';
              
            $('#claveInd').html(datosDer.indicator_code);
            $('#categoriaInd').html('<a href="derechos.html#'+sinEspacios(datosDer.right_name_short)+'">' + datosDer.right_name_short+'</a>');
            $('#tituloInd').html(datosDer.indicator_code + ' - ' + datosDer.indicator_name);
            $('#tInd').html(datosDer.indicator_code + ' - ' + datosDer.indicator_name);
            $('#fuenteInd').html(datosDer.evidence_name + ' - <a href="'+ datosDer.evidence_url + '">' + datosDer.evidence_url + '</a>');
            $('#descarDatos1').html(datosDer.indicator_code + ' - ' + datosDer.indicator_name);
            $('#descarDatos2').html(datosDer.indicator_definition);
            $('#descarDatos3').html(datosDer.responsible_institution);
            $(".verGrafica").html('<div class="divGrafica"><svg id="graph" width="960" height="550"></svg></div>');

            //Muestra u oculta botones para las gráficas y los tabulados
            $(".btnGrafica").show();
            //$(".btnGrafica").show();
            $(".btnTabla").hide();
            $(".divGrafica").hide();
            $(".divTabla").show();
              $("#save").hide();
            $(".btnGrafica").on("click",function(){ 
                var variable = $('#breakdown').val();
                $(".verGrafica").html(switchGraficas(datosDer.breakdown_group[variable].graphic)+'<div class="divGrafica"><svg id="graph" width="960" height="550"></svg></div>');
                $(".tipo0").addClass('active');
                $(".btnGrafica").hide();
                $(".btnTabla").show();
                $("#save").show();
                $(".divGrafica").show();
                $(".divTabla").hide();
                //$(".verGrafica").html(graficaCuanti(JSONvar,'Ln',str)); //fuente, tipoGrafica, ejeX, ejeY, color, datos 
               
                $(".verGrafica .divGrafica svg").html('');
//                $(".tipoGrafica").html(switchGraficas(datosDer.breakdown_group[variable].graphic));
                
                var peri = (data.breakdown_group[str].breakdown_group_name === 'Entidad federativa') ? "Entidad" : "Periodo";
                
                
                graficaDat = datosGrafica(data.breakdown_group[str].resource_id, data.breakdown_group[str].variable_dataset_id, data.breakdown_group[str].breakdown_attribute_result, data.breakdown_group[str].breakdown_attribute, data.breakdown_group[str].breakdown_group_year, data.breakdown_group[str].breakdown_resource_name, data.breakdown_group[str].breakdown_group_name);
                
                mapaDat = datosMapa(data.breakdown_group[str].resource_id, data.breakdown_group[str].variable_dataset_id, data.breakdown_group[str].breakdown_attribute_result, data.breakdown_group[str].breakdown_attribute, data.breakdown_group[str].breakdown_group_year, data.breakdown_group[str].breakdown_resource_name, data.breakdown_group[str].breakdown_group_name);
                console.log(mapaDat);
                
                
                //var estados = JSON.parse(graficaDat);
                
                estados_global = mapaDat;

              console.log(estados_global);
                
            $(".verGrafica").html(tipoGrafica(datosDer.breakdown_group[variable].graphic, graficaDat, peri, datosDer.breakdown_group[variable].breakdown_resource_name, '#f00', datosDer,data.breakdown_group[str].breakdown_group_name));
                
                //$(".verGrafica").html(tipoGrafica('Ln', "AaR02.json", 'Periodo', 'poblacion_de_18_anios_o_mas', '#f00', datosDer));
                //tipoGrafica(tipo, fuente, ejeX, ejeY, color, datos)
                $(".ColAg").css('display','none');
                
            $(".btnBre").on("click",function(){
                $('.switchBtns a').removeClass('active');
                $(this).addClass('active');
                $(".Bre").css("display","block");
                $(".ColAg").css("display","none");
                $(".ColLin").css("display","none");
                $(".ColAp").css("display","none");
                $(".ColCPAg").css("display","none");
                $(".ColAgAp").css("display","none");
                $(".Col").css("display","none");
                $(".Ln").css("display","none");
                $(".Mapa").css("display","none");
                $('#save').text('Descargar Gráfica');
            });
              
            $(".btnColAg").on("click",function(){
                $('.switchBtns a').removeClass('active');
                $(this).addClass('active');
                $(".Bre").css("display","none");
                $(".ColAg").css("display","block");
                $(".ColLin").css("display","none");
                $(".ColAp").css("display","none");
                $(".ColCPAg").css("display","none");
                $(".ColAgAp").css("display","none");
                $(".Col").css("display","none");
                $(".Ln").css("display","none");
                $(".Mapa").css("display","none");
                $('#save').text('Descargar Gráfica');
            });
                
            $(".btnColLin").on("click",function(){
                $('.switchBtns a').removeClass('active');
                $(this).addClass('active');
                $(".Bre").css("display","none");
                $(".ColAg").css("display","none");
                $(".ColLin").css("display","block");
                $(".ColAp").css("display","none");
                $(".ColCPAg").css("display","none");
                $(".ColAgAp").css("display","none");
                $(".Col").css("display","none");
                $(".Ln").css("display","none");
                $(".Mapa").css("display","none");
            });
                
            $(".btnColAp").on("click",function(){
                $('.switchBtns a').removeClass('active');
                $(this).addClass('active');
                $(".Bre").css("display","none");
                $(".ColAg").css("display","none");
                $(".ColLin").css("display","none");
                $(".ColAp").css("display","block");
                $(".ColCPAg").css("display","none");
                $(".ColAgAp").css("display","none");
                $(".Col").css("display","none");
                $(".Ln").css("display","none");
                $(".Mapa").css("display","none");
                $('#save').text('Descargar Gráfica');
            });
                
            $(".btnColCPAg").on("click",function(){
                $('.switchBtns a').removeClass('active');
                $(this).addClass('active');
                $(".Bre").css("display","none");
                $(".ColAg").css("display","none");
                $(".ColLin").css("display","none");
                $(".ColAp").css("display","none");
                $(".ColCPAg").css("display","block");
                $(".ColAgAp").css("display","none");
                $(".Col").css("display","none");
                $(".Ln").css("display","none");
                $(".Mapa").css("display","none");
                $('#save').text('Descargar Gráfica');
            });
                
            $(".btnColAgAp").on("click",function(){
                $('.switchBtns a').removeClass('active');
                $(this).addClass('active');
                $(".Bre").css("display","none");
                $(".ColAg").css("display","none");
                $(".ColLin").css("display","none");
                $(".ColAp").css("display","none");
                $(".ColCPAg").css("display","none");
                $(".ColAgAp").css("display","block");
                $(".Col").css("display","none");
                $(".Ln").css("display","none");
                $(".Mapa").css("display","none");
                $('#save').text('Descargar Gráfica');
            });
                
            $(".btnCol").on("click",function(){
                $('.switchBtns a').removeClass('active');
                $(this).addClass('active');
                $(".Bre").css("display","none");
                $(".ColAg").css("display","none");
                $(".ColLin").css("display","none");
                $(".ColAp").css("display","none");
                $(".ColCPAg").css("display","none");
                $(".ColAgAp").css("display","none");
                $(".Col").css("display","block");
                $(".Ln").css("display","none");
                $(".Mapa").css("display","none");
                $("#graph").css("display","block");
                $("#map").css("display","none");
                $('#save').text('Descargar Gráfica');
                $("#map").remove();
            });
                
            $(".btnLn").on("click",function(){
                $('.switchBtns a').removeClass('active');
                $(this).addClass('active');
                $(".Bre").css("display","none");
                $(".ColAg").css("display","none");
                $(".ColLin").css("display","none");
                $(".ColAp").css("display","none");
                $(".ColCPAg").css("display","none");
                $(".ColAgAp").css("display","none");
                $(".Col").css("display","none");
                $(".Ln").css("display","block");
                $(".Mapa").css("display","none");
                $('#save').text('Descargar Gráfica');
            });
                
            $(".btnMapa").on("click",function(){
                $('.switchBtns a').removeClass('active');
                $(this).addClass('active');
                $(".Bre").css("display","none");
                $(".ColAg").css("display","none");
                $(".ColLin").css("display","none");
                $(".ColAp").css("display","none");
                $(".ColCPAg").css("display","none");
                $(".ColAgAp").css("display","none");
                $(".Col").css("display","none");
                $(".Ln").css("display","none");
                $(".Mapa").css("display","block");
                $(".divGrafica").append('<div id="map"></div>');
                $("#graph").css("display","none");
                $('#save').text('Descargar Mapa');
                init_map();
                
            });
                
                
                
                
                
                
                
        var datEnt = [];
              
        for(var g=0;g<datosGlobal.breakdown_group.length;g++){
            if(datosGlobal.breakdown_group[g].breakdown_group_name === "Entidad federativa"){
               datEnt.push(datosGlobal.breakdown_group[g].breakdown_group_year);
               }
        }
              
        console.log(datEnt);
              
        var lastEl = datEnt[0][datEnt[0].length-1];
              
        atributos_global = {
            "indicator_code": datosGlobal.indicator_code+' - '+datosGlobal.indicator_name,
                "Serie": [
                    {
                        "CobTemporal_ser": datEnt[0][0]+"-"+lastEl
                    }
                ]
            };

              
    console.log(graficaDat);
              
    var titulo_des_graf = "Indicador";
    var estados = estados_global;
              
    console.log(estados);
   
    atributos = atributos_global;
    var anioo;
  
    //console.log(estados);
              
    // docuemento general
    $(document).ready(function () 
    {
      titulo_des_graf = atributos_global.indicator_code;
      //$('#loader').delay(2000).fadeOut("slow");
    });

    function gen(props) 
    {
      var chart = bb.generate({
        bindto: '.info',
        padding: {
          top: 10,
          left: 30,
          right: 10
        },
        data: {
          x: 'Entidad',
          columns: [busqueda_anios(),props,busqueda_mexico()]
        },
        tooltip: {
          format: {
              value: function(value) {
                  return d3.format(",.1f")(value)
              }
          }
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              rotate: -90,
              format: function (x) { return x.getFullYear(); }
            },
            height: 35,
          },
          y: {
            tick: {
              format: d3.format(".0f")
            }
          }
       },
        color: {
          pattern: ['#00AEEF', 'rgba(255,0,0,0.8)']
        },
        size: {
          width: 260,
          height: 200
        },
        legend: {
          show: false
        },
        grid: {
          x: {
            show: false
          },
          y: {
            show: true
          }
        }

      });
    }

    function busqueda_estado(cadena) 
    {
      for (var i = 0; i < estados.length; i++) 
      {
        if (estados[i][0] == cadena) 
        {
          return parseFloat(estados[i][1]);
        }
      }
    }

    function busqueda_indice(cadena) {
      for (var i = 0; i < estados.length; i++) {
        if (estados[i][0] == cadena) {
          return parseFloat(i);
        }
      }
    }

    function busqueda_mexico() 
    {
      var arrray=[];
      for (var i = 0; i < estados.length; i++) 
      {
        if (estados[i][0] == "Estados Unidos Mexicanos") 
        {
          for(var j=0;j< estados[i].length;j++)
          {
            arrray.push(estados[i][j])
          }
        }
      }
      return arrray;
    }


    function busqueda_anios() 
    {
      var arrray=[];
      for (var i = 0; i < estados.length; i++) 
      {
        if (estados[i][0] == "Entidad") 
        {
          for(var j=0;j< estados[i].length;j++)
          {
            arrray.push(estados[i][j])
          }
        }
      }
      return arrray;
    }

    function busqueda_estado_posicion(cadena, posicion) 
    {
      for (var i = 0; i < estados.length; i++) 
      {
        if (estados[i][0] == cadena)
        {
          return parseFloat(estados[i][posicion]);
        }
      }
    }

    function busqueda_anio(cadena) 
    {
      for (var i = 0; i < estados[0].length; i++) 
      {
        if (estados[0][i] == cadena) 
        {
          return i;
        }
      }
    }

    //variable de mapa
    var img;
    var data_url;
    var locked = false;
    var map ;


    function init_map()
    {
        map = L.map('map',
        {
            scrollWheelZoom: false,
            maxZoom: 14,
            minZomm: 5,
        }).setView([24.8, -100], 5);

    L.tileLayer('http://{s}.google.com/vt/?hl=es&x={x}&y={y}&z={z}&s={s}&apistyle=s.t%3A5|p.l%3A53%2Cs.t%3A1314|p.v%3Aoff%2Cp.s%3A-100%2Cs.t%3A3|p.v%3Aon%2Cs.t%3A2|p.v%3Aoff%2Cs.t%3A4|p.v%3Aoff%2Cs.t%3A3|s.e%3Ag.f|p.w%3A1|p.l%3A100%2Cs.t%3A18|p.v%3Aoff%2Cs.t%3A49|s.e%3Ag.s|p.v%3Aon|p.s%3A-19|p.l%3A24%2Cs.t%3A50|s.e%3Ag.s|p.v%3Aon|p.l%3A15&style=47,37', {
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      maxZoom: 14,
      minZomm: 5,
      attribution: '&copy <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> &copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
      id: 'mapbox.light',
    }).addTo(map);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      map.dragging.disable();
    }

    // control that shows state info on hover
    var info = L.control();
    info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'infos hide');
      this.update();
      return this._div;
    };

    var res = atributos_global.Serie[0].CobTemporal_ser;
    anioo = res.split('-');

    info.update = function (props) 
    {      
      $('.infos').removeClass('hide');
      $('.info2').removeClass('hide');
      if (props != undefined) {
        this._div.innerHTML = '<div><h5 style="font-weight:bold">' + props.nom_ent + '</h5><br><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style="font-size: 20px;color: #00aeef;">' + busqueda_estado(props.nom_ent).toFixed(2)/*props.density*/ + '</b><br/><b style="padding-left:28px;color:#999999;">(' + anioo[1] + ')</b><p style="position: absolute;bottom: 71%;left: 35%;font-size: 15px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: 164px;">'+titulo_des_graf+'</p></div></div><div class="info"></div>';
        gen(estados[busqueda_indice(props.nom_ent)]);
      }
    };

    info.addTo(map);
    // get color depending on population density value
    // function getColor(d) {
    // 	return d > 1000 ? '#800026' :
    // 	       d > 500  ? '#BD0026' :
    // 	       d > 200  ? '#E31A1C' :
    // 	       d > 100  ? '#FC4E2A' :
    // 	       d > 50   ? '#FD8D3C' :
    // 	       d > 20   ? '#FEB24C' :
    // 	       d > 10   ? '#FED976' :
    // 	                  '#FFEDA0';
    // }

    function getColor(d) {
      return d > 100 ? '#004b67' :
        d > 50 ? '#007dab' :
          d > 20 ? '#01baff' :
            '#45ccff';
    }

    function getColoR(number) 
    {
      return brew.getColorInRange(number);
    }

    function style(feature) 
    {
      var res = String(getColoR(busqueda_estado(feature.properties.nom_ent))).split(",");
      return {
        weight: 0.5,
        opacity: 1,
        color: '#000',
        dashArray: '1',
        fillOpacity: 1,
        // fillColor: getColoR(feature.properties.density),
        fillColor: getColoR(busqueda_estado(feature.properties.nom_ent)),
        className: "c" + res[1]
      };
    }

    function highlightFeature(e) 
    {
      if (locked == false) {
        var layer = e.target;
        layer.setStyle({
          weight: 2,
          color: '#ccc',
          dashArray: '',
          fillOpacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
        }
        info.update(layer.feature.properties);
      }
    }

    var geojson;
    function resetHighlight(e) 
    {
      geojson.resetStyle(e.target);
      info.update(); 
    }

    function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        mousedown: function (e) {
          if (locked == true) {
            locked = false;
            (function ($) {
              $(".info2").css("border", "none");
              $(".infos").css("border", "none");
            } (jQuery));
          }
          else {
            locked = true;
            (function ($) {
              //	$(".info2").css("border","5px solid #00cc99");
              $(".info2").css("border-bottom", "5px solid rgb(107, 174, 214)");
              $(".info2").css("border-left", "5px solid rgb(107, 174, 214)");
              $(".info2").css("border-right", "5px solid rgb(107, 174, 214)");
              $(".infos").css("border-top", "5px solid rgb(107, 174, 214)");
              $(".infos").css("border-left", "5px solid rgb(107, 174, 214)");
              $(".infos").css("border-right", "5px solid rgb(107, 174, 214)");
              //								$(".infos").css("border","5px solid #00cc99");
            } (jQuery));
          }
          // 			resetHighlight(e);
        },
        //          click: zoomToFeature
      });
    }

    function highlightFromLegend(e) 
    {
      (function ($) {
        $("svg path." + e).addClass("highlighted");
        var r = $("svg path." + e);
        for (var i = 0; i < r.length; i++) {
          r[i].classList.add("highlighted");
        }
      } (jQuery));
    }

    function clearHighlight() {
      (function ($) {

        $("path").removeClass("highlighted");
        var r = $("path");
        for (var i = 0; i < r.length; i++) {
          r[i].classList.remove("highlighted");
        }
      } (jQuery));
    }

    var brew = new classyBrew();
    var values = [];
    var values2 = [];
    for (var i = 0; i < statesData.features.length; i++) {
      if (statesData.features[i].properties.nom_ent == null) continue;
      values.push(busqueda_estado(statesData.features[i].properties.nom_ent));
    }

        console.log(values);
    brew.setSeries(values);
    brew.setNumClasses(4);
    brew.setColorCode("Purples");
    brew.classify('jenks');

    
    geojson = L.geoJson(statesData, {
      style: style,
      onEachFeature: onEachFeature
    }).addTo(map);



    map.attributionControl.addAttribution('');
    var legend = L.control();
    legend.onAdd = function (map) {
      var div = L.DomUtil.create('g', 'info2 legend'),
        grades = brew.getBreaks(),//[0, 20, 50, 100],
        labels = [],
        from, to;
      for (var i = 0; i < grades.length - 1; i++) {
        from = grades[i];
        to = grades[i + 1];
        var res = String(getColoR(from)).split(",");
        labels.push(
          '<g style="float:left; text-align: center;"><i class="leyenda" onmouseover="highlightFromLegend(\'c' + res[1] + '\')" onmouseout="clearHighlight();" style="width:100%; background:' + getColoR(from) + '"></i><br>' +
          from.toFixed(0) + (to.toFixed(0) ? '&ndash;' + to.toFixed(0) : '+') + '</g>');
      }
      div.innerHTML = labels.join('');
      return div;
    };
    legend.addTo(map);
    }
                
                
                
                
                
                
                
                
                
            });
            $(".btnTabla").on("click",function(){
                $(".tipoGrafica").html('');
                $(".btnGrafica").show();
                $(".btnTabla").hide();
                $(".divGrafica").hide();
                $(".divTabla").show();
                $('#save').hide();
            });
              
              
              
        
        function armaTabla(data, str,str2){
            var cua = "";
            console.log(data.breakdown_group[str].breakdown_attribute);
            cua += '<div class="tabulado'+str+'" style="padding:25px 0 0 0;">';
//            cua += '<h3>' + data.breakdown_group[str].breakdown_group_name + '</h3><br />';
            cua += datosTabulado(data.breakdown_group[str].resource_id, data.breakdown_group[str].variable_dataset_id, data.breakdown_group[str].breakdown_attribute_result, data.breakdown_group[str].breakdown_attribute, data.breakdown_group[str].breakdown_group_year, data.breakdown_group[str].breakdown_resource_name, varis, str2);
            cua += '</div>';
            console.log(cua);
            return cua;
        }
              
              
              var variableGroup = '';
              
            $("#breakdown").on("change", function() {
                console.log("Si jaló ------------------------");
                $('#variableSel').remove();
                str = $(this).val();
                str2 = $("#breakdown_var").val();
                console.log(str);
                console.log(datosDer);
                $(".tipoGrafica").html('');
                $('#save').hide();
                varis = (typeof data.breakdown_group[str].breakdown_group_variable !== 'undefined') ? data.breakdown_group[str].breakdown_group_variable : '';
                
                if(varis.length!==0){
                    variableGroup = '<div id="variableSel"><br/><span>Elige una variable: </span><select name="breakdown_var" id="breakdown_var">';
                    for (var mm=0;mm<data.breakdown_group[str].breakdown_resource_name.length;mm++){
                        variableGroup += '<option value="' + mm + '">' + data.breakdown_group[str].breakdown_resource_name[mm] + '</option>';
                    }
                    variableGroup += '</select></div>';
                    
                    $('#selectCat').append(variableGroup);
                    str2 = $("#breakdown_var").val();
                }
                
                $("#breakdown_var").on("change", function(){
                    str2 = $("#breakdown_var").val();
                    $(".verTabla").html(armaTabla(datosDer,str,str2));
                });

                
                if($('.btnGrafica').show()){
                    muestraGrafica = true;
                    $(".divGrafica").hide();
                    $(".divTabla").show();
                    $(".btnGrafica").show();
                    $(".btnTabla").hide();
                    $(".verTabla").html(armaTabla(datosDer,str,str2));
                }else{
                    muestraGrafica = false;
                    $(".tipoGrafica").html('');
                    $(".divGrafica").show();
                    $(".divTabla").hide();
                    $(".btnGrafica").hide();
                    $(".btnTabla").show();

                    $(".verGrafica").append('<div class="divGrafica"><svg id="graph" width="960" height="550"></svg></div>');
                    console.log('Pone la gráfica');
                }

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
                                
                                '<table class="table table-striped " id="tabuls1">' +
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
                                                        cuali += (data.evidence[i].objective[k].strategy_sequence === null) ? '' : '<p style="padding-left:25px;"><b>Estrategia '+ data.evidence[i].objective[k].strategy_sequence +':</b> ' + data.evidence[i].objective[k].strategy_name + '</p>';
                                                        cuali += (data.evidence[i].objective[k].action_line_sequence === null) ? '' : '<p style="padding-left:50px;"><b>Línea de acción '+ data.evidence[i].objective[k].action_line_sequence +':</b> ' + data.evidence[i].objective[k].action_line_name + '</p>';
                                                        
                                                    }
                                                }
                                                if(typeof data.evidence[i].complementary_attribute !== 'undefined'){
                                                    for(var l = 0; l < data.evidence[i].complementary_attribute.length; l++){
                                                        cuali += (data.evidence[i].complementary_attribute[l].objective_sequence === null) ? '' : '<p><b>'+ data.evidence[i].complementary_attribute[l].complementary_attribute_name +':</b> ' + data.evidence[i].complementary_attribute[l].complementary_attribute_description + '</p>';
                                                    }
                                                }
                                                if(typeof data.evidence[i].paper !== 'undefined'){
                                                    for(var m = 0; m < data.evidence[i].paper.length; m++){
                                                        cuali += (data.evidence[i].paper[m].paper_sequence === null) ? '' : '<p style="padding-right:30px;"><b>Artículo '+ data.evidence[i].paper[m].paper_sequence +':</b> ' + saltos(data.evidence[i].paper[m].paper_name) + '</p>';
                                                    }
                                                }

                                                cuali += '<hr style="border-top: 1px solid #bbb !important;">';
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
                                        cuanti += '<div class="col-md-10" id="selectCat">';
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
                                        $(".descargaIndividual").hide();
                                    }

                                    cuanti += '</div>';
        
                                //var tados = data.breakdown_group;
                                
                                cuanti += '<div class="divTabla">';
                                cuanti += '<div class="verTabla" style="width: 100%;overflow-x: auto;"></div>';
        
                                cuanti += '</div>';
                                
                                cuanti += '<div class="verGrafica" style="padding:30px 0 10px 0;"><div class="divGrafica"></div><div id="map"></div></div>';
        
                                //cuanti += '<div class="divGrafica"><svg id="graph" width="960" height="500"></svg></div>';
                                
        
                                cuanti += '<button class="btn btn-default btn-sm" onclick="svgToPng(\''+data.indicator_code+'-'+data.indicator_name+'\')" id="save">Descargar Gráfica</button><br/><br/><div class="row"><div class="col-md-12">';
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
    
    // datosDer.breakdown_group[variable].graphic, 
    //datosGrafica(data.breakdown_group[str].resource_id, data.breakdown_group[str].variable_dataset_id,data.breakdown_group[str].breakdown_attribute_result,data.breakdown_group[str].breakdown_attribute,data.breakdown_group[str].breakdown_group_year, data.breakdown_group[str].breakdown_resource_name),
        //'Periodo', 
        //datosDer.breakdown_group[variable].breakdown_resource_name,
        //'#f00',
        //datosDer
    function tipoGrafica(tipo, fuente, ejeX, ejeY, color, datos){
        // Tipos de gráfica reportados por la API según el recurso breakdown_group.graphic[n].graphic_key
        // Bre = Gráfica de Dotplot para comparación entre 2 variables
        // ColAg = Gráfica de columnas agrupadas para comparación entre 2 variables
        // Ln = Gráfica de línea simple
        // Col = Gráfica de barras simple
        // Mapa = Visualiza un mapa de México con las 32 entidades

        console.log(tipo);
        
        var salida;
        var var1, var2;
        
        if(ejeY.length > 1){
            var1 = ejeY[0];
            var2 = ejeY[1];
        }else{
            var1 = ejeY[0];
        }
        
        
        
        for(var t = 0;t<tipo.length;t++){
            switch(tipo[t].graphic_key){
                case "Bre":
                    salida = dotplot(fuente,ejeX,var1,var2, ["rgba(71, 73, 160,1)","rgba(71, 73, 160,0.55)"]);
                break;
                case "ColAg":
                    salida = columnaAgrupada(fuente,ejeX,var1,var2, ["rgba(71, 73, 160,1)","rgba(71, 73, 160,0.55)"]);
                break;
                case "Ln":
                    salida = lineas(fuente,ejeX,var1, color);
                break;
                case "Col":
                    salida = barras(fuente,ejeX,var1, color);
                break;
                case "Mapa":
                    salida = mapa(fuente,ejeX,var1, color);
                    //salida = '<div id="map"></div>';
                break;
                default:
                    salida = barras(fuente,ejeX,var1, color);
                break;

            }
        }
               
        return salida;
                
    }
    
    
    // Función para saber qué tipos de gráficas tiene la cetagoría según sus variables
    function switchGraficas(tipoGraficas){
        var sgra = '<div class="tipoGrafica"><span style="font-size:15px;">Tipo de gráfica: </span><div class="switchBtns" style="display:inline;">';
        
        console.log(tipoGraficas);
        
        for(var t = 0; t<tipoGraficas.length;t++){
            sgra += '<a class="btn btn-default btn-sm btn'+tipoGraficas[t].graphic_key+' tipo'+t+'">'+tipoGraficas[t].graphic_name+'</a> ';
        }
        
        sgra += '</div></div>';
        
        console.log(sgra);
        
        return sgra;
    }
    

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
    function datosTabulado(resource, dataset, resultado, clasificacion, periodos, recurso, varis, str2=''){
        datoInd = [];
        datoInd2 = [];
        datoInd3 = [];
        dat1 = '';
        rec = recurso;//Trae el valor de la clasificación a consultar. Ej. poblacion_con_menos_de_18_anios
        res = parseAPI(resultado);//Trae la variable del valor del dato. Ej. porc-pob-carencia-alim
        clas = parseAPI(clasificacion);//Trae el valor de de la clasificación. Ej. grupo-especifico
        console.log(clas);
        clas = minusculas(clas);
        ggg = minusculas(res);
        console.log(ggg);
        console.log(varis);
        var lor = [];
        for(var t = 0;t < varis.length;t++){
            //desglose de varis
            lor.push(parseAPI(varis[t].variable_breakdown_group_name));
            console.log(lor);
            
        }
        
        if(clas === null || res === null){
            var inf = [];
            //for(var yy=0;yy<rec.length;yy++){
                if(clas=="Entidad Federativa" || clas=="Entidad federativa"){
                        datoInd.push(apiGobGrupo(resource,dataset,minusculas(clas),rec[str2])); 
                    }else{
                        datoInd.push(apiGobGrupo(resource,dataset,clas,rec[str2])); 
                    }
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
                    dat1 += '<td>' + datoInd[0][gg][ii][minusculas(res)] + '</td>';
                } 
                dat1 += '</tr>';
            }
            dat1 += '</tbody>';
            dat1 += '</table>';
        }else if(clas === "entidad" || clas === "Entidad Federativa" || clas === "entidad-federativa"  || clas === "Circuito Judicial"){
            
            if(str2 !== ''){
            
            
                var inf = [];
                //for(var yy=0;yy<rec.length;yy++){
                    if(clas==="Entidad Federativa" || clas==="Entidad federativa"){
                        datoInd.push(apiGobGrupo(resource,dataset,minusculas(clas),rec[str2])); 
                    }else{
                        datoInd.push(apiGobGrupo(resource,dataset,clas,rec[str2])); 
                    }
                
                //}

                console.log(rec);

                dat1 += '<table class="table" id="tabuls1">';
                dat1 += '<thead><th>Periodo</th>';
                if(lor.length!==0){
                    console.log(lor);
                    for(var oo=0;oo<lor.length;oo++){
                        dat1 += '<th>'+lor[oo]+'</th>';
                    }
                }
                
                //for(var hh=0;hh<rec.length;hh++){
                    dat1 += '<th>'+res+'</th>';
                //}
                

                var periodos = [];
                for(var jj=0; jj < datoInd[0].length; jj++){
                    periodos.push(datoInd[0][jj].periodo);
                }

                dat1 += '</thead><tbody>';
                for(var gg=0;gg<periodos.length;gg++){
                    dat1 += '<tr>';
                        dat1 += '<td>' + periodos[gg] + '</td>';
                    //for(var ii = 0; ii < datoInd[str2].length; ii++){
                        //dat1 += '<td>' + datoInd[ii][gg][res] + '</td>';
                        if(lor.length!==0){
                            console.log(lor);
                            for(var pp=0;pp<lor.length;pp++){
                                var fog = lor[pp];
                                    dat1 += '<td>'+datoInd[0][gg][minusculas(fog)]+'</td>';
                            }
                        }
                        dat1 += '<td>' + datoInd[0][gg][minusculas(res)] + '</td>';
                    //} 

                    dat1 += '</tr>';
                }
                dat1 += '</tbody>';
                dat1 += '</table>';
                
                
                
            }else{
                
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
                        dat1 += '<td>' + datoInd[gg][ii][minusculas(res)] + '</td>';
                    } 
                    dat1 += '</tr>';
                }
                dat1 += '</tbody>';
                dat1 += '</table>';
            }
                
        }else{
            
            if(str2 !== ''){
                
                var inf = [];
                for(var yy=0;yy<rec.length;yy++){
                    datoInd.push(apiGobGrupo(resource,dataset,clas,rec[yy])); 
                }

                console.log(rec);

                dat1 += '<table class="table" id="tabuls1">';
                dat1 += '<thead><th>Periodo</th>';
                if(lor.length!==0){
                    console.log(lor);
                    for(var oo=0;oo<lor.length;oo++){
                        dat1 += '<th>'+lor[oo]+'</th>';
                    }
                }
                
                //for(var hh=0;hh<rec.length;hh++){
                    dat1 += '<th>'+res+'</th>';
                //}
                

                var periodos = [];
                
                for(var jj=0; jj < datoInd[0].length; jj++){
                    periodos.push(datoInd[0][jj].periodo);
                }

                dat1 += '</thead><tbody>';
                for(var gg=0;gg<periodos.length;gg++){
                    dat1 += '<tr>';
                        dat1 += '<td>' + periodos[gg] + '</td>';
                    //for(var ii = 0; ii < datoInd[str2].length; ii++){
                        //dat1 += '<td>' + datoInd[ii][gg][res] + '</td>';
                        if(lor.length!==0){
                            console.log(lor);
                            for(var pp=0;pp<lor.length;pp++){
                                var fog = lor[pp];
                                    dat1 += '<td>'+datoInd[str2][gg][minusculas(fog)]+'</td>';
                            }
                        }
                        dat1 += '<td>' + datoInd[str2][gg][minusculas(res)] + '</td>';
                    //} 

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
                if(lor.length!==0){
                    console.log(lor);
                    for(var oo=0;oo<lor.length;oo++){
                        dat1 += '<th>'+lor[oo]+'</th>';
                    }
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
                        dat1 += '<td>' + datoInd[ii][gg][minusculas(res)] + '</td>';
//                        if(lor.length!==0){
//                            console.log(lor);
//                            for(var pp=0;pp<lor.length;pp++){
//                                var fog = lor[pp];
//                                    dat1 += '<td>'+datoInd[ii][gg][fog]+'</td>';
//                            }
//                        }
                    } 

                    dat1 += '</tr>';
                }
                dat1 += '</tbody>';
                dat1 += '</table>';
               
               }
            
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
    function datosGrafica(resource, dataset, resultado, clasificacion, periodos, recurso, nombreCat){
        datoInd = [];
        datoInd2 = [];
        datoInd3 = [];
        dat111 = [];
        rec2 = recurso;//Trae el valor de la clasificación a consultar. Ej. poblacion_con_menos_de_18_anios
        res2 = parseAPI(resultado);//Trae la variable del valor del dato. Ej. porc-pob-carencia-alim
        clas2 = parseAPI(clasificacion);//Trae el valor de de la clasificación. Ej. grupo-especifico
        console.log(recurso);
        clas2 = minusculas(clas2);
        
        if(clas2 === "entidad" || clas2 === "Entidad Federativa"){
        //if(clas === "1" || clas === "En"){
       
            if(nombreCat === "Total"){
               
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
                                dat111 += '' + datoInd2[hh][gg][minusculas(res2)] + '';
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
                
               }else{
                // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // nuevos calculos para voltear el arreglo
            var inf = [];
                
            for(var yy=0;yy<rec2.length;yy++){
                datoInd2.push(apiGobGrupo(resource,dataset,clas2,rec2[yy])); 
            }
            
            dat111 += '[';

            var periodos = [];
            for(var jj=0; jj < datoInd2[0].length; jj++)
            {
                periodos.push(datoInd2[0][jj].periodo);
            }

            dat111 += '';
            
            //Contamos estados
            for(var gg=0; gg<rec2.length; gg++)
            {
                dat111 += '{';
                dat111 += '"Entidad" : "' + rec2[gg] + '",';
                
                
                for(var hh = 0; hh < periodos.length; hh++)
                {
                    dat111 += '"'+periodos[hh]+'" : ';
                    dat111 += '' + datoInd2[gg][hh][minusculas(res2)] + '';

                    if(hh === periodos.length-1)
                    {
                        dat111 += '';
                    }
                    else
                    {
                        dat111 += ',';
                    }      
                } 

                dat111 += '}';
                    
                if(gg === rec2.length-1)
                {
                    dat111 += '';
                }
                else
                {
                    dat111 += ',';
                }
            }
            dat111 += ']';
            
            console.log(dat111);
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
               }    
            
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
                        dat111 += '' + datoInd2[hh][gg][minusculas(res2)] + '';
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
        return contenido;
    }
    
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
    }
    
    function minusculas(dato){
        var contenido=dato;
        contenido=contenido.replace(/[ _]/g,"-");
        contenido=contenido.replace(/[.,;()%]/g,"");
        contenido=contenido.replace(/á/g,"a");
        contenido=contenido.replace(/é/g,"e");
        contenido=contenido.replace(/í/g,"i");
        contenido=contenido.replace(/ó/g,"o");
        contenido=contenido.replace(/ú/g,"u");
        contenido=contenido.replace(/ñ/g,"n");
        contenido=contenido.toLowerCase();
        return contenido;
    }
    
    function saltos(dato){
        var contenido=dato;
        contenido=contenido.replace("\r\n","<br/>");
        contenido=contenido.replace("\r","<br/>");
        contenido=contenido.replace("\n","<br/>");
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

        
    console.log(datosGlobal);
    
    
    
    
    //Esta función crea el JSON para la gráfica de acuerdo a los siguiente criterios
    //resource: resource_id de los datos del indicador a consultar en API datos.gob.mx
    //dataset: Dataset del indicador a consultar en API datos.gob.mx
    //resultado: Nombre del campo con el valor a graficar o tabular para consultarse en la API de datos.gob.mx. Ej. porc_pob_carencia_alim
    //clasificacion: Atributo a llamar de la API de datos.gob.mx Ej. grupo-especifico
    //periodos: Periodos que se van a consultar para el indicador, según reporte la API y consumido desde la variable breakdown_group_year
    //recurso: Nombre del recurso para la clasificación y el periodo a consultar. Ej. poblacion_con_menos_de_18_anios
    function datosMapa(resource, dataset, resultado, clasificacion, periodos, recurso, nombreCat){
        datoInd = [];
        datoInd2 = [];
        datoInd3 = [];
        dat111 = [];
        rec2 = recurso;//Trae el valor de la clasificación a consultar. Ej. poblacion_con_menos_de_18_anios
        res2 = parseAPI(resultado);//Trae la variable del valor del dato. Ej. porc-pob-carencia-alim
        clas2 = parseAPI(clasificacion);//Trae el valor de de la clasificación. Ej. grupo-especifico
        console.log(recurso);
        

        
        var inf = [];
                
            for(var yy=0;yy<rec2.length;yy++){
                datoInd2.push(apiGobGrupo(resource,dataset,clas2,rec2[yy])); 
            }
            
            dat111 += '[';
            
            
            var periodos = [];
            for(var jj=0; jj < datoInd2[0].length; jj++)
            {
                periodos.push(datoInd2[0][jj].periodo);
            }

            dat111 += '';
            
            //Contamos estados
            for(var gg=0; gg<rec2.length; gg++)
            {
                dat111 += '{';
                //dat111 += '"Entidad" : "' + rec2[gg] + '",';
                dat111 += '"Entidad" : "' + rec2[gg] + '",';
                
                
                for(var hh = 0; hh < periodos.length; hh++)
                {
                    //dat111 += '"'+periodos[hh]+'" : ';
                    dat111 += '' + datoInd2[gg][hh][minusculas(res2)] + '';

                    if(hh === periodos.length-1)
                    {
                        dat111 += '';
                    }
                    else
                    {
                        dat111 += ',';
                    }      
                } 

                dat111 += '}';
                    
                if(gg === rec2.length-1)
                {
                    dat111 += '';
                }
                else
                {
                    dat111 += ',';
                }
            }
            dat111 += ']';
            
            console.log(dat111);
        

        var cabezera = [];
        cabezera.push('Entidad');
        for(var i = 0; i< datoInd2[0].length; i++)
        {
            cabezera.push(datoInd2[0][i]['periodo']+'-01-01')
        }
        
            console.log(datoInd2);
        var nuevo_array = [];
        //cargar cabezeras
        nuevo_array.push(cabezera);
        for(var i = 0; i< datoInd2.length; i++)
        {
            //console.log(datoInd2[i]);
            var nuevo_array_interno = [];
            nuevo_array_interno.push(datoInd2[i][0][clas2]);
            for(var j = 0; j< datoInd2[i].length; j++)
            {
                //console.log(datoInd2[i][j]);
                nuevo_array_interno.push(datoInd2[i][j][minusculas(res2)]);
            }
            
            nuevo_array.push(nuevo_array_interno);
        }
        
        console.log(nuevo_array);
        
        return nuevo_array;
    }
    

    
});

