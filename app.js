// const api = "https://www.pexels.com/api/documentation/#photos-curated";
const auth = "JTU0TF8I8WDH4k3hsSE0qmyia8adMPkltxwDe9Os4QeSTDNe9JEvWage";

const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let fetchLink;
let currentSearch;
let page=1;

//event listeners
more.addEventListener("click",morePhotos);

searchInput.addEventListener("input",updateInput);
form.addEventListener("submit",(e)=>{
   searchPhotos(searchValue);
    e.preventDefault();
    currentSearch = searchValue;
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
            Authorization: auth,
           }
    })
    const data = await dataFetch.json();
    return data;
}

function gererateHtml(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img")
        galleryImg.innerHTML = `
        <img src=${photo.src.large}></img>
            <div class ="gallery-info">
                <p>${photo.photographer}</p>
                <a target="blank" href=${photo.src.original}>Download</a>
            </div>
            
            `;
        gallery.appendChild(galleryImg);
    });
}


async function curatedPhotos(){
    fetchLink = "https://api.pexels.com/v1/curated?page=1&per_page=15"
    const data =await fetchApi(fetchLink);
    
    gererateHtml(data);
}


async function searchPhotos(query){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
    const data  = await fetchApi(fetchLink);
    gererateHtml(data);
}

function clear(){
    gallery.innerHTML="";
    searchInput.value="";
}

async function morePhotos(){
    page++;
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
        
    }else{
        fetchLink = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    
    }
    const data  = await fetchApi(fetchLink);
    gererateHtml(data);
}

curatedPhotos();




// new auth = "JTU0TF8I8WDH4k3hsSE0qmyia8adMPkltxwDe9Os4QeSTDNe9JEvWage"
// const auth = "g6dBcBmyXoasdlTmOF9b9VXrLqDmCIWwN2NQd1cTQu5uVziHBL1QiGdL";