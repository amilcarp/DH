function lineas(URLJSON, ejeX, ejeY, color){
    /* Configuración del tamaño de la caja del canvas o SVG */
    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Se definen las variables de los ejes X y Y
    var parseTime = d3.timeParse("%Y");
    
    // Valores para Líneas
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().rangeRound([height, 0]);
    
    // Se crea la variable de la línea con las variables que va a graficar en cada eje
    var line = d3.line()
        .x(function(d) { return x(d[ejeX]); })
        .y(function(d) { return y(d[ejeY]); });
    
    // Se crea la variable que mostrará el tooltip
    var tooltip = d3.select("body").append("div").attr("class", "toolTip");
    
    var data = JSON.parse(URLJSON);
    
    // Cargamos los datos del JSON
//    d3.json(URLJSON, function(error, data) {
//        if (error) throw error;
//        console.log(data);
        
    console.log(data);
        // Aquí cargamos los datos
        data.forEach(function(d) {
            d[ejeX] = parseTime(d[ejeX]);
            //d[ejeX] = d[ejeX];
            d[ejeY] = +d[ejeY];
            //d['poblacion_con_menos_de_18_anios'] = +d['poblacion_con_menos_de_18_anios'];
            console.log(d[ejeX]);
          });
        
        // Aquí se define el dominio de los ejes X y Y
        x.domain(d3.extent(data, function(d) { return d[ejeX]; }));
        //x.domain(data.map(function(d) {return d['Periodo'];}));
        //x.domain(data.map(function(d){ return d.Periodo; }));
        y.domain(d3.extent(data, function(d) { return d[ejeY]; }));

        // Dibuja el eje X
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")))
            .select(".domain");

        // Dibuja el eje Y y anota el atributo del eje
        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Unidades");

        // Dibuja la línea
        g.append("path")
            .datum(data)
            .attr("class","line")
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 5)
            .attr("d", line);

        // Dibuja círculos en la línea
        g.selectAll("circle")
            .data(data).enter().append("svg:circle")
            .attr("cx", function(d) { return x(d[ejeX]);})
            .attr("cy", function(d) {return y(d[ejeY])})
            .attr("fill", color)
            .attr("fill-opacity","0").attr("r", 6)
            .on("mouseover", function(d,i) {  
                tooltip
                    .style("left", d3.event.pageX - 25 + "px")
                    .style("top", d3.event.pageY - 30 + "px")
                    .style("display", "inline-block")
                    .text(d[ejeY]);
            })
            .on("mouseout", function(d){
                tooltip.style("display", "none");
            });
        
    //});

} 

