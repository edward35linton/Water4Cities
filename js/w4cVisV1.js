var featureBounds,
    geoParent,
    geo,
    geoLayer = {},
    slast,
    tlast,
    active;

var width = 598,
    height = 580;

var projection = d3.geo.mercator()
    .scale(1000)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);


var zoom = d3.behavior.zoom()
    .translate([0, 0])
    .scale(1)
    .center([width / 2, height / 2])
    .scaleExtent([1, 8])
    .on("zoom", zoomed);



//var mapControls = d3.selectAll('#vis > svg'); // check select
var mapControls = d3.select("#vis").append('div').attr('id', 'controls');

var zoomOut = mapControls.append('button').text('-').attr('id', 'zoom_out');
var zoomIn =  mapControls.append('button').text('+').attr('id', 'zoom_in');


var svg = d3.select("#vis").append("svg")
    .attr("width", width)
    .attr("height", height);

var table1 = d3.select("#boxplots").append("table");


var colorO = d3.scale.ordinal().range(['#15ADD9', '#E8DDBD', '#B9DCF2', '#2D929C', '#69B6B2', '#A29468', '#72C3F4', '#7e7b59']);
        // ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]);
        // ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"]
var titles = [ "Total Fish", "Piscivores", "Planktivaores", "Primary", "Secondary" ];


var t = projection.translate(); // the projection's default translation
var s = projection.scale(); // the projection's default scale

params = ['.TotFish', '.PISCIVORE', '.PLANKTIVORE', '.PRIMARY', '.SECONDARY']; //, '.UNKNOWN'];



   



var axes = svg.append('svg:g').attr('id', 'axes');


var xAxis = axes.append('svg:line')
    .attr('x1', t[0])
    .attr('y1', 0)
    .attr('x2', t[0])
    .attr('y2', height);

var yAxis = axes.append('svg:line')
    .attr('x1', 0)
    .attr('y1', t[1])
    .attr('x2', width)
    .attr('y2', t[1]);


// Starting condition - better way?
//displayRegionData("MHI", "Mean.TotFish");


// Call things - fix callbacks
// function displayRegionData (region, metric) {

//     focusIsland(region);
//     barChart(region, metric);
//     //lineGraph();
//     //focusIsland('MARIANA ARCHIPELAGO');
//     //            arrangeLabels();
// }



function getFeaturesBox() {
    return {
        x: featureBounds[0][0],
        y: featureBounds[0][1],
        width: featureBounds[1][0] - featureBounds[0][0],
        height: featureBounds[1][1] - featureBounds[0][1]
    };
}

// fits the geometry layer inside the viewport
function fitGeoInside() {
    var bbox = getFeaturesBox(),
        scale = 0.95 / Math.max(bbox.width / width, bbox.height / height),
        trans = [-(bbox.x + bbox.width / 2) * scale + width / 2, -(bbox.y + bbox.height / 2) * scale + height / 2];

    geoLayer.scale = scale;
    geoLayer.translate = trans;

    geo.attr('transform', [
        'translate(' + geoLayer.translate + ')',
        'scale(' + geoLayer.scale + ')'
    ].join(' '));

    postTransformOperations(geoLayer.scale);
}

// transform geoParent
function setGeoTransform(scale, trans) {
    zoom.scale(scale)
        .translate(trans);

    tlast = trans;
    slast = scale;

    geoParent.attr('transform', [
        'translate(' + trans + ')',
        'scale(' + scale + ')'
    ].join(' '));

    postTransformOperations(scale * geoLayer.scale);

}

// scale strokes for fussy browsers
function postTransformOperations(scale) {
    geo.selectAll('path')
        .style('stroke-width', 1 / scale);
}

// limits panning
// XXX: this could be better
function limitBounds(scale, trans) {

    var bbox = getFeaturesBox();
    var outer = width - width * scale;
    var geoWidth = bbox.width * geoLayer.scale * scale,
        geoLeft = -((width * scale) / 2 - ((geoWidth) / 2)),
        geoRight = outer - geoLeft;


    if (scale === slast) {
        //trans[0] = Math.min(0, Math.max(trans[0], width - width * scale));
        trans[1] = Math.min(0, Math.max(trans[1], height - height * scale));

        if (geoWidth > width) {
            if (trans[0] < tlast[0]) { // panning left
                trans[0] = Math.max(trans[0], geoRight);
            } else if (trans[0] > tlast[0]) { // panning right
                trans[0] = Math.min(trans[0], geoLeft);
            }
        } else {

            if (trans[0] < geoLeft) {
                trans[0] = geoLeft;
            } else if (trans[0] > geoRight) {
                trans[0] = geoRight;
            }
        }
    }

    setGeoTransform(scale, trans);
}

