import { tripAdv, proxy } from "../config.js"
fetch(proxy + "https://tripadvisor1.p.rapidapi.com/answers/list?limit=10&question_id=5283833", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": tripAdv.host,
		"x-rapidapi-key": tripAdv.key
	}
})
.then(response => {
	return response.json()
})
.then(response => {
    console.log(response)
})
.catch(err => {
	console.log(err);
}) 