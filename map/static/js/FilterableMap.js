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
//   ZIPCODES: new L.LayerGroup(),
//   CRIMES: new L.LayerGroup(),
//   SCHOOLS: new L.LayerGroup()
};

// Create the map with our layers
var myMap = L.map("map", {
    center: [33.7490, -84.3880],
    zoom: 11,
    layers: [
        // layers.ZIPCODES,
        // layers.CRIMES,
        // layers.SCHOOLS
    ]
});

// Add our 'baselayer' to the map
baseLayer.addTo(myMap);

// Create an overlays object to add to the layer control
var overlays = {
//   "ZipCodes w/ MLP": layers.ZIPCODES,
//   "Crimes": layers.CRIMES,
//   "Schools": layers.SCHOOLS
};

// Create a control for our layers, add our overlay layers to it
let controlObject = L.control.layers(null, overlays).addTo(myMap);

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
var link = "static/data/mlp.geojson"

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: () => {
      return {
        color: "grey",
        fillColor: "blue",
        fillOpacity: 0.05,
        weight: 1.0
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
            fillOpacity: 0.1
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.05
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.ZipCode);

    }
  }).addTo(myMap);
});


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
    // }).addTo(layers[new L.LayerGroup()]);
    // layers.CRIMES = heat
    // overlays.crimes = heat
    // L.control.layers(null, {"Crimes": heat}).addTo(myMap);
    controlObject.addOverlay(heat,"Crime")
  });

//   ////////////////////////////////////////////////////////////
  var link = "static/data/mlp.geojson"
 
  var geojson;
  
  // Grab data with d3
  d3.json(link, function(data) {
  
    // Create a new choropleth layer
    geojson = L.choropleth(data, {
  
      // Define what  property in the features to use
      valueProperty: "MedianListingPrice",
  
      // Set color scale
      scale: ["#ffffb2", "#009700"],
  
      // Number of breaks in step range
      steps: 10,
  
      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },
  
      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Zip Code: " + feature.properties.ZipCode + "<br>Median Listing Price:<br>" +
          "$" + feature.properties.MedianListingPrice);
      }
    }).addTo(myMap);
    controlObject.addOverlay(geojson,"MedianListingPrice")

//   ///////////////////////
    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var limits = geojson.options.limits;
      var colors = geojson.options.colors;
      var labels = [];
  
      // Add min & max
      var legendInfo = "<h1>ZipCode Median Listing Price</h1>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">" + limits[0] + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";
  
      div.innerHTML = legendInfo;
  
      limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      });
  
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };
  
    // Adding legend to the map
    legend.addTo(myMap);
  });

  const fetchSchools2 = () => {
    pages = [1, 2, 3, 4, 5]
    let promises = []
    pages.forEach((page) => {
        url = `https://api.schooldigger.com/v1.2/schools?st=GA&city=Atlanta&page=${page}&perPage=50&appID=1a0adc5f&appKey=${SCHOOL_KEY}`
        promises.push(fetch(url).then(resp => resp.json()))
    })
    Promise.all(promises)
    //  map loading... 
    .then(filterData)
}

// var edData
const filterData = (data) => {
    // let masterSchoolList = data.map(datum => datum.schoolList)
    var masterSchoolList = []
    data.forEach((datum) => {
        masterSchoolList = [...masterSchoolList, ...datum.schoolList]
    })
    // console.log(masterSchoolList)
    buildEdLayer(masterSchoolList)
    // edData = masterSchoolList
}

const buildEdLayer = (edData) => {
let edMarkers = L.markerClusterGroup();
    edData.forEach((school, i) => {
        if (school.address.latLong.latitude && school.address.latLong.longitude) {
            let ed_lat = school.address.latLong.latitude; 
            let ed_lng = school.address.latLong.longitude;
            let rank = "N/A"
            for (i=0;i<schoolDataList.length; i++) {
                if (schoolDataList[i].schoolName == school.schoolName) {
                    rank = schoolDataList[i].rank
                    break
                }
                else 
                    {continue}
            }
            let type = school.schoolLevel;
            edMarkers.addLayer(L.marker([ed_lat, ed_lng])
            .bindPopup("School Name:" + school.schoolName + "<br>Ranking:" + rank + "<br>School Type:" + type));
            // L.marker([ed_lat, ed_lng]).bindPopup(school.schoolName).addTo(myMap);
        //     layer.bindPopup("Zip Code: " + feature.properties.ZipCode + "<br>Median Listing Price:<br>" +
        // "$" + feature.properties.MedianListingPrice);
        }
    })
    // Add our marker cluster layer to the map
    // console.log("here")
    myMap.addLayer(edMarkers);
    controlObject.addOverlay(edMarkers,"Schools")
}
fetchSchools2()







