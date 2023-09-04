// const api = "https://www.pexels.com/api/documentation/#photos-curated";
const auth = "JTU0TF8I8WDH4k3hsSE0qmyia8adMPkltxwDe9Os4QeSTDNe9JEvWage";

const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;
//event listeners
searchInput.addEventListener("input",updateInput);
form.addEventListener("submit",(e)=>{
    searchPhotos(searchValue);
    e.preventDefault;
})


function updateInput(e){
    searchValue = e.target.value;
}

async function fetchApi(url){
    const dataFetch  = await fetch(url,
    {
        method:"GET",
        headers:{
           Accept:"application/json",
        // Accept: "*/*",
            Authorization: auth
        }
    })
    const data = await dataFetch.json();
    return data;
}

function gererateHtml(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img")
        galleryImg.innerHTML = `<img src=${photo.src.large}></img>
        <p>${photo.photographer}</p>
        `;
        gallery.appendChild(galleryImg);
    });
}


async function curatedPhotos(){
    const data =await fetchApi("https://api.pexels.com/v1/curated?page=1&per_page=15");
    
    gererateHtml(data);
}


async function searchPhotos(query){
    clear();
    const data  = await fetchApi(`https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`);
    gererateHtml(data);
}

function clear(){
    gallery.innerHTML="";
}
curatedPhotos();




// new auth = "JTU0TF8I8WDH4k3hsSE0qmyia8adMPkltxwDe9Os4QeSTDNe9JEvWage"
// const auth = "g6dBcBmyXoasdlTmOF9b9VXrLqDmCIWwN2NQd1cTQu5uVziHBL1QiGdL";