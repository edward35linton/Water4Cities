//Sets up the treemap container with the correct heights and widths
var treeMapHeight=400;
var treeContainerWidth = +d3.select("#treemap").style('width').slice(0, -2)
var treeMap = d3.select("#treemap").append("svg").attr("width",treeContainerWidth).attr("height",treeMapHeight);

//Defines a few variables for use later and sets a default value for building so something is displayed on loading
var data1;
var Building = 200;
var Coartyard, Park, Grass, Street, Schrubs, Field, Forest, Path, Facility, Water, Orchard;

//Parses the data
Papa.parse("data/EUP_CURRENT_LAND_USE.csv", {
  header: true,
  download: true,
  dynamicTyping: true,
  complete: function(results) {
    console.log("results");
  data1 = results.data;
  }
});

//Sets the sizes for the nodes in the tree graph
function parseData2(selectUnit) {
  data1.forEach(function(item, index){
    if(selectUnit === data1[index].UNIT){
      var name = data1[index].CURRENT_LAND_USE_CLASS;
      eval(name + '=' + data1[index].AREA/100);
    }
  });
}

//Sets up the colour scale
var color = d3.scaleOrdinal()
    .domain(["Building", "Coartyard", "Park", "Grass", "Street", "Schrubs", "Field", "Forest", "Path","Facility", "Water", "Orchard"])
    .range([ "#8f6557", "#8f8c83", "#95ff00", "#55702e", "#0a0a08", "#1e541e", "#89c489", "#99764b", "#ff0019", "#4800ff", "#00ffff", "#f2ff00"]);

//Sets up the treemap layout
var treemapLayout = d3.treemap()
    .size([treeContainerWidth, treeMapHeight])
    .paddingOuter(0);

//Defines the nodes in the treemap
var data3 = {"name": "A1", "children":[{"name":"Building"},{"name":"Coartyard"},{"name":"Park"},{"name":"Grass"},{"name":"Street"},{"name":"Schrubs"},{"name":"Field"},{"name":"Forest"},{"name":"Path"},{"name":"Facility"},{"name":"Water"},{"name":"Orchard"}]};

//Calls the refresh function when the js script runs
refresh();

function refresh(){

  //Runs a for loop to loop through each of the children nodes and sets the value for each node
  var children = data3.children.length;
  var i;
  for (i = 0; i < data3.children.length; i++){
    data3.children[i].value = eval(data3.children[i].name);
  }

  //Removes all nodes from the treemap
  treeMap.selectAll('g').remove();

  //Sets the rootnude
  var rootNode = d3.hierarchy(data3)
  
  rootNode.sum(function(d) {
    return d.value;
  });
  
  treemapLayout(rootNode);
  
  //Adds the nodes to the treemap
  nodes = treeMap
    .selectAll('g')
    .data(rootNode.descendants())
    .enter()
    .append('g')
    .attr('transform', function(d) {return 'translate(' + [d.x0, d.y0] + ')'})
  
  nodes
    .append('rect')
    .attr('width', function(d) { return d.x1 - d.x0; })
    .attr('height', function(d) { return d.y1 - d.y0; })
    .style("fill", function(d){ return color(d.data.name)})
    .style("opacity", 1)

  nodes
    .append('text')
    .attr('dx', 4)
    .attr('dy', 14)
    .text(function(d) {
      return d.data.name;
    })
}