// Creating map object
var myMap = L.map("map", {
  center: [33.7490, -84.3880],
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

// Use this link to get the geojson data.
  // var link = "static/data/atlanta.geojson";
  var link = "./static/data/zips.geojson"


// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: () => {
      return {
        color: "white",
        fillColor: "pink",
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
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.ZipCode + "</h1> <hr> <h2>" + feature.properties.name + "</h2>");

    }
  }).addTo(myMap);
});
// 
var link = "./static/data/crime_data.csv"

d3.csv(link, function(crimes) {

    console.log(crimes);
  
    var heatArray = [];
  
    for (var i = 0; i < crimes.length; i++) {
        var lat = crimes[i].Latitude;
        var lng = crimes[i].Longitude;
  
      if (crimes[i]) {
        heatArray.push([crimes[i].Latitude, [crimes[i].Longitude]]);
      }
    }
  
    var heat = L.heatLayer(heatArray, {
      radius: 20,
      blur: 35
    }).addTo(myMap);
  
  });

const fetchSchools = () => {
  var template = '{"schools":[' +
  ']}';
  var data = JSON.parse(template);
  pages = [1, 2, 3, 4, 5]
  var result
  pages.forEach((page) => {
      url = `https://api.schooldigger.com/v1.2/schools?st=GA&city=Atlanta&page=${page}&perPage=50&appID=1a0adc5f&appKey=${SCHOOL_KEY}`
      fetch(url)
      .then(response => response.json())
      .then((jData => {
          // console.log(jData)
          result = jData
          result.schoolList.forEach((school) => {
              //parse the JSON
              data.schools.push(school)
              // let ed_lat = school.address.latLong.latitude; 
              // let ed_lng = school.address.latLong.longitude;
              // L.marker([ed_lat, ed_lng]).addTo(myMap);
          })
      }))
      .catch(err => (console.log(err)))
  })
  return data
}
data = fetchSchools()

// import schooFetch from "./schooldiggerFetch.js"
// schoolData = schooFetch()
// console.log(schoolData)


// DEBUG WITH CLINTTTTTT !!!!!!! ALL OF THE LAYERS ARE CRASHING MY COMP