// zoom behavior on 'zoom' handler
function zoomed() {
    var e = d3.event,
        scale = (e && e.scale) ? e.scale : zoom.scale(),
        trans = (e && e.translate) ? e.translate : zoom.translate();

    limitBounds(scale, trans);
}




// set the map's initial state
// geoParent layer to scale 1
// geo layer is scaled to fit viewport
function initialize() {
    tlast = null;
    slast = null;
    setGeoTransform(1, [0, 0]);
    fitGeoInside();
}

// load topojson & make map



function focusIsland(complex) {

    //console.log("Centering around " + complex + "...");

    //d3.selectAll("path").remove();
    //d3.selectAll(".islandLabels").remove();
    d3.selectAll("g.parent").remove();

    d3.json("data/maps/W4C.geojson", function(error, topology) {
        if (error) return;

        //var features = topojson.feature(topology, topology.objects['us-states']).features;

        var features = topology.features.filter(function(d) {
            return d.properties.UNIT == complex;
        });



        var collection = {
            'type': 'FeatureCollection',
            'features': features
        };

        featureBounds = path.bounds(collection);

        geoParent = svg.append("g").attr('class', 'parent');

        geoParent
            .append('rect')
            .attr('class', 'bg')
            .attr('pointer-events', 'all')
            .attr('fill', 'none')
            .attr('width', width)
            .attr('height', height)
            .call(zoom);;


        geo = geoParent.append("g");
        geo.selectAll('feature')
            .data(features)
            .enter()
            .append("path")
            .attr("class", "feature")
            .style("fill", function (d) { return colorO(d.properties.ISLAND)})
            .attr("d", path)
            //.attr('class', 'island') 
            .attr('cursor', 'pointer')
            .attr('id', function(d) {
                return d.properties.ISLAND;
            })
            .on('mouseover', function(d) {
                d3.select(this).style('fill', '#bdc9e1');
            })
            .on('mouseout', function(d) {
                d3.select(this).style('fill', function(d) { return colorO(d.properties.ISLAND)});
            })
            .on('click', clicked);

        // svg.append("rect")
        //   .attr("class", "overlay")
        //   .attr("width", width)
        //   .attr("height", height)
        //   .attr('pointer-events', 'auto')
        //   .call(zoom);

        initialize();

        // d3.selectAll('.islandLabels').remove();

        geo.selectAll('.islandLabels')
            .data(features)
            .enter().append('text')
            .attr('class', 'islandLabels')
            //.attr('x', function(d) { 
            .attr('transform', function(d) {
                // console.log("Translate(" + path.centroid(d) + '), scale(' + (1 / geoLayer.scale) + ')' + " for " + d.properties.ISLAND + ")");

                return 'translate(' + path.centroid(d) + '), scale(' + (1 / geoLayer.scale) + ')';
            })
            //   return projection(path.centroid(d))[0];})
            // .attr('y', function(d){
            //   return projection(path.centroid(d))[1];})  
            .text(function(d) {
                return d.properties.ISLAND;
            });

        arrangeLabels();

        d3.selectAll('button').on('click', zoomClick);
    });
}


function addButtons() {
   
    console.log("adding buttons...");

    var mapControls = d3.selectAll('#vis > svg'); // check select

    var zoomOut = mapControls.append('button').text('-').attr('id', 'zoom_out');
    var zoomIn =  mapControls.append('button').text('+').attr('id', 'zoom_in');
}



