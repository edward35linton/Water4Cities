
//var width=800;
//var mainMapHeight=400;
var mainMapHeight=800;

var mainMapWidth = +d3.select("#map").style('width').slice(0, -2)
var areaMap = d3.select("#map").append("svg").attr("width",mainMapWidth).attr("height",mainMapHeight);

//width = +areaMap.attr("width"),
//height = +areaMap.attr("height");

//var region = "europe"; // can be world or europe.
//var legendtranslate = "translate(1000,800)"; // positioning the legend


var projection = d3.geoPeirceQuincuncial()
        .scale(12500)
        .translate([-1.2*mainMapWidth, -9.5*mainMapHeight])
        .precision(0.1);

var path = d3.geoPath()
.projection(projection);

var scaler = 2;

Promise.all([
d3.json('data/maps/W4C.geojson'),
//d3.json('data/maps/W4C_Region.geojson')
//d3.json('data/maps/EUP_pilot.geojson'),
//d3.json('data/maps/Municip.geojson'),
//d3.json('data/maps/Region.geojson')
//]).then(([Country,EUP_pilot,Municip,Region]) => {
]).then(([W4C]) => {
      areaMap.append("g")
        .attr("class", "country")
        .selectAll("path")
        .data(W4C.features)
        .enter().append("path")
        .attr("d", path);
      
        // areaMap.append("g")
        // .attr("class", "country")
        // .selectAll("path")
        // .data(W4C_Region.features)
        // .enter().append("path")
        // .attr("d", path);

//      areaMap.append("g")
//         .attr("class", "country")
//         .selectAll("path")
//         .data(Municip.features)
//         .enter().append("path")
//         .attr("d", path);

//     areaMap.append("g")
//          .attr("class", "eup")
//          .selectAll("path")
//          .data(EUP_pilot.features)
//          .enter().append("path")
//         .attr("d", path);
// ;
// svg.append("g")
//         .attr("class", "citiesall")
//     .selectAll("circle")
//         .data(citiesall.features.sort(function(a, b) { return b.properties.count - a.properties.count; }))
//         .enter().append("circle")
//         .attr("cx", function (d) { return projection(d.geometry.coordinates)[0]; })
//         .attr("cy", function (d) { return projection(d.geometry.coordinates)[1]; })
//         .attr("r", function (d) { return Math.sqrt(d.properties.count) /scaler; })
// ;
// svg.append("g")
//         .attr("class", "citiesselected")
//     .selectAll("circle")
//         .data(citiesselected.features.sort(function(a, b) { return b.properties.count - a.properties.count; }))
//         .enter().append("circle")
//         .attr("cx", function (d) { return projection(d.geometry.coordinates)[0]; })
//         .attr("cy", function (d) { return projection(d.geometry.coordinates)[1]; })
//         .attr("r", function (d) { return Math.sqrt(d.properties.count) / scaler; })
// ;  

// // add a legend -----
// // add maximum circle sizes
// maxcitall = citiesall.features.sort(function(a, b) { return b.properties.count - a.properties.count; })[0].properties.count;
// maxcitsel = citiesselected.features.sort(function(a, b) { return b.properties.count - a.properties.count; })[0].properties.count;
// rmaxcitall = Math.sqrt(maxcitall)/scaler; // prepare circle radidus
// rmaxcitsel = Math.sqrt(maxcitsel)/scaler;
// var legend = svg.append("g").attr("class","legend").attr("transform",legendtranslate);
// legend.append("circle").attr("class","citiesall").attr("r",rmaxcitall); // the center of this one one serves as a reference point for the other elements.  This center is at position 0,0 with respect to the g element, which we have translated
// legend.append("circle").attr("class","citiesall").attr("r",Math.sqrt(1000)/scaler)
//     .attr("cy",-(rmaxcitall-Math.sqrt(1000)/scaler))
// ;
// legend.append("text").text("number of sent reports per city")
//     .attr("class","legendtitle")
//     .attr("x",-rmaxcitall)
//     .attr("y",-rmaxcitall-36)
// ;
// legend.append("text").text("All languages")
//     .attr("x",-rmaxcitall)
//     .attr("y",-rmaxcitall-12)
// ;
// legend.append("text").text("French")
//     .attr("x",-(rmaxcitsel) + 200)
//     .attr("y",-rmaxcitall-12)
// ;
// legend.append("circle").attr("class","citiesselected").attr("r",rmaxcitsel)
//     .attr("cx",200) 
//     .attr("cy",-(rmaxcitall-rmaxcitsel))
// ;
// legend.append("circle").attr("class","citiesselected").attr("r",Math.sqrt(1000)/scaler)
//     .attr("cx",200) 
//     .attr("cy",-(rmaxcitall-Math.sqrt(1000)/scaler))
// ; 

// legend.append("text").text("1000").attr("class","legendscale")
//     .attr("x",rmaxcitall+35)
//     .attr("y",-rmaxcitall+ Math.sqrt(1000)/scaler*2) // *2 because interested in diameter not radius, here
// ;
// legend.append("text").text(maxcitsel).attr("class","legendscale")
//     .attr("x",rmaxcitall+35)
//     .attr("y",-rmaxcitall+rmaxcitsel*2) 
// ;
// legend.append("text").text(maxcitall).attr("class","legendscale")
//     .attr("x",rmaxcitall+35)
//     .attr("y",rmaxcitall)
// ;
});