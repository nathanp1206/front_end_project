import { tripAdv, proxy } from "../config.js"
let myHeaders = new Headers();
	myHeaders.append("x-rapidapi-host", tripAdv.host);
	myHeaders.append("x-rapidapi-key", tripAdv.key);
	myHeaders.append("content-type", "application/x-www-form-urlencoded");

let urlencoded = new URLSearchParams();
	urlencoded.append("limit", "30");
	urlencoded.append("language", "en_US");
	urlencoded.append("location_id", "60898");
	urlencoded.append("currency", "USD");

let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch(proxy + "https://worldwide-restaurants.p.rapidapi.com/search", requestOptions)
  .then(response => response.json())	
  .then(result => console.log(result))
  .catch(error => console.log('error', error));