function arrangeLabels() {
    var move = 1;
    while (move > 0) {
        move = 0;
        svg.selectAll('.islandLabels')
            .each(function() {
                var that = this,
                    a = this.getBoundingClientRect();
                svg.selectAll('.islandLabels')
                    .each(function() {
                        if (this != that) {
                            var b = this.getBoundingClientRect();
                            if ((Math.abs(a.left - b.left) * 2 < (a.width + b.width)) &&
                                (Math.abs(a.top - b.top) * 2 < (a.height + b.height))) {
                                // overlap, move labels
                                var dx = (Math.max(0, a.right - b.left) +
                                        Math.min(0, a.left - b.right)) * 0.01,
                                    dy = (Math.max(0, a.bottom - b.top) +
                                        Math.min(0, a.top - b.bottom)) * 0.02,
                                    tt = d3.transform(d3.select(this).attr('transform')),
                                    to = d3.transform(d3.select(that).attr('transform'));
                                move += Math.abs(dx) + Math.abs(dy);

                                to.translate = [to.translate[0] + dx, to.translate[1] + dy];
                                tt.translate = [tt.translate[0] - dx, tt.translate[1] - dy];
                                var pd = false,
                                    pt = d3.select(this).attr('transform');
                                if (pt.indexOf('),') != -1)
                                    pd = pt.substring(pt.indexOf('),') + 1);

                                else
                                    console.log(this.properties.ISLAND, pt);

                                // d3.select(this).attr('transform', 'translate(' + tt.translate + ')');
                                d3.select(that).attr('transform', 'translate(' + to.translate + ')' + (pd ? pd : ''));
                                a = this.getBoundingClientRect();
                            }
                        }
                    });
            });
    }
}


function clicked(d) {
    //tabled(d);
    //barChart(d);
    //timeLine(d);
    //lineGraph(d);
}



function tabled(d) {

    d3.csv("data/dp.csv", function(data) {

        var myData = data;
        var table = document.getElementById("displayTable"); //give this ID to your table

        for (var i = 0; i < data.length; i++) {

            if (data[i]['Mean.ISLAND'].toUpperCase() == d.properties.ISLAND) {
                while (table.firstChild) {
                    table.removeChild(table.firstChild);
                }

                var mySelection = data[i];

                var pooledData = [];
                var meanData = [];

                for (var key in mySelection) {

                    var value = mySelection[key];

                    if (key.includes("Pooled")) {
                        pooledData.push({
                            key,
                            value
                        });
                    } else if (key.includes("Mean")) {
                        meanData.push({
                            key,
                            value
                        });
                    } else {}

                }

            }

        }

        arrayLength = Math.max(pooledData.length, meanData.length);

        for (k = 0; k < arrayLength; k++) {

            var tr = document.createElement('tr');
            var tda = tr.appendChild(document.createElement('td'));
            var tdb = tr.appendChild(document.createElement('td'));
            var tdc = tr.appendChild(document.createElement('td'));
            var tdd = tr.appendChild(document.createElement('td'));

            if (meanData[k].key.includes("TOT_AREA_WT")) {

                tda.innerHTML = meanData[k].key.replace('Mean.', '');
                tdb.innerHTML = meanData[k].value;
                tdc.innerHTML = "";
                tdd.innerHTML = "";
                break;
            }

            tda.innerHTML = meanData[k].key.replace('Mean.', '');
            tdb.innerHTML = meanData[k].value;
            tdc.innerHTML = "" //pooledData[k].key.replace('PooledSE.','');
            tdd.innerHTML = pooledData[k].value;

            table.appendChild(tr);

        }

        //clickedGraph(d);

        //var boxplot = document.getElementById("boxplots"); //give this ID to your tabl
    });
}

