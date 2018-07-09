function lineas(URLJSON, ejeX, ejeY, color){
    /* Configuración del tamaño de la caja del canvas o SVG */
//    var svg = d3.select("svg"),
//        margin = {top: 20, right: 20, bottom: 30, left: 50},
//        width = +svg.attr("width") - margin.left - margin.right,
//        height = +svg.attr("height") - margin.top - margin.bottom,
//        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var margin = {top: 20, right: 20, bottom: 10, left: 50};
    var width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    var svg = d3.select("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);
    
    var g = svg.append("g")
        .attr("class","Ln")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
        x.nice();
        //x.domain(data.map(function(d) {return d['Periodo'];}));
        //x.domain(data.map(function(d){ return d.Periodo; }));
        y.domain(d3.extent(data, function(d) { return d[ejeY]; }));
        y.nice();

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
//    var svg = d3.select("svg"),
//        margin = {top: 20, right: 20, bottom: 30, left: 50},
//        width = +svg.attr("width") - margin.left - margin.right,
//        height = +svg.attr("height") - margin.top - margin.bottom,
//        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var margin = {top: 20, right: 20, bottom: 10, left: 50};
    var width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    var svg = d3.select("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("class","ColAg")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    
    // Se definen las variables de los ejes X y Y
    var parseTime = d3.timeParse("%Y");
    
    // Valores para Columna agrupada
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    var y = d3.scaleLinear().rangeRound([height, 0]);
    
    // Se crea la variable que mostrará el tooltip
    var tooltip = d3.select("body").append("div").attr("class", "toolTip");
    
    var data = JSON.parse(URLJSON);
    
    var chartWidth=960, chartHeight=500;
    var clientWidth=960, clientHeight=500;
        
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

        //width = document.querySelector(".divGrafica").clientWidth;
        //height = document.querySelector(".divGrafica").clientHeight;
        
        width = clientWidth;
        height = clientHeight;

        margin = {top:0, left:50, bottom:40, right:30 };
        
        
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
//    var svg = d3.select("svg"),
//        margin = {top: 20, right: 20, bottom: 30, left: 50},
//        width = +svg.attr("width") - margin.left - margin.right,
//        height = +svg.attr("height") - margin.top - margin.bottom,
//        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    var svg = d3.select("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);
        var g = svg.append("g")
        .attr("class","Col")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    
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
    //var data = URLJSON;
    
    console.log(data);
    
    console.log(ejeX);
    console.log(ejeY);
    
        data.forEach(function(d) {
            d[ejeX] = d[ejeX];
            d[ejeY] = +d[ejeY];
            //d['poblacion_con_menos_de_18_anios'] = +d['poblacion_con_menos_de_18_anios'];
            console.log(d[ejeX]);
          });
          x.domain(data.map(function(d) { return d[ejeX]; }));
          y.domain([0, d3.max(data, function(d) { return d[ejeY]; })]);
           // y.nice();

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

function dotplot(URLJSON, ejeX,var1, var2, color){
       
    var hoverLine = true;
    var landscape = true;
    
    d3.select(".hover-line")
    	.on("click", function() {
      	hoverLine = d3.select(this).property("checked");
    	});
    
    d3.select(".sort-by")
    	.on("change", function() {
      	var attribute = d3.select(this).property("value");
      	sortLollipops(attribute, 1);
    	});
    
    var margin = {top: 40, right: 60, bottom: 50, left: 50};
    var width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    var svg = d3.select("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("class","Bre")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    function sortBy(data, attribute, order) {
    	data.sort(function(a, b) {
      	if(a[attribute] < b[attribute]) return -1 * order;
        if(a[attribute] > b[attribute]) return 1 * order;
        return 0;
    	});
    }
    
    // need to rewrite so start, min, lowest are the same
    var classToPos = {
      "lollipop-start": var1,
//      "lollipop-median": "median",
      "lollipop-end": var2
//        "lollipop-start": "poblacion_con_menos_de_18_anios",
////      "lollipop-median": "median",
//      "lollipop-end": "poblacion_de_18_anios_o_mas"
    }
    
    var legendLabels = [
      {label: var1, class: "lollipop-start"}, 
//      {label: "Median", class: "lollipop-median"},
      {label: var2, class: "lollipop-end"}
    ];
    
    var legendX = 120,
    		legendY = -10,
    		spaceBetween = 360,
        titleOffset = -120;
    
   	// code for positioning legend
    var legend = svg.append("g")
    	.attr("transform", "translate(" + [legendX, legendY] + ")");
        
   	legend.append("g")
    	.attr("class", "title")
      .append("text")
    	.attr("x", titleOffset)
      .text("Categoría")
    
    // Try using Susie Lu's d3-legend
    // add circles
//    legend.selectAll("circle")
//    	.data(legendLabels) 
//    .enter().append("circle")
//    	.attr("cx", function(d, i) {
//      	return 0;
//    	})
//    	.attr("cy", function(d, i) {
//      	return spaceBetween * i+10;
//    	})
//    	.attr("r", 8)
//    	.attr("class", function(d) { return d.class });
    
    legend.selectAll("circle")
    	.data(legendLabels) 
    .enter().append("circle")
    	.attr("cx", function(d, i) {
      	return spaceBetween * i;
    	})
    	.attr("cy", -4)
    	.attr("r", 8)
    	.attr("class", function(d) { return d.class });
    
    // add labels
//    legend.append("g")
//      .selectAll("text")
//    	.data(legendLabels)
//    .enter().append("text")
//      .attr("x", function(d, i) {
//      	return 10;
//    	})
//      .attr("y", function(d, i) {
//      	return 23;
//    	})
//    	.text(function(d) { return d.label });
    legend.append("g")
      .selectAll("text")
    	.data(legendLabels)
    .enter().append("text")
      .attr("x", function(d, i) {
      	return spaceBetween * i + 10;
    	})  
    	.text(function(d) { return d.label });
    
    // Append div
    var div = d3.select("body").append("div")
    	.attr("class", "tooltip")
    	.style("opacity", 0);
    
    var posToColour = color;
    
    var y = d3.scaleBand()
    	.range([0, height])
    	.paddingInner(0.5)
    	.paddingOuter(0.7);
    
    var x = d3.scaleLinear()
    	.range([0, width]);
    
    var lineGenerator = d3.line();
    
    var axisLinePath = function(d) {
      //return lineGenerator([[x(d) + 0.5, 0], [x(d) + 0.5, height]]);
        return lineGenerator([[x(d) + 0.5, 0], [x(d) + 0.5, height]]);
    };
    
   	var lollipopLinePath = function(d) {
      return lineGenerator([[x(d[var1]), 0], [x(d[var2]), 0]]);
    };
    
    var selectionLine,
        lollipops,
        yAxis,
        yAxisGroup,
        xAxis,
        xAxisGroup,
        axisLines,
        lollipopsGroup;    
    
    var startCircles,
//        medianCircles,
        endCircles;
    
    // Make global for now
    var payRatios;
    
    //var url = "https://raw.githubusercontent.com/tlfrd/pay-ratios/master/data/payratio.json";
    //var url = URLJSON;
    
//    d3.json(url, function(error, data) {
//      if (error) throw error;
    
      var data = JSON.parse(URLJSON);
      payRatios = data;
    
    console.log(payRatios);
      
      // use -1 to flip ordering
    	sortBy(payRatios, "Periodo", 1);
      
      y.domain(payRatios.map(function(d) { return d[ejeX] }));
    
    var okl = d3.max(payRatios, function(d) { return d[var1] });
    var okl2 = d3.max(payRatios, function(d) { return d[var2] });
    
    var okll = d3.min(payRatios, function(d) { return d[var1] });
    var okll2 = d3.min(payRatios, function(d) { return d[var2] });
    
    var xMax, xMin;
    
    if(okl < okl2){
        xMax = okl2;
    }else{
        xMax = okl;
    }
    
    if(okll < okll2){
        xMin = okll;
    }else{
        xMin = okll2;
    }

        x.domain([xMin, xMax]);
      //x.domain([0, d3.max(payRatios, function(d) { return d[var1] })]);
      x.nice();
      
      yAxis = d3.axisLeft().scale(y)
    		.tickSize(0);
    
      xAxis = d3.axisBottom().scale(x)
        .tickFormat(function(d,i) {
          if (i == 0) {
            return xMin;
          } else {
            return d3.format(".2s")(d); 
          }
        });
    
    // Add the x Axis
//    xAxis = svg.append("g")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom().scale(x));
    
      yAxisGroup = svg.append("g")
      	.attr("class", "y-axis-group");
      
      yAxisGroup.append("g")
        .attr("class", "y-axis")
      	.attr("transform", "translate(-20, 0)")
        .call(yAxis)
				.select(".domain")
        .attr("opacity", 0);
      xAxisGroup = svg.append("g")
        .attr("class", "x-axis-group");
      
      xAxisGroup.append("g")
      	.attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
      axisLines = svg.append("g")
      	.attr("class", "grid-lines");
      
    	axisLines.selectAll("path")
        .data(x.ticks())
      .enter().append("path")
        .attr("class", "grid-line")
        .attr("d", axisLinePath);
    
      selectionLine = xAxisGroup.append("g")
      	.attr("class", "interactive")
        .append("path")
        .attr("class", "selection-line")
        .attr("d", function() {
          return lineGenerator([[width / 2, 0],[width / 2, height]])
        })
        .attr("opacity", 0);
      
      lollipopsGroup = svg.append("g").attr("class", "lollipops");
    
     	lollipops = lollipopsGroup.selectAll("g")
        .data(payRatios)
      .enter().append("g")
        .attr("class", "lollipop")
        .attr("transform", function(d) {
          return "translate(0," + (y(d[ejeX]) + (y.bandwidth() / 2)) + ")";
        })
      lollipops.append("path")
        .attr("class", "lollipop-line")
        .attr("d", lollipopLinePath);
      
      startCircles = lollipops.append("circle")
    	.attr("class", "lollipop-start")
    	.attr("r", 8)
      .attr("cx", function(d) { 
      	return x(d[var1]); 
    	})
    	.on("mouseover", showLabel)
    	.on("mousemove", moveLabel)
      .on("mouseout", hideLabel);
    
//      medianCircles = lollipops.append("circle")
//        .attr("class", "lollipop-median")
//        .attr("r", function(d) {
//          if (d.median === "N/A") {
//            return 0;
//          } else {
//            return 5;
//          }
//        })
//        .attr("cx", function(d) { 
//          if (d.median === "N/A") {
//            return 0;
//          } else {
//            return x(d.median); 
//          }
//        })
//        .on("mouseover", showLabel)
//        .on("mousemove", moveLabel)
//        .on("mouseout", hideLabel);
      endCircles = lollipops.append("circle")
        .attr("class", "lollipop-end")
        .attr("r", 8)
        .attr("cx", function(d) { 
          return x(d[var2]); 
        })
        .on("mouseover", showLabel)
        .on("mousemove", moveLabel)
        .on("mouseout", hideLabel);
//      
		//});
       
    function showLabel() {
       	var selection = d3.select(this);
        var pos = classToPos[selection.attr("class")];
        var data = d3.select(this.parentNode).datum();
      
        div.transition()
        	.duration(100)
        	.style("opacity", 0.9)
        div.html("" + (selection.datum()[pos]))	
          .style("left", (d3.event.pageX - 30) + "px")		
          .style("top", (d3.event.pageY - 40) + "px")
        	.style("background-color", posToColour[pos])
     
      	if (hoverLine) {
          selectionLine
          	.attr("d", function() {
            	if (landscape) {
                return lineGenerator([[x(data[pos]), 0], [x(data[pos]), height]]);
              } else {
                return lineGenerator([[0, x(data[pos])], [width, x(data[pos])]]);
              }
            	
          	})
          	.attr("opacity", 0.75);
        }
    }
    
    function moveLabel() {
      div.style("left", (d3.event.pageX - 30) + "px")		
        .style("top", (d3.event.pageY - 40) + "px")
    }
    
    function hideLabel() {      
      div.transition()		
        .duration(200)		
        .style("opacity", 0);	
      
     	selectionLine
      	.attr("opacity", 0);
    }
    
    function sortLollipops(attribute, ordering) {
      sortBy(payRatios, attribute, 1);
      
			y.domain(payRatios.map(function(d) { return d[ejeX] })).copy();
      
      if (landscape) {
        lollipops
          .transition()
          .attr("transform", function(d) {
            return "translate(" + [0, (y(d[ejeX]) + y.bandwidth() / 2)] + ")";
          });
        
        yAxisGroup.select(".y-axis")
          .transition()
          .call(yAxis);
      } else {
         lollipops
          .transition()
          .attr("transform", function(d) {
            return "translate(" + [(y(d[ejeX]) + y.bandwidth() / 2), 0] + ")";
          });
        
         xAxisGroup.select(".x-axis")
          .transition()
          .call(yAxis);
      }
      
  
    }
    
    //d3.select("svg").on("click", switchBetweenPortraitAndLandscape);
    
    function recalculateMargin(newMargin) {
      width = 960 - newMargin.left - newMargin.right;
      height = 500 - newMargin.top - newMargin.bottom;
      
     	d3.select("svg").select("g")
      	.attr("transform", "translate(" + newMargin.left + "," + newMargin.top + ")")
    }
    
    function switchBetweenPortraitAndLandscape() {
     
      if (landscape) {
        landscape = false;
        
        recalculateMargin({top: 100, right: 100, bottom: 100, left: 100})
        
        // Redraw xAxis
        x.range([height, 0]);
        
      	xAxis = d3.axisLeft().scale(x)
          .tickFormat(function(d, i) {
            if (i == 0) {
              return "0"
            } else {
              return d3.format(".2s")(d); 
            }
          });
      	
      	yAxisGroup.select(".y-axis")
          .call(xAxis)
        	.attr("transform", "translate(0, 0)")
          .select(".domain")
          	.attr("opacity", 1);
        
        // Redraw yAxis
       	y.range([0, width]);
        
        yAxis = d3.axisBottom().scale(y)
    			.tickSize(0);
        
        xAxisGroup.select(".x-axis")
          .call(yAxis)
        	.attr("transform", "translate(0," + height + ")")
          .select(".domain")
          	.attr("opacity", 0);
        
        xAxisGroup.select(".x-axis").selectAll("text")
          .attr("y", 9)
          .attr("x", 9)
          .attr("transform", "rotate(45)")
          .style("text-anchor", "start");
        
        // Redraw lollipops
        
				lollipops.attr("transform", function(d) {
          return "translate(" + [(y(d[ejeX]) + (y.bandwidth() / 2)), 0] + ")";
        });
        
        lollipops.select(".lollipop-line")
        	.attr("d", function(d) {
          	return lineGenerator([[0, x(d[var1])], [0, x(d[var2])]]);
        	})
        lollipops.select(".lollipop-start")
        	.attr("cy", function(d) {
          	return x(d[var1]);
        	})
        	.attr("cx", 0);
//        lollipops.select(".lollipop-median")
//          .attr("cy", function(d) {
//            if (d.median === "N/A") {
//              return 0;
//            } else {
//              return x(d.median); 
//            }
//        	})
//        	.attr("cx", 0);
        lollipops.select(".lollipop-end")
          .attr("cy", function(d) {
          	return x(d[var2]);
        	})
        	.attr("cx", 0);
        
        // Redraw grid lines
        
        axisLines.selectAll(".grid-line")
        	.attr("d", function(d) {
          	return lineGenerator([[0, x(d) + 0.5], [width, x(d) + 0.5]]);
        	});
        
        // Move legend
        
        legend.attr("transform", "translate(" + [legendX + 40, legendY] + ")");
        
      } else {
        
        landscape = true;
        
        recalculateMargin(margin);
        
       	// Redraw xAxis
        x.range([0, width]);
        
      	xAxis = d3.axisTop().scale(x)
          .tickFormat(function(d, i) {
            if (i == 0) {
              return "0"
            } else {
              return d3.format(".2s")(d); 
            }
          });
      
      	xAxisGroup.select(".x-axis")
          .call(xAxis)
        	.attr("transform", "translate(0,0)")
        	.select(".domain")
          	.attr("opacity", 1);
        
        // Redraw yAxis
       	y.range([0, height]);
        
        yAxis = d3.axisLeft().scale(y)
    			.tickSize(0);
        
        yAxisGroup.select(".y-axis")
          .call(yAxis)
        	.attr("transform", "translate(-20, 0)")
          .select(".domain")
          	.attr("opacity", 0);
        
        // Redraw lollipops
        
        lollipops.attr("transform", function(d) {
          return "translate(0," + (y(d[ejeX]) + (y.bandwidth() / 2)) + ")";
        });
        
        lollipops.select(".lollipop-line")
        	.attr("d", function(d) {
          	return lineGenerator([[x(d[var1]), 0], [x(d[var2]), 0]]);
        	})
        lollipops.select(".lollipop-start")
        	.attr("cx", function(d) {
          	return x(d[var1]);
        	})
        	.attr("cy", 0);
//        lollipops.select(".lollipop-median")
//          .attr("cx", function(d) {
//            if (d.median === "N/A") {
//              return 0;
//            } else {
//              return x(d.median); 
//            }
//        	})
//        	.attr("cy", 0);
        lollipops.select(".lollipop-end")
          .attr("cx", function(d) {
          	return x(d[var2]);
        	})
        	.attr("cy", 0);
        
        // Redraw grid lines
        
        axisLines.selectAll(".grid-line")
        	.attr("d", axisLinePath);
        
        // Reposition legend
        
        legend.attr("transform", "translate(" + [legendX, legendY] + ")");
        
      }
    }  
}

function mapa(){
    
}