function columnaAgrupada(URLJSON, ejeX,var1, var2, color){
    /* Configuración del tamaño de la caja del canvas o SVG */
    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    
    // Se definen las variables de los ejes X y Y
    var parseTime = d3.timeParse("%Y");
    
    // Valores para Columna agrupada
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    var y = d3.scaleLinear().rangeRound([height, 0]);
    
    // Se crea la variable que mostrará el tooltip
    var tooltip = d3.select("body").append("div").attr("class", "toolTip");
    
    var data = JSON.parse(URLJSON);
    
    var chartWidth=960, chartHeight=500;
        
        var axisLayer = svg.append("g").classed("axisLayer", true);
        var chartLayer = svg.append("g").classed("chartLayer", true);


        var xScale = d3.scaleBand();

        var xInScale = d3.scaleBand();

        var yScale = d3.scaleLinear();

        var color = d3.scaleOrdinal()
            .range(color);
    
    console.log(data);

    
    var nested = d3.nest()
            .rollup(function(d){ delete d[0][ejeX]; return d[0] })
            .key(function(d){ return d[ejeX] })
            .entries(data);
    
        console.log(nested);
    
        nested.forEach(function(d){
            d.age = Object.keys(d.value).map(function(key){
                return {key:key, value:d.value[key]}
            });
        });
        
        console.log(nested);

        setSize(nested);
        drawAxis();
        drawChart(nested);
    
    
    function cast(data) {
        Object.keys(d).forEach(function(key){
            if (!isNaN(+d[key])) d[key] = +d[key]
        })
        return d;
    }
    
    
    function setSize(nested) {

        width = document.querySelector(".divGrafica").clientWidth;
        height = document.querySelector(".divGrafica").clientHeight;
        
//        width = clientWidth;
//        height = clientHeight;

        margin = {top:0, left:100, bottom:40, right:30 };
        
        
        chartWidth = width - (margin.left+margin.right);
        chartHeight = height - (margin.top+margin.bottom);
        
        svg.attr("width", width).attr("height", height);
        
        axisLayer.attr("width", width).attr("height", height);
        
        chartLayer
            .attr("width", chartWidth)
            .attr("height", chartHeight)
            .attr("transform", "translate("+[margin.left+10, margin.top]+")");
            
        
                
        xScale.domain(nested.map(function(d) { return d.key }))
            .range([0, chartWidth]).paddingInner(0.1);
            
        
        var ageNames = Object.keys(nested[0].value);
        
        xInScale.domain(ageNames).range([0, xScale.bandwidth()]);
        
        var yMax = d3.max(nested.map(function(d){
            var values = Object.keys(d.value).map(function(key){
                return d.value[key];
            })
            return d3.max(values);
        }))

        yScale.domain([0, yMax]).range([chartHeight, 0]);

            
    }
    
    function drawChart(nested) {
        var t = d3.transition()
            .duration(1000)
            .ease(d3.easeLinear);

        
        var contry = chartLayer.selectAll(".contry")
            .data(nested);
            
        var newCountry = contry.enter().append("g").attr("class", "contry");
        

        contry.merge(newCountry)
            .attr("transform", function(d) { return "translate(" + [xScale(d.key)+5, 0] + ")"; });

        
        var bar = newCountry.selectAll(".barr")
            .data(function(d){ return d.age });

        var newBar = bar.enter().append("rect").attr("class", "barr");

                        
        bar.merge(newBar)
            .attr("width", xInScale.bandwidth()-20)
            .attr("height", 0)
            .attr("fill", function(d) { return color(d.key); })
            .attr("transform", function(d) { return "translate(" + [xInScale(d.key), chartHeight] + ")" }).on("mousemove", function(d){
                    tooltip
                      .style("left", d3.event.pageX - 25 + "px")
                      .style("top", d3.event.pageY - 40 + "px")
                      .style("display", "inline-block")
                    .text(d.key + ': ' +d.value);
                })
                .on("mouseout", function(d){ tooltip.style("display", "none");});
//               .transition()
//               .delay(function(d,i){ return i*100 })
//               .duration(2000)
//                .attr('y', function(d){ return y(d.value)})
//               .attr('height', function(d){ return height - y(d.value) });

        
        
        //アニメーション
       bar.merge(newBar).transition(t)
            .attr("height", function(d) { return chartHeight - yScale(d.value)-3; })
            .attr("transform", function(d) { return "translate(" + [xInScale(d.key), yScale(d.value)] + ")" });
        
        console.log(nested);
        var tor = nested[0];
        console.log(tor);
        
         //Legend
        var legend = svg.selectAll(".legend")
          .data(nested.map(function(d) { console.log(d.age[0].key); return d.age[0].key; }).reverse())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
          .style("opacity","0");

        legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", function(d) { return color(d); });

        legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) {return d; });

        legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","0");
        
    }
    
    function drawAxis(){
        var yAxis = d3.axisLeft(yScale)
            .tickSizeInner(-chartWidth);
        
        axisLayer.append("g")
            .attr("transform", "translate("+[margin.left, margin.top]+")")
            .attr("class", "axis y")
            .call(yAxis);
            
        var xAxis = d3.axisBottom(xScale);
    
        axisLayer.append("g")
            .attr("class", "axis x")
            .attr("transform", "translate("+[margin.left, chartHeight]+")")
            .call(xAxis);
        
    }
    
    
     
}

function barras(URLJSON, ejeX, ejeY, color){
    /* Configuración del tamaño de la caja del canvas o SVG */
    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    
    // Se definen las variables de los ejes X y Y
    var parseTime = d3.timeParse("%Y");
        // Valores para Barras
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    var y = d3.scaleLinear().rangeRound([height, 0]);
    
        // Se crea la variable que mostrará el tooltip
    var tooltip = d3.select("body").append("div").attr("class", "toolTip");
    
    
        // Cargamos los datos del JSON
//    d3.json("AaR02.json", function(error, data) {
//        if (error) throw error;
//        console.log(data);
        
    console.log(URLJSON);
    var data = JSON.parse(URLJSON);
    
    console.log(data);
    
        data.forEach(function(d) {
            d[ejeX] = d[ejeX];
            d[ejeY] = +d[ejeY];
            //d['poblacion_con_menos_de_18_anios'] = +d['poblacion_con_menos_de_18_anios'];
            console.log(d[ejeX]);
          });
          x.domain(data.map(function(d) { return d[ejeX]; }));
          y.domain([0, d3.max(data, function(d) { return d[ejeY]; })]);

          g.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + height  + ")")
              .call(d3.axisBottom(x));

