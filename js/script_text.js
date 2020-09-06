//var data = Papa.parse(csv);

// Convert back to CSV
//var csv = Papa.unparse(data);

// Parse local CSV file
// Papa.parse("data/Land_use_CN_range.csv", {
// 	complete: function(results) {
// 		console.log("Finished:", results.data);
// 	}
// });

// // Stream big file in worker thread
// Papa.parse(bigFile, {
// 	worker: true,
// 	step: function(results) {
// 		console.log("Row:", results.data);
// 	}
// });

//Defines the data variable
var data; 

//Parses the data from the selected csv file
Papa.parse("data/EUP_select_CN.csv", {
  header: true,
  download: true,
  dynamicTyping: true,
  complete: function(results) {
	data = results.data;  }
});

//Sets the elements on the web page to the correct values
function parseData(selectUnit) {
	data.forEach(function(item, index){
		if(selectUnit === data[index].UNIT){
			document.getElementById("use").innerHTML = data[index].LAND_USE;
			document.getElementById("description").innerHTML = data[index].SPATIAL_ACT;
			document.getElementById("minGreenArea").innerHTML = data[index].MIN_GREEN_AREA;
			document.getElementById("buldingDesc").innerHTML = data[index].BUILDING_DESCRIPTION;
			document.getElementById("buildingsPerHa").innerHTML = data[index].CURRENT_BUILDINGS_PER_ha;
			document.getElementById("popDensity").innerHTML = data[index].CURRENT_POPULATION_DENSITY;
			document.getElementById("area").innerHTML = data[index].AREA;
			document.getElementById("cna").innerHTML = data[index].CN_A;
			document.getElementById("cnb").innerHTML = data[index].CN_B;
			document.getElementById("cnc").innerHTML = data[index].CN_C;
			document.getElementById("cnd").innerHTML = data[index].CN_D;
			document.getElementById("station").innerHTML = data[index].RAIN_STATION;
		}
	});
}