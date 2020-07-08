
// Application ID = 1a0adc5f
//  This is the application ID, you should send with each API request.
// Application Keys = 5123024d5711791927204492727917ed

// ID = 1a0adc5f
// key = 5123024d5711791927204492727917ed

// url generated using postman

fetchSchools = () => {
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
            console.log(jData)
            result = jData
            result.schoolList.forEach((school) => {
                //parse the JSON
                data.schools.push(school)
            })
        }))
        .catch(err => (console.log(err)))
    })
    return data
}
export default fetchSchools
// variable 'data' holds the 208 school responses for GA, this array can be filtered by the various key value pairs.
// test = data.schools
// test.filter(school=>school.address.zip == "30327") - works