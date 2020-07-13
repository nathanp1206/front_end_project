
// to be called before map handling: generates all the data required for visualization
var mapData = [];

const loadGeoData = (data) => {
    for (i=0;i<data.features.length;i++) {
        newZipcode = {"zipCode": data.features[i].properties.ZipCode, "medianListingPrice": data.features[i].properties.MedianListingPrice, "geometry": data.features[i].geometry};

        mapData.push(newZipcode);
    };
    requestCrime()
    requestSchools2()
}


// var edData
// DEBUG: returns count of 212 schools across all zipcodes even though only 207 valid schools. 208 total
const loadEdata = (data) => {
    // let masterSchoolList = data.map(datum => datum.schoolList)
    var masterSchoolList = [];
    data.forEach((datum) => {
        masterSchoolList = [...masterSchoolList, ...datum.schoolList]
    });

    for (i=0;i<mapData.length;i++) {
        let zip = mapData[i].zipCode
        mapData[i]["schools"] = masterSchoolList.filter(school => school.address.zip == zip)
    };
    zipRanker()
};

// debug. works in console but not here...
const loadCrimeData = (data) => {
    test = data
    for (i=0;i<mapData.length;i++) {
        let zip = mapData[i].zipCode
        mapData[i]["crimes"] = data.filter(crime => crime.Zipcode == zip)
    };
};


// grab the mlp from the geojson
const requestGEO = () => {
    var link = "static/data/mlp.geojson"
    d3.json(link, function(data) {
        geojson = data
        loadGeoData(geojson) 
    });
}
    // Decision: grab the data from a global variable created after the schooldigger call or call it first here
    // grab the crime data right from the csv

    // return an object with all three of these data points
const requestSchools2 = () => {
    pages = [1, 2, 3, 4, 5]
    let promises = []
    pages.forEach((page) => {
        url = `https://api.schooldigger.com/v1.2/schools?st=GA&city=Atlanta&page=${page}&perPage=50&appID=1a0adc5f&appKey=${SCHOOL_KEY}`
        promises.push(fetch(url).then(resp => resp.json()))
    })
    Promise.all(promises)
    //  map loading... 
    .then(loadEdata)
}

const requestCrime = () => {
    d3.csv("static/data/crime_data.csv", function(data) {
        crimes = data
        loadCrimeData(crimes)
    });
}

requestGEO()

