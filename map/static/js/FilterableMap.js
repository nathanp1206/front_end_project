// Create the tile layer that will be the background of our map
  // Adding tile layer
  var baseLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

// Initialize all of the LayerGroups we'll be using
var layers = {
  ZIPCODES: new L.LayerGroup(),
  CRIMES: new L.LayerGroup(),
  SCHOOLS: new L.LayerGroup()
};

// Create the map with our layers
var myMap = L.map("map", {
    center: [33.7490, -84.3880],
    zoom: 11,
    layers: [
        layers.ZIPCODES,
        layers.CRIMES,
        layers.SCHOOLS
    ]
});

// Add our 'lightmap' tile layer to the map
baseLayer.addTo(myMap);

// Create an overlays object to add to the layer control
var overlays = {
  "ZipCodes w/ MLP": layers.ZIPCODES,
  "Crimes": layers.CRIMES,
  "Schools": layers.SCHOOLS
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(myMap);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(myMap);

// create layers...
// crimes

var link = "static/data/crime_data.csv"
// heat is low, can add more crime when I have a chance. 
d3.csv(link, function(crimes) {
  
    var heatArray = [];
  
    for (var i = 0; i < crimes.length; i++) {
  
      if (crimes[i]) {
        heatArray.push([crimes[i].Latitude, [crimes[i].Longitude]]);
      }
    }
  
    heat = L.heatLayer(heatArray, {
      radius: 20,
      blur: 35
    }).addTo(myMap)
    // }).addTo(layers[CRIMES]);
    // layers.CRIMES = heat
  
  });








// // Update the legend's innerHTML with the last updated time and station count
// function updateLegend(time, stationCount) {
//   document.querySelector(".legend").innerHTML = [
//     "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
//     "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",
//     "<p class='coming-soon'>Stations Coming Soon: " + stationCount.COMING_SOON + "</p>",
//     "<p class='empty'>Empty Stations: " + stationCount.EMPTY + "</p>",
//     "<p class='low'>Low Stations: " + stationCount.LOW + "</p>",
//     "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
//   ].join("");
// }