//          g.append("g")
//              .attr("class", "axis axis--y")
//              .call(d3.axisLeft(y))
//            .append("text")
//              .attr("transform", "rotate(-90)")
//              .attr("y", 6)
//              .attr("dy", "0.71em")
//              .attr("text-anchor", "end")
//              .text("Unidades");

            g.append("g")
              .call(d3.axisLeft(y))
            .append("text")
              .attr("fill", "#000")
              .attr("transform", "rotate(-90)")
              .attr("y", -50)
              .attr("dy", "0.71em")
              .attr("text-anchor", "end")
              .text("Unidades");

          g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
              .attr("class", "bar")
              .attr("x", function(d) { return x(d[ejeX]); })
              .attr("y", function(d) { return height; })
              .attr("width", x.bandwidth())
              .attr("height", function(d) { return 0})
            .on("mousemove", function(d){
                    tooltip
                      .style("left", d3.event.pageX - 25 + "px")
                      .style("top", d3.event.pageY - 40 + "px")
                      .style("display", "inline-block")
                    .text(d[ejeY]);
                })
                .on("mouseout", function(d){ tooltip.style("display", "none");})
               .transition()
               .delay(function(d,i){ return i*100 })
               .duration(2000)
                .attr('y', function(d){ return y(d[ejeY])})
               .attr('height', function(d){ return height - y(d[ejeY]) });
        
   // });
    
}

function dotplot(){
    
}

function mapa(){
    
}