function timeLine(region, fishType) {
    var margin = {
            top: 30,
            right: 10,
            bottom: 20,
            left: 50
        },
        width = 598,
        height = 298;

    d3.select("#linegraph").selectAll("svg").remove();

    d3.csv("data/dptime.csv", function(data) {
        data = data.filter(function (d) { return d["REGION"] === region});
        if (data.length < 1)
            return;

        var years = data.map(function(d) {return d["ANALYSIS_YEAR"];});
        years = years.filter(function(elem, pos) {return years.indexOf(elem) == pos;});

        var islands = data.map(function(d) {return d["ISLAND"];});
        islands = islands.filter(function(elem, pos) {return islands.indexOf(elem) == pos;}).sort();

        colorO.domain(islands);

        var yScale = d3.scale.  linear()
                       .range([height - margin.top - margin.bottom, 0]);

        var xScale = d3.scale.ordinal()
                       .rangeRoundBands([0, width - margin.right - margin.left], .1);
        xScale.domain(years);

        var xScale1 = d3.scale.ordinal();
        xScale1.domain(islands).rangeRoundBands([0, xScale.rangeBand()]);

        // Calculate Totals (should be the highest point).
        totals = [];
        yearData = [];
        var nested = d3.nest()
            .key(function(d) { return d.ANALYSIS_YEAR })
            .key(function(d) { return d.ISLAND })
            .sortKeys(d3.ascending)
            .entries(data);

        nested.forEach(function(year) {
            islands.forEach(function(island, index) {
                if (year.values[index].key !== island) {
                    newObj = {
                        "key": island,
                        "values": []
                    };
                    subObj = {};
                    params.forEach(function(measure) {
                        if (measure === ".TotFish")
                            subObj["TotFish"] = 0;
                        else {
                            subObj["Mean" + measure] = 0;
                            subObj["PooledSE" + measure] = 0;
                        }
                    });
                    newObj.values.push(subObj);
                    year.values.splice(index, 0, newObj);
                }
            });
        });

        if (fishType === 'Mean.TotFish')
            fishType = "TotFish";

        for (var i = 0; i < years.length; i++) {
            cumTotal = 0;
            for (var j = 0; j < islands.length; j++) {
                thisD = data.filter(function (d) {
                            return d["ANALYSIS_YEAR"] == years[i] && d["ISLAND"] == islands[j];
                        });
                if (thisD.length > 0)
                    cumTotal += +thisD[0][fishType];
            }
            totals.push({
                "year": years[i],
                "value": cumTotal});
        }

        yScale.domain([0, d3.max(totals, function(d) { return d.value })]);





        var xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient("bottom");

        var yAxis = d3.svg.axis()
                      .scale(yScale)
                      .orient("left");

        var svg = d3.select('#linegraph').append("svg")
                        .attr("viewBox", "0 0 " + width + " " + height);
                        //.append("g")
                        //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", (12))
            .attr("text-anchor", "middle") 
            .attr("class", "visTitle") 
            .text("Fish-type per Island over time");


        svg.selectAll("line.horizontalGrid").data(yScale.ticks(10)).enter()
            .append("line")
            .attr(
            {
                "class":"horizontalGrid",
                "x1" : margin.left,
                "x2" : width-margin.right,
                "y1" : function(d){ return yScale(d)+30;},
                "y2" : function(d){ return yScale(d)+30;},
                "fill" : "none",
                "shape-rendering" : "crispEdges",
                "stroke" : "#666565",
                "stroke-width" : "1px"
            });

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call(yAxis);

        ts = svg.append("g")
            .attr("class", "y axisL")
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("x", -120)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .append("tspan")
                    .text("Fish biomass (gm");

        ts.append("tspan")
            .attr("baseline-shift", "super")
            .style("font-size", "6pt")
            .attr("dy", "-0.5em")
            .text("-2");
        ts.append("tspan")
            .text(")")
            .attr("dy", "0.31em")

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
            .call(xAxis);

        g = svg.append("g")
            .attr("id", "groupedbar")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        g.selectAll("g").data(nested)
              .enter()
                  .append("g")
                  .attr("id", function(d) { return d.key })
                  .attr("transform", function(d) { return "translate("+ xScale(d.key) + ", 0)"})
                  .selectAll(".bar")
                    .data(function(d) {
                       return d.values;
                       })
                    .enter()
                        .append("rect")
                        .attr("class", "bar")
                        .style("fill", function(d) { return colorO(d.key) })
                        .style("stroke", "none")
                        .attr("x", function(d) {
                            return xScale1(d.key);
                        })
                        .attr("y", function(d) {
                            return yScale(d.values[0][fishType]);
                        })
                        .attr("height", function(d) {
                            return height - margin.top - margin.bottom - yScale(d.values[0][fishType]);
                        })
                        .attr("width", function(d) {
                            return xScale1.rangeBand();
                        });
        if (fishType !== "TotFish") {
            half = (xScale1.rangeBand() / 2);
            quart = half / 2;
            seFishType = "PooledSE" + fishType.substring(fishType.indexOf('.'));
            g = svg.append("g")
                .attr("id", "gbarerrors")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            items = g.selectAll("g").data(nested)
              .enter()
                  .append("g")
                  .attr("transform", function(d) { return "translate("+ xScale(d.key) + ", 0)"})
                  .selectAll(".bar")
                    .data(function(d) {
                       return d.values;
                       })
                    .enter();

            items.append("line")
                        .attr("class", "error-line")
                        .attr("x1", function(d) {
                            return xScale1(d.key) + half;
                        })
                        .attr("y1", function(d) {
                            return yScale((+d.values[0][fishType]) + (+d.values[0][seFishType]));
                        })
                        .attr("x2", function(d) {
                            return xScale1(d.key) + half;
                        })
                        .attr("y2", function(d) {
                            return yScale((+d.values[0][fishType]) - (+d.values[0][seFishType]));
                        })
            items.append("line")
                        .attr("class", "error-cap")
                        .attr("x1", function(d) {
                            return xScale1(d.key) + quart;
                        })
                        .attr("y1", function(d) {
                            return yScale((+d.values[0][fishType]) + (+d.values[0][seFishType]));
                        })
                        .attr("x2", function(d) {
                            return xScale1(d.key) + quart + half;
                        })
                        .attr("y2", function(d) {
                            return yScale((+d.values[0][fishType]) + (+d.values[0][seFishType]));
                        });
            items.append("line")
                        .attr("class", "error-cap")
                        .attr("x1", function(d) {
                            return xScale1(d.key) + quart;
                        })
                        .attr("y1", function(d) {
                            return yScale((+d.values[0][fishType]) - (+d.values[0][seFishType]));
                        })
                        .attr("x2", function(d) {
                            return xScale1(d.key) + quart + half;
                        })
                        .attr("y2", function(d) {
                            return yScale((+d.values[0][fishType]) - (+d.values[0][seFishType]));
                        });
        }

        line = d3.svg.line()
          .interpolate("cardinal")
          .x(function (d) {
            return xScale(d.year) + (xScale.rangeBand() / 2); })
          .y(function (d) {
            return yScale(d.value) });
          var g = svg.append("g")
               .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")"
               );
                    g.append("path")
                        .datum(totals)
                                .attr("class", "line")
                                .attr("d", line)
                                .style("stroke", colorO(islands[0]))
                                .style("stroke-width", "2px")
                                .style("fill", "none");

                    g.selectAll("circle")
                        .data(totals)
                        .enter()
                        .append("circle")
                            .attr("class", "point")
                            .attr("cx", function (d){ 
                                return xScale(d.year) + (xScale.rangeBand() / 2); 
                            })
                            .attr("cy", function (d){ return yScale(d.value) })
                            .attr("r", "4px")
                            .style("fill", colorO(islands[0]));
    });
}



