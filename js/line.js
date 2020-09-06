// //Define margins
var margin = { top: 0, right: 50, bottom: 50, left: 0 };

//Defines the height and width as well as the lineGraph object
var height= 250;
var width = +d3.select("#lineChart").style('width').slice(0, -2);
var lineGraph = d3.select("#lineChart").append("svg").attr("width",width).attr("height",height);

//Calls the line function
line();

function line(){
  // Define scales and colours
  var xScale = d3.scaleLinear()
      .domain([0, 100])         
      .range([0, width]); 
  var yScale = d3.scaleLinear()
      .domain([0, 50])
      .range([height, 0]);
  var color = d3.scaleOrdinal().range(d3.schemeCategory10);

  //Sets the csv file to whatever the current rain station is
  var rain_station = document.getElementById("station").innerHTML;
  if (rain_station === ""){
    rain_station = "Ljubljana Be_igrad";
  }

    //Adds the x axis
    lineGraph
      .append("g")
      .attr("transform", "translate(5, 245)")
      .attr('class','xScale')
      .call(d3.axisBottom(xScale));

    //Adds the y axis
    lineGraph
      .append("g")
      .attr("transform", "translate(5, 0)")
      .attr('class','yScale')
      .call(d3.axisLeft(yScale));

  
  //Read the data
  d3.csv("data/" + rain_station + "_Rain_data.csv").then(function(data) {
    
    //Defines column_name and i for the for loop, sets up the colour array
    var column_name;
    var colours = ['blue','red','green','orange','purple','steelblue','brown'];
    var i;

    //Runs a for loop to draw all the data points onto the graph
    for (i = 1; i < 8; i++){

      //Sets the column_name variable to the current data set
      switch(i){
        case 1:
          column_name = 'data.year_2';
          break;
        case 2:
          column_name = 'data.year_5';
          break;
        case 3:
          column_name = 'data.year_10';
          break
        case 4:
          column_name = 'data.year_25';
          break;
        case 5:
          column_name = 'data.year_50';
          break;
        case 6:
          column_name = 'data.year_100';
          break;
        case 7:
          column_name = 'data.year_250';
          break;
        default:
          break;
      }

      // Adds the line to the graph
      lineGraph
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", colours[i-1])
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(data) { return data.duration_min})
          .y(function(data) { return height-eval(column_name)})
          )
    }
  });
}
