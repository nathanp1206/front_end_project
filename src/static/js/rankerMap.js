const rankerMap = () => {
// Creating map object
// var myMap = L.map("map", {
//     center: [33.7490, -84.3880],
//     zoom: 11
//   });

//   // Adding tile layer
//   L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   }).addTo(myMap);
  
  // Use this link to get the geojson data.
  var link = "static/data/mlp.geojson"
  
  // Function that will determine the color of a zipcode based on its ranking
  function chooseColor(ranking) {
    switch (ranking) {
    case "A":
      return "green";
    case "B":
      return "blue";
    case "C":
      return "yellow";
    case "D":
      return "purple";
    case "F":
      return "red";
    default:
      return "black";
    }
  }
  var rankLayer;
  // Grabbing our GeoJSON data..
  d3.json(link, function(data) {
    // Creating a geoJSON layer with the retrieved data
    rankLayer = L.geoJson(data, {
      // Style each feature (in this case a neighborhood)
      style: function(feature) {
        return {
          color: "white",
          // Call the chooseColor function to decide which color to color our zipcode
          fillColor: chooseColor(mapData.filter(zip => zip.zipCode == feature.properties.ZipCode)[0].combinedRank),
          fillOpacity: 0.5,
          weight: 1.5
        };
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {
        // Set mouse events to change map styling
        layer.on({
          // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
          mouseover: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.9
            });
          },
          // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
          mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.5
            });
          },
          // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        //   click: function(event) {
        //     myMap.fitBounds(event.target.getBounds());
        //   }
        });
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h3>" + feature.properties.ZipCode + "</h3> <hr> <h3> Rating: " + (mapData.filter(zip => zip.zipCode == feature.properties.ZipCode)[0].combinedRank) + 
        "</h3> <hr> <h3> Crime Rating:" + (mapData.filter(zip => zip.zipCode == feature.properties.ZipCode)[0].crimeRank) + "</h3> <hr> <h3> Education Rating:" +
        (mapData.filter(zip => zip.zipCode == feature.properties.ZipCode)[0].edRank) + "</h3> <hr> <h3> Real Estate Pricing Rating:" + 
        (mapData.filter(zip => zip.zipCode == feature.properties.ZipCode)[0].mlpRank));
  
      }
    }).addTo(myMap);
    controlObject.addOverlay(rankLayer,"Rankings")
  });
}