// Bar chart with Error Bars
function barChart(region, dataQuantity) {

    //console.log("Graphed!")
    timeLine(region, dataQuantity);

    var margin = {
            top: 30,
            right: 10,
            bottom: 20,
            left: 50
        },
        width = 598,
        height = 298;

    d3.select("#barchart").selectAll("svg").remove();

    var svg = d3.select("#barchart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 " + width + " " + height);



    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (12))
        .attr("text-anchor", "middle") 
        .attr("class", "visTitle") 
        .text("Fish-type Totals - Weighted values (all years)");

    var yScale = d3.scale.linear()
        .range([height - margin.top - margin.bottom, 0]);

    var xScale = d3.scale.ordinal()
        .rangeRoundBands([0, width - margin.right - margin.left], .1);



    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");
        //.tickFormat(d3.format("$,")); //...then add this line, a tickFormat for currency


    d3.csv("data/dp.csv", function(mydata) {

        var data = [];
        for(i =0; i<mydata.length; i++){
                if (mydata[i]["Mean.REGION"] == region){data.push(mydata[i]);} 
            }

        //map function goes through every element, then returns a number for median valie
        // CG 181113 - Normalise scales; START
        var min = 999;
        var max =  -999;
        data = data.map(function(d) {
            params.forEach(function(p) {
                est = +d['Mean' + p];
                err = +d['PooledSE' + p];
                if ((est+err) > max)
                    max = est+err;
                if ((est - err) < min)
                    min = est - err;
            });
            d[dataQuantity] = +d[dataQuantity];
            reading = dataQuantity.substring(dataQuantity.indexOf('.')+1);
            d['Upper'] = d[dataQuantity] + (+d['PooledSE.' + reading]);
            d['Lower'] = d[dataQuantity] - (+d['PooledSE.' + reading]);
            return d;
        });

        //yscale's domain is from zero to the maximum "Median value" in your data
        /*yScale.domain([0, d3.max(data, function(d) {
            return d[dataQuantity];
        })]);*/

        yScale.domain([min, max]);
        // CG 181113 - Normalise scales; END

        islands = data.map(function(d) {
            return d["Mean.ISLAND"];
        });

        //xscale is unique values in your data (e.g. Islands, since they are all different)
        xScale.domain(islands)

        colorO.domain(islands)

        svg.selectAll("line.horizontalGrid").data(yScale.ticks(10)).enter()
        .append("line")
        .attr(
        {
            "class":"horizontalGrid",
            "x1" : margin.left,
            "x2" : width-margin.right,
            "y1" : function(d){ return yScale(d)+30;},
            "y2" : function(d){ return yScale(d)+30;},
            "fill" : "none",
            "shape-rendering" : "crispEdges",
            "stroke" : "#666565",
            "stroke-width" : "1px"
        });

        svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .style("fill", function(d) { return colorO(d["Mean.ISLAND"]) })
            .style("stroke", "none")
            .attr("x", function(d) {
                return xScale(d["Mean.ISLAND"]);
            })
            .attr("y", function(d) {
                return yScale(d[dataQuantity]);
            })
            .attr("height", function(d) {
                return height - margin.top - margin.bottom - yScale(d[dataQuantity]);
            })
            .attr("width", function(d) {
                return xScale.rangeBand();
            });

        // CG 181113 - Error Bars; START
        half = (xScale.rangeBand() / 2);
        quart = half / 2;
        svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .selectAll("line")
            .data(data).enter()
            .append("line")
            .attr("class", "error-line")
            .attr("x1", function(d) {
                return xScale(d["Mean.ISLAND"]) + half;
            })
            .attr("y1", function(d) {
                return yScale(d.Upper);
            })
            .attr("x2", function(d) {
                return xScale(d["Mean.ISLAND"]) + half;
            })
            .attr("y2", function(d) {
                return yScale(d.Lower);
            });
        svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .selectAll("line")
            .data(data).enter()
            .append("line")
            .attr("class", "error-cap")
            .attr("x1", function(d) {
                return xScale(d["Mean.ISLAND"]) + quart;
            })
            .attr("y1", function(d) {
                return yScale(d.Upper);
            })
            .attr("x2", function(d) {
                return xScale(d["Mean.ISLAND"]) + quart + half;
            })
            .attr("y2", function(d) {
                return yScale(d.Upper);
            });
        svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .selectAll("line")
            .data(data).enter()
            .append("line")
            .attr("class", "error-cap")
            .attr("x1", function(d) {
                return xScale(d["Mean.ISLAND"]) + quart;
            })
            .attr("y1", function(d) {
                return yScale(d.Lower);
            })
            .attr("x2", function(d) {
                return xScale(d["Mean.ISLAND"]) + quart + half;
            })
            .attr("y2", function(d) {
                return yScale(d.Lower);
            });
        // CG 181113 - Error Bars; END

        //adding y axis to the left of the chart
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call(yAxis);

        //adding x axis to the bottom of chart
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
            .call(xAxis);

        ts = svg.append("g")
            .attr("class", "y axisL")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("x", -120)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .append("tspan")
                	.text("Fish biomass (gm");
            ts.append("tspan")
                .attr("baseline-shift", "super")
               	.style("font-size", "6pt")
               	.attr("dy", "-0.5em")
               	.text("-2");
            ts.append("tspan")
            	.text(")")
            	.attr("dy", "0.31em")
            //.text(dataQuantity.replace("Mean.",'').toLowerCase());




    });

}


// Original LineGraph Code
function lineGraph(d) {

    var margin = {top: 20, right: 10, bottom: 20, left: 50},
        width = 598 - margin.left - margin.right,
        height = 298 - margin.top  - margin.bottom;

    var x = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
          .rangeRound([height, 0]);

    var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

    var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

    var line = d3.svg.line()
          .interpolate("cardinal")
          .x(function (d) { return x(d.label) + x.rangeBand() / 2; })
          .y(function (d) { return y(d.value); });

    var color = d3.scale.ordinal()
          .range(["#85e085","#ff9966","#ff66cc","#33ccff","#d3c47c"]);

    d3.select("#linegraph").selectAll("svg").remove();

    var svg = d3.select("#linegraph").append("svg")
          .attr("width",  width  + margin.left + margin.right)
          .attr("height", height + margin.top  + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("data/demodata.csv", function (error, data) {

        var labelVar = 'quarter';
        var varNames = d3.keys(data[0]).filter(function (key) { return key !== labelVar;});
        color.domain(varNames);

        var seriesData = varNames.map(function (name) {
          return {
            name: name,
            values: data.map(function (d) {
              return {name: name, label: d[labelVar], value: +d[name]};
            })
          };
        });

        x.domain(data.map(function (d) { return d.quarter; }));
        y.domain([
          d3.min(seriesData, function (c) { 
            return d3.min(c.values, function (d) { return d.value; });
          }),
          d3.max(seriesData, function (c) { 
            return d3.max(c.values, function (d) { return d.value; });
          })
        ]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -45)
            .attr("x", -20)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Number of Rounds");

        var series = svg.selectAll(".series")
            .data(seriesData)
            .enter().append("g")
            .attr("class", "series");

        series.append("path")
          .attr("class", "line")
          .attr("d", function (d) { return line(d.values); })
          .style("stroke", function (d) { return color(d.name); })
          .style("stroke-width", "2px")
          .style("fill", "none")

        series.selectAll(".point")
          .data(function (d) { return d.values; })
          .enter().append("circle")
           .attr("class", "point")
           .attr("cx", function (d) { return x(d.label) + x.rangeBand()/2; })
           .attr("cy", function (d) { return y(d.value); })
           .attr("r", "3px")
           .style("fill", function (d) { return color(d.name); })
           .style("stroke", "grey")
           .style("stroke-width", "1px")
           .on("mouseover", function (d) { showPopover.call(this, d); })
           .on("mouseout",  function (d) { removePopovers(); })

        var legend = svg.selectAll(".legend")
            .data(varNames.slice().reverse())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(55," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 97)
            .attr("width", 6)
            .attr("height", 6)
            .style("fill", color)
            .style("stroke", "grey");

        legend.append("text")
            .attr("x", width - 88)
            .attr("y", 6)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(function (d) { return d; });





         function removePopovers () {
          // $('.popover').each(function() {
          //   $(this).remove();
          // }); 
        }

        function showPopover (d) {
          // $(this).popover({
          //   title: d.name,
          //   placement: 'auto top',
          //   container: '#linegraph',
          //   trigger: 'manual',
          //   html : true,
          //   content: function() { 
          //     return "Quarter: " + d.label + 
          //            "<br/>Rounds: " + d3.format(",")(d.value ? d.value: d.y1 - d.y0); }
          // });
          // $(this).popover('show')
        }
    });

}


function interpolateZoom (translate, scale) {
    var self = this;
    return d3.transition().duration(350).tween("zoom", function () {
        var iTranslate = d3.interpolate(zoom.translate(), translate),
            iScale = d3.interpolate(zoom.scale(), scale);
        return function (t) {
            zoom
                .scale(iScale(t))
                .translate(iTranslate(t));
            zoomed();
        };
    });
}

function zoomClick() {
    var clicked = d3.event.target,
        direction = 1,
        factor = 0.2,
        target_zoom = 1,
        center = [width / 2, height / 2],
        extent = zoom.scaleExtent(),
        translate = zoom.translate(),
        translate0 = [],
        l = [],
        view = {x: translate[0], y: translate[1], k: zoom.scale()};

    d3.event.preventDefault();
    direction = (this.id === 'zoom_in') ? 1 : -1;
    target_zoom = zoom.scale() * (1 + factor * direction);

    if (target_zoom < extent[0] || target_zoom > extent[1]) { return false; }

    translate0 = [(center[0] - view.x) / view.k, (center[1] - view.y) / view.k];
    view.k = target_zoom;
    l = [translate0[0] * view.k + view.x, translate0[1] * view.k + view.y];

    view.x += center[0] - l[0];
    view.y += center[1] - l[1];

    interpolateZoom([view.x, view.y], view.k);
}