///* Configuración del tamaño de la caja del canvas o SVG */
//    var svg = d3.select("svg"),
//        margin = {top: 20, right: 20, bottom: 30, left: 50},
//        width = +svg.attr("width") - margin.left - margin.right,
//        height = +svg.attr("height") - margin.top - margin.bottom,
//        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//    
//    // Se definen las variables de los ejes X y Y
//    var parseTime = d3.timeParse("%Y");
//    // Rangos de fechas para líneas
//    //var x = d3.scaleTime().range([0, width]);
//    
//    //var y = d3.scale.ordinal().rangeRoundBands([0, width], .1);
//    //var y = d3.scaleBand().rangeRound([0, width]).padding(0.1);
//    //var x = d3.scaleLinear().rangeRound([height, 0]);
//    
//    
//    // Valores para Líneas
////    var x = d3.scaleTime().range([0, width]);
////    var y = d3.scaleLinear().rangeRound([height, 0]);
//    
//    
//    // Valores para Barras
////    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
////    var y = d3.scaleLinear().rangeRound([height, 0]);
//    
//    
//    // Valores para dotplot
//   // var widthScale = d3.scaleLinear().range([ 0, width]);
//
//	//var heightScale = d3.scaleLinear().rangeRound([ margin.top, height], 0.2);
////    var x = d3.scaleLinear().range([0, width]);
////    var y = d3.scaleLinear().rangeRound([height, 0]);
//    
//    //var y = d3.scaleOrdinal().range([height, 0]);
//    //var x = d3.scaleLinear().range([0, width]);
//    
//    // -------------------------------------
//    
//    
//    // Valores para Columna agrupada
//    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
//    var y = d3.scaleLinear().rangeRound([height, 0]);
//    
//    
////    var xAxis = d3.svg.axis()
////					.scale(widthScale)
////					.orient("bottom");
////
////	var yAxis = d3.svg.axis()
////					.scale(heightScale)
////					.orient("left")
////					.innerTickSize(-width)
////					.outerTickSize(0)
////					.tickPadding(10);
//
//    // Se crea la variable de la línea con las variables que va a graficar en cada eje
////    var line = d3.line()
////        .x(function(d) { return x(d['Periodo']); })
////        .y(function(d) { return y(d['poblacion_de_18_anios_o_mas']); });
//
//    // Se crea la variable que mostrará el tooltip
//    var tooltip = d3.select("body").append("div").attr("class", "toolTip");
//
//    // Cargamos los datos del JSON
//    d3.json("AaR02.json", function(error, data) {
//        if (error) throw error;
//        console.log(data);
//        
//        // Se llama a la función que construye el gráfico
//        // Llama a función de Líneas
//        //lineas(data);
//        
//        // Llama a función de Barras
//        //barras(data);
//        
//        // Llama a función de Dotplot
//        dotplot(data);
//        
//        // Llama a función de Columna agrupada
//        //columnAgrupada(data);
//        
//        
//    });
//    
//    
//    
//    function lineasJSON(data){
//        // Aquí cargamos los datos
//        data.forEach(function(d) {
//            d['Periodo'] = parseTime(d['Periodo']);
//            d['poblacion_de_18_anios_o_mas'] = +d['poblacion_de_18_anios_o_mas'];
//            d['poblacion_con_menos_de_18_anios'] = +d['poblacion_con_menos_de_18_anios'];
//            console.log(d['Periodo']);
//          });
//        
//        // Aquí se define el dominio de los ejes X y Y
//        x.domain(d3.extent(data, function(d) { return d['Periodo']; }));
//        //x.domain(data.map(function(d) {return d['Periodo'];}));
//        //x.domain(data.map(function(d){ return d.Periodo; }));
//        y.domain(d3.extent(data, function(d) { return d['poblacion_de_18_anios_o_mas']; }));
//
//        // Dibuja el eje X
//        g.append("g")
//            .attr("transform", "translate(0," + height + ")")
//            .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")))
//            .select(".domain");
//
//        // Dibuja el eje Y y anota el atributo del eje
//        g.append("g")
//            .call(d3.axisLeft(y))
//            .append("text")
//            .attr("fill", "#000")
//            .attr("transform", "rotate(-90)")
//            .attr("y", -50)
//            .attr("dy", "0.71em")
//            .attr("text-anchor", "end")
//            .text("Unidades");
//
//        // Dibuja la línea
//        g.append("path")
//            .datum(data)
//            .attr("class","line")
//            .attr("fill", "none")
//            .attr("stroke", "#a1b5c0")
//            .attr("stroke-linejoin", "round")
//            .attr("stroke-linecap", "round")
//            .attr("stroke-width", 5)
//            .attr("d", line);
//
//        // Dibuja círculos en la línea
//        g.selectAll("circle")
//            .data(data).enter().append("svg:circle")
//            .attr("cx", function(d) { return x(d['Periodo']);})
//            .attr("cy", function(d) {return y(d['poblacion_de_18_anios_o_mas'])})
//            .attr("fill", "#a1b5c0")
//            .attr("fill-opacity","0").attr("r", 6)
//            .on("mouseover", function(d,i) {  
//                tooltip
//                    .style("left", d3.event.pageX - 25 + "px")
//                    .style("top", d3.event.pageY - 30 + "px")
//                    .style("display", "inline-block")
//                    .text(d['poblacion_de_18_anios_o_mas']);
//            })
//            .on("mouseout", function(d){
//                tooltip.style("display", "none");
//            });
//        
//    }
//    
//    
//    function barras(data){
//        
//        data.forEach(function(d) {
//            d['Periodo'] = d['Periodo'];
//            d['poblacion_de_18_anios_o_mas'] = +d['poblacion_de_18_anios_o_mas'];
//            d['poblacion_con_menos_de_18_anios'] = +d['poblacion_con_menos_de_18_anios'];
//            console.log(d['Periodo']);
//          });
//          x.domain(data.map(function(d) { return d['Periodo']; }));
//          y.domain([0, d3.max(data, function(d) { return d['poblacion_de_18_anios_o_mas']; })]);
//
//          g.append("g")
//              .attr("class", "axis axis--x")
//              .attr("transform", "translate(0," + height  + ")")
//              .call(d3.axisBottom(x));
//
////          g.append("g")
////              .attr("class", "axis axis--y")
////              .call(d3.axisLeft(y))
////            .append("text")
////              .attr("transform", "rotate(-90)")
////              .attr("y", 6)
////              .attr("dy", "0.71em")
////              .attr("text-anchor", "end")
////              .text("Unidades");
//
//            g.append("g")
//              .call(d3.axisLeft(y))
//            .append("text")
//              .attr("fill", "#000")
//              .attr("transform", "rotate(-90)")
//              .attr("y", -50)
//              .attr("dy", "0.71em")
//              .attr("text-anchor", "end")
//              .text("Unidades");
//
//          g.selectAll(".bar")
//            .data(data)
//            .enter().append("rect")
//              .attr("class", "bar")
//              .attr("x", function(d) { return x(d['Periodo']); })
//              .attr("y", function(d) { return height; })
//              .attr("width", x.bandwidth())
//              .attr("height", function(d) { return 0})
//            .on("mousemove", function(d){
//                    tooltip
//                      .style("left", d3.event.pageX - 25 + "px")
//                      .style("top", d3.event.pageY - 40 + "px")
//                      .style("display", "inline-block")
//                    .text(d['poblacion_de_18_anios_o_mas']);
//                })
//                .on("mouseout", function(d){ tooltip.style("display", "none");})
//               .transition()
//               .delay(function(d,i){ return i*100 })
//               .duration(2000)
//                .attr('y', function(d){ return y(d['poblacion_de_18_anios_o_mas'])})
//               .attr('height', function(d){ return height - y(d['poblacion_de_18_anios_o_mas']) });
//    }
//    
//    
//    function dotplot(data){
//        
//        data.sort(function(a, b) {
//			return d3.descending(+a.poblacion_de_18_anios_o_mas, +b.poblacion_de_18_anios_o_mas);
//		});
//        
//        data.forEach(function(d) {
//            d['Periodo'] = d['Periodo'];
//            d['poblacion_de_18_anios_o_mas'] = +d['poblacion_de_18_anios_o_mas'];
//            d['poblacion_con_menos_de_18_anios'] = +d['poblacion_con_menos_de_18_anios'];
//            console.log(d['Periodo']);
//          });
//        
//		//y.domain([600, 0]);
////
////		// js map: will make a new array out of all the d.pais fields
////		y.domain(data.map(function(d) { return d['Periodo']; } ));
//        
//        //y.domain(data.map(function(d) { return d['Periodo']; }));
//        y.domain(data.map(function(d) { return d.Periodo; }));
//        x.domain([0, d3.max(data, function(d) { return d.poblacion_de_18_anios_o_mas; })]);
//
//        console.log(y);
//		// Make the faint lines from y labels to highest dot
//
//		var linesGrid = svg.selectAll("lines.grid")
//			.data(data)
//			.enter()
//			.append("line");
//
//		linesGrid.attr("class", "grid")
//			.attr("x1", margin.left)
//			.attr("y1", function(d) {
//            var dum = y(d.Periodo) + y.range()/2;
//            
//            console.log(dum);
//				return dum;//y(d['Periodo']) + y.range()/2;
//                //return 50;
//			})
//			.attr("x2", function(d) {
//				return margin.left + x(+d.poblacion_de_18_anios_o_mas);
//
//			})
//			.attr("y2", function(d) {
//				return y(d.Periodo) + y.range()/2;
//                //return 340;
//			});
//
//		// Make the dotted lines between the dots
//
//		var linesBetween = svg.selectAll("lines.between")
//			.data(data)
//			.enter()
//			.append("line");
//
//		linesBetween.attr("class", "between")
//			.attr("x1", function(d) {
//				return margin.left + x(+d.poblacion_con_menos_de_18_anios);
//			})
//			.attr("y1", function(d) {
//				return y(d.Periodo) + y.range()/2;
//                //return 250;
//			})
//			.attr("x2", function(d) {
//				return margin.left + x(d.poblacion_de_18_anios_o_mas);
//			})
//			.attr("y2", function(d) {
//				//return y(d['Periodo']) + y.range()/2;
//                return y(d['Periodo']) + y.range()/2;;
//			})
//			.attr("stroke-dasharray", "1,3")
//			.attr("stroke-width", function(d, i) {
//				if (i == 7) {
//					return "1";
//				} else {
//					return "0.5";
//				}
//			});
//
//
//		// Puntos para porcentaje de mujeres
//
//		var puntos_mujeres = svg.selectAll("circle.mujeres")
//				.data(data)
//				.enter()
//				.append("circle");
//
//		puntos_mujeres
//			.attr("class", "mujeres")
//			.attr("cx", function(d) {
//				return margin.left + x(+d.poblacion_con_menos_de_18_anios);
//			})
//			.attr("r", 7)//y.range()/2)
//			.attr("cy", function(d) {
//				return y(d.Periodo) + y.range()/2;
//                //return 270;
//			})
//			.style("stroke", function(d){
//				if (d.Periodo === "Promedio OCDE") {
//					return "black";
//				}
//			})
//			.style("fill", function(d){
//				if (d['Periodo'] === "Promedio OCDE") {
//					return "#721dac";
//				}
//			});
//
//		// Puntos para porcentaje de hombres
//
//		var puntos_hombres = svg.selectAll("circle.hombres")
//				.data(data)
//				.enter()
//				.append("circle");
//
//		puntos_hombres
//			.attr("class", "hombres")
//			.attr("cx", function(d) {
//				return margin.left + x(+d.poblacion_de_18_anios_o_mas);
//			})
//			.attr("r",7)// y.range()/2)
//			.attr("cy", function(d) {
//				//return y(d['Periodo']) + y.range()/2;
//                return 300;
//			})
//			.style("stroke", function(d){
//				if (d['Periodo'] === "Promedio OCDE") {
//					return "black";
//				}
//			})
//			.style("fill", function(d){
//				if (d['Periodo'] === "Promedio OCDE") {
//					return "#999";
//				}
//			})
//			.append("title")
//			.text(function(d) {
//				return d.Periodo + ": " + d.poblacion_de_18_anios_o_mas + "%";
//			});
//
//			// add the axes
//
//		svg.append("g")
//			.attr("class", "x axis")
//			.attr("transform", "translate(" + margin.left + "," + height + ")")
//			.call(x);
//
//		svg.append("g")
//			.attr("class", "y axis")
//			.attr("transform", "translate(" + margin.left + ",0)")
//			.call(y);
//
//		svg.append("text")
//			.attr("class", "xlabel")
//        	.attr("transform", "translate(" + (margin.left + width / 2) + " ," +
//        				(height + margin.bottom) + ")")
//        	.style("text-anchor", "middle")
//        	.attr("dy", "12")
//        	.text("Puntaje promedio");
//        	
//        	
//        	
//        	svg.selectAll("circle")
//	         .data(data)
//	       .enter().append("svg:circle")
//	         .attr("stroke", "#fff")
//	         .attr("fill", function(d, i) { return '#f00'; })
//	         .attr("cx", function(d, i) { return d.x; })
//	         .attr("cy", function(d, i) { return d.y; })
//	         .attr("r", function(d, i) { return d.r; });
//	        
//
//      
//
////	        $('svg circle').tipsy({ 
////	        trigger: 'hover',
////	        delayOut: 1000,
////	        fade: true,
////	        gravity: 'w', 
////	        html: true,
////	        opacity: 1,
////	        title: function() {
////	          var d = this.__data__, c = '#f00';
////	          var brecha = d.puntos_h-d.puntos_m;
////	          $('#tooltip').html("<div style='background:#fff;color:#C0DAEF;padding:10px;left:665px;box-shadow:2px 2px 5px #bbb;padding:0px !important;width:260px;text-align:center;position:absolute;top:330px;'><h2 style='margin-top:0px;background:#111;color:#fff;padding:8px;font-family:galanogrotesque-bold;'>" + d.pais + "</h2><p style='background:#fff;color:#333;font-family:galanogrotesque-bold;margin-left:5px;padding-right:10px;padding-top:0px;margin-top:-10px;'>Puntaje promedio niñas: " + d.puntos_m + "</p><p style='background:#fff;color:#333;font-family:galanogrotesque-bold;margin-left:5px;padding-right:10px;padding-bottom:0px;margin-top:-10px;'>Puntaje promedio niños: " + d.puntos_h + "</p><p style='background:#fff;color:#333;font-family:galanogrotesque-bold;margin-left:5px;padding-right:10px;padding-bottom:0px;margin-top:-10px;'>Brecha: " + brecha.toFixed(1) + "</p></div>");
////	          //return "<div style='background:#fff;color:#C0DAEF;padding:10px;right:0;bottom:0;box-shadow:2px 2px 5px #bbb;padding:0px !important;width:300px;text-align:center;'><h2 style='background:#111;color:#fff;padding:8px;font-family:galanogrotesque-bold;'>" + d.pais + "</h2><p style='background:#fff;color:#333;font-family:galanogrotesque-bold;margin-left:5px;padding-right:10px;padding-top:0px;margin-top:-10px;'>% mujeres: " + d.puntos_m + "</p><p style='background:#fff;color:#333;font-family:galanogrotesque-bold;margin-left:5px;padding-right:10px;padding-bottom:10px;margin-top:-10px;'>% hombres: " + d.puntos_h + "</p></div>";
////	          return "";
////	
////	        }
////	      	});
//
//
//       	// Style one of the Y labels bold:
//
//        // a hack that works if you can unravel the selections - to style "The World" bold in the axis label, which is the 8th element:
////        var allYAxisLabels = d3.selectAll("g.y.axis g.tick text")[0]; // un-nest array
////        console.log(allYAxisLabels);
////        d3.select(allYAxisLabels[4]).style("font-weight", "normal");
//        	// You could also use tick formatting to get a % sign on each axis tick
//
////        console.log(allYAxisLabels);
//        
//        
//			//});
//
///*
//
//Se agregan Leyendas
//*/
//
//		svg.append('text')
//		.attr("x", 550)
//		.attr("y", 273)
//		.attr("fill","#721dac")
//		.text(".")
//		.attr("font-family", "Comic Sans")
//	    .attr("font-size", "102px")
//		.attr("stroke", "#721dac");
//		
//		svg.append('text')
//		.attr("x", 550)
//		.attr("y", 294)
//		.attr("fill","#999")
//		.text(".")
//		.attr("font-family", "Comic Sans")
//	    .attr("font-size", "102px")
//		.attr("stroke", "#999");
//		
//		svg.append('text')
//		.attr("x", 560)
//		.attr("y", 310)
//		.attr("fill","#721dac")
//		.text(". . .")
//		.attr("font-family", "Helvetica Neue")
//		.attr("font-weight", "900")
//	    .attr("font-size", "11px")
//		.attr("stroke", "#999");
//
//		
//		
//
//	   svg.append("text")
//	     .attr("x", 585)
//	     .attr("y", 273)
//	     .text("Niñas")                        
//	     .attr("font-family", "Helvetica Neue")
//	     .attr("font-size", "11px")
//	     .attr("fill", "black");
//	     
//	     
//   	   svg.append("text")
//	     .attr("x", 585)
//	     .attr("y", 293)
//	     .text("Niños")                        
//	     .attr("font-family", "Helvetica Neue")
//	     .attr("font-size", "11px")
//	     .attr("fill", "black");	
//	     
//   	   svg.append("text")
//	     .attr("x", 585)
//	     .attr("y", 313)
//	     .text("Diferencia")                        
//	     .attr("font-family", "Helvetica Neue")
//	     .attr("font-size", "11px")
//	     .attr("fill", "black");
//        
//    }
//    
//    
//    
//    
//    var chartWidth, chartHeight;
//        
//        var axisLayer = svg.append("g").classed("axisLayer", true);
//        var chartLayer = svg.append("g").classed("chartLayer", true);
//
//
//        var xScale = d3.scaleBand();
//
//        var xInScale = d3.scaleBand();
//
//        var yScale = d3.scaleLinear();
//
//        var color = d3.scaleOrdinal()
//            .range(["#d0743c", "#ff8c00"]);
//    
//    function columnAgrupadaJSON(data){
//    
////        var chartWidth, chartHeight;
////        
////        var axisLayer = svg.append("g").classed("axisLayer", true);
////        var chartLayer = svg.append("g").classed("chartLayer", true);
////
////
////        var xScale = d3.scaleBand();
////
////        var xInScale = d3.scaleBand();
////
////        var yScale = d3.scaleLinear();
////
////        var color = d3.scaleOrdinal()
////            .range(["#5DDEC9", "#EF64AD", "#7b6888", "#BA67E5", "#E0E23B", "#d0743c", "#ff8c00"]);
//        
//    
//        var nested = d3.nest()
//            .rollup(function(d){ delete d[0].Periodo; return d[0] })
//            .key(function(d){ return d.Periodo })
//            .entries(data);
//
//        
//        
//        nested.forEach(function(d){
//            d.age = Object.keys(d.value).map(function(key){
//                return {key:key, value:d.value[key]}
//            });
//        });
//        
//        console.log(nested);
//
//        setSize(nested);
//        drawAxis();
//        drawChart(nested);
//        
//        
//    }
//    
//    function cast(data) {
//        Object.keys(d).forEach(function(key){
//            if (!isNaN(+d[key])) d[key] = +d[key]
//        })
//        return d;
//    }
//    
//    
//    function setSize(nested) {
//
//        width = document.querySelector("#graph").clientWidth;
//        height = document.querySelector("#graph").clientHeight;
//
//        margin = {top:0, left:100, bottom:40, right:30 };
//        
//        
//        chartWidth = width - (margin.left+margin.right);
//        chartHeight = height - (margin.top+margin.bottom);
//        
//        svg.attr("width", width).attr("height", height);
//        
//        axisLayer.attr("width", width).attr("height", height);
//        
//        chartLayer
//            .attr("width", chartWidth)
//            .attr("height", chartHeight)
//            .attr("transform", "translate("+[margin.left+10, margin.top]+")");
//            
//        
//                
//        xScale.domain(nested.map(function(d) { return d.key }))
//            .range([0, chartWidth]).paddingInner(0.1);
//            
//        
//        var ageNames = Object.keys(nested[0].value);
//        
//        xInScale.domain(ageNames).range([0, xScale.bandwidth()]);
//        
//        var yMax = d3.max(nested.map(function(d){
//            var values = Object.keys(d.value).map(function(key){
//                return d.value[key];
//            })
//            return d3.max(values);
//        }))
//
//        yScale.domain([0, yMax]).range([chartHeight, 0]);
//
//            
//    }
//    
//    function drawChart(nested) {
//        var t = d3.transition()
//            .duration(1000)
//            .ease(d3.easeLinear);
//
//        
//        var contry = chartLayer.selectAll(".contry")
//            .data(nested);
//            
//        var newCountry = contry.enter().append("g").attr("class", "contry");
//        
//
//        contry.merge(newCountry)
//            .attr("transform", function(d) { return "translate(" + [xScale(d.key), 0] + ")"; });
//
//        
//        var bar = newCountry.selectAll(".bar")
//            .data(function(d){ return d.age });
//
//        var newBar = bar.enter().append("rect").attr("class", "bar");
//
//                        
//        bar.merge(newBar)
//            .attr("width", xInScale.bandwidth()-60)
//            .attr("height", 0)
//            .attr("fill", function(d) { return color(d.key); })
//            .attr("transform", function(d) { return "translate(" + [xInScale(d.key), chartHeight] + ")" }).on("mousemove", function(d){
//                    tooltip
//                      .style("left", d3.event.pageX - 25 + "px")
//                      .style("top", d3.event.pageY - 40 + "px")
//                      .style("display", "inline-block")
//                    .text(d.value);
//                })
//                .on("mouseout", function(d){ tooltip.style("display", "none");});
////               .transition()
////               .delay(function(d,i){ return i*100 })
////               .duration(2000)
////                .attr('y', function(d){ return y(d.value)})
////               .attr('height', function(d){ return height - y(d.value) });
//
//        
//        
//        //アニメーション
//       bar.merge(newBar).transition(t)
//            .attr("height", function(d) { return chartHeight - yScale(d.value)-3; })
//            .attr("transform", function(d) { return "translate(" + [xInScale(d.key), yScale(d.value)] + ")" });
//        
//        console.log(nested);
//        var tor = nested[0];
//        console.log(tor);
//        
//         //Legend
//        var legend = svg.selectAll(".legend")
//          .data(nested.map(function(d) { console.log(d.age[0].key); return d.age[0].key; }).reverse())
//        .enter().append("g")
//          .attr("class", "legend")
//          .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
//          .style("opacity","0");
//
//        legend.append("rect")
//          .attr("x", width - 18)
//          .attr("width", 18)
//          .attr("height", 18)
//          .style("fill", function(d) { return color(d); });
//
//        legend.append("text")
//          .attr("x", width - 24)
//          .attr("y", 9)
//          .attr("dy", ".35em")
//          .style("text-anchor", "end")
//          .text(function(d) {return d; });
//
//        legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");
//        
//    }
//    
//    function drawAxis(){
//        var yAxis = d3.axisLeft(yScale)
//            .tickSizeInner(-chartWidth);
//        
//        axisLayer.append("g")
//            .attr("transform", "translate("+[margin.left, margin.top]+")")
//            .attr("class", "axis y")
//            .call(yAxis);
//            
//        var xAxis = d3.axisBottom(xScale);
//    
//        axisLayer.append("g")
//            .attr("class", "axis x")
//            .attr("transform", "translate("+[margin.left, chartHeight]+")")
//            .call(xAxis);
//        
//    }   
//    