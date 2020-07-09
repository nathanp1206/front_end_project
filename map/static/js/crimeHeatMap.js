var myMap = L.map("map", {
    center: [33.7490, 84.3880],
    zoom: 11
});
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


var link = "static/data/crime_data.csv"
// heat is low, can add more crime when I have a chance. 
d3.csv(link, function(crimes) {

    console.log(crimes);
  
    var heatArray = [];
  
    for (var i = 0; i < crimes.length; i++) {
  
      if (crimes[i]) {
        heatArray.push([crimes[i].Latitude, [crimes[i].Longitude]]);
      }
    }
  
    var heat = L.heatLayer(heatArray, {
      radius: 20,
      blur: 35
    }).addTo(myMap);
  
  });




