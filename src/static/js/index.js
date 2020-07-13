
// const clientID = "fWSnVQWNHTmUR657xjzm8SPllFKQTk3Nn9OfjoqU_2E";
// var API_KEY = 'NpRvp4rxQt7jYkbu95fWvCMrZKxyQKlWcNZfzeopGfI';


// const loadData = (options) => {
//     fetch(options.url)
//     .then(function(response){
//         return response.json()
//     })
//     .then(function(data){ 
//         if (options.onSuccess) options.onSuccess(data)
//     })
// }

// const App = (props) => {
//     let [photos, setPhotos] = useState([]);


//     let [query, setQuery] = useState("House");
//     const queryInput = useRef(null);
    
//     const numberOfPhotos = 20;
//     const url =
//         "https://api.unsplash.com/photos/random/?count=" +
//         numberOfPhotos +
//         "&client_id=" +
//         clientID;
        
//     useEffect(() => {
//         const photosUrl = query ? `${url}&query=${query}` : url;

//         loadData({
//             url: photosUrl,
//             onSuccess: res => {
//                 setPhotos(res);
//             }
//         });
//     }, [query, url]);
    
//     const searchPhotos = e => {
//         e.preventDefault();
//         setQuery(queryInput.current.value);
//     };
    
//     return (
//         <div className="grid">
//             { query ?
//             photos.map(photo => {
//             return (
//                 <div key={photo.id} className="item">
//                     <img
//                 className="img"
//                 src={photo.urls.regular}
//                 />
//                 <div className="caption">
//                         <span className="credits">Photo by 
//                             <a href={photo.user.links.html + utm}>   {photo.user.name} 
//                             </a>
//                             <span> on </span> 
//                             <a href={"https://unsplash.com" + utm}>
//                                 Unsplash
//                             </a>
//                         </span>
//                     </div>
//                 </div>
//                 );
//             }) : ""}
//         </div>
//     );
// };