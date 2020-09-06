//Js and Leaflet Stuff

var map =  L.map ('map', {
    attributionControl: false, 
    center: [14,46],
    zoom: 8,
    minZoom: 2,
    maxZoom: 18
});


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,  
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}



function resetHighlight(e) {
    pilotLayer.resetStyle(e.target);
}



function populateGraphs(e) {
    document.getElementById("unit").innerHTML = e.target.feature.properties.UNIT;
    parseData(e.target.feature.properties.UNIT);
    parseData2(e.target.feature.properties.UNIT);
    line();
    refresh();
}




function zoomToFeature(e) {
    if (event.shiftKey) { 
    map.fitBounds(e.target.getBounds());
    //map.panTo(new L.LatLng(40.737, -73.923));
    }
    else {
        console.log(e.target.feature.properties.UNIT);
        populateGraphs(e);

    }
}

//interactive layer based on the zoom

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}





var countryLayer =  new L.geoJson(null, {
    style: function(feature) {
        return {
        	color: "green"
        };
    },
    // pointToLayer: function (feature, latlng) {
    //     return new L.CircleMarker(latlng, {
    //     	radius: 10, 
    //     	fillOpacity: 0.85
    //     });
    // },    
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.NAME);
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }
});
var regionLayer =  new L.geoJson(null, {
    style: function(feature) {
        return {
        	color: "green"
        };
    },
    // pointToLayer: function (feature, latlng) {
    //     return new L.CircleMarker(latlng, {
    //     	radius: 10, 
    //     	fillOpacity: 0.85
    //     });
    // },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.NAME);
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }
});

var municipLayer =  new L.geoJson(null, {
    style: function(feature) {
        return {
        	color: "green"
        };
    },
    // pointToLayer: function (feature, latlng) {
    //     return new L.CircleMarker(latlng, {
    //     	radius: 10, 
    //     	fillOpacity: 0.85
    //     });
    // },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.OB_UIME);
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }
});

var unitLayer =  new L.geoJson(null, {
    style: function(feature) {
        return {
        	color: "green"
        };
    },
    // pointToLayer: function (feature, latlng) {
    //     return new L.CircleMarker(latlng, {
    //     	radius: 10, 
    //     	fillOpacity: 0.85
    //     });
    // },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.NAME);
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }
});

var pilotLayer =  new L.geoJson(null, {
    style: function(feature) {
        return {
        	color: "green"
        };
    },
    // pointToLayer: function (feature, latlng) {
    //     return new L.CircleMarker(latlng, {
    //     	radius: 10, 
    //     	fillOpacity: 0.85
    //     });
    // },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.UNIT);
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
        //console.log(feature.properties.UNIT);
    }
});





var geocoder = L.esri.Geocoding.geocodeService();




$.getJSON("data/maps/Country.geojson",function(data){
    countryLayer.addData(data)
    });

$.getJSON("data/maps/Region.geojson",function(data){
   regionLayer.addData(data);
    });

$.getJSON("data/maps/Municip.geojson",function(data){
    municipLayer.addData(data);
    });
    
$.getJSON("data/maps/F_unit.geojson",function(data){
    unitLayer.addData(data);
    });
    
$.getJSON("data/maps/EUP_pilot.geojson",function(data){
    pilotLayer.addData(data);
    });




// var baseLayers = {
//      "Country": countryLayer,
//      "Region": regionLayer,
//      "Municipalities": municipLayer,
//      "Units": unitLayer,
//      "EUP": pilotLayer,
//          };


// L.control.layers(baseLayers).addTo(map);

//countryLayer.addTo(map);
//regionLayer.addTo(map);
//municipLayer.addTo(map);
//unitLayer.addTo(map);
pilotLayer.addTo(map);




// layer groups - different panes



geocoder.geocode().text('SLOVENIA').run(function (error, response) {
    if (error) {
      return;
    }

map.fitBounds(response.results[0].bounds); });








  


// var countrydata = $.getJSON("data/maps/Country.geojson",function(data){
//                 // L.geoJson function is used to parse geojson file and load on to map
//                 return data;
//                 });


// var regiondata = $.getJSON("data/maps/Region.geojson",function(data){
//                 // L.geoJson function is used to parse geojson file and load on to map
//                 return data;
//                 });
            


// var municipdata = $.getJSON("data/maps/Municip.geojson",function(data){
//             // L.geoJson function is used to parse geojson file and load on to map
//                 return data;
//                 });
    
            

// var unitdata = $.getJSON("data/maps/F_unit.geojson",function(data){
//                 // L.geoJson function is used to parse geojson file and load on to map
//                 return data;
//                 });
    


// var pilotdata = $.getJSON("data/maps/EUP_pilot.geojson",function(data){
//                 // L.geoJson function is used to parse geojson file and load on to map
//                 return data;
//                 });



                


               // L.geoJson(countrydata.responseJSON).addTo(map);
               // L.geoJson(regiondata).addTo(map);
               // L.geoJson(municipdata).addTo(map);
               // L.geoJson(unitdata).addTo(map);
               // L.geoJson(pilotdata).addTo(map);

    
        
                









// $.getJSON("data/maps/Country.geojson",function(countrydata){
//     // L.geoJson function is used to parse geojson file and load on to map
//     L.geoJson(countrydata).addTo(map);
//     });


// $.getJSON("data/maps/Region.geojson",function(regiondata){
//         // L.geoJson function is used to parse geojson file and load on to map
//         L.geoJson(regiondata).addTo(map);
//         });
    


// $.getJSON("data/maps/Municip.geojson",function(municipdata){
//             // L.geoJson function is used to parse geojson file and load on to map
//             L.geoJson(municipdata).addTo(map);
//             });
    
            

// $.getJSON("data/maps/F_unit.geojson",function(unitdata){
//                 // L.geoJson function is used to parse geojson file and load on to map
//                 L.geoJson(unitdata).addTo(map);
//                 });
    


// $.getJSON("data/maps/EUP_pilot.geojson",function(pilotdata){
//                 // L.geoJson function is used to parse geojson file and load on to map
//                 L.geoJson(pilotdata).addTo(map);
//                 });


//                 L.geoJson(countrydata).addTo(map);
//                 L.geoJson(regiondata).addTo(map);
//                 L.geoJson(municipdata).addTo(map);
//                 L.geoJson(unitdata).addTo(map);
//                 L.geoJson(pilotdata).addTo(map);

