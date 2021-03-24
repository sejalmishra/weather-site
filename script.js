const form  = document.querySelector('#form');
const aside = document.querySelector("#aside");
let parent = document.querySelector('.parent');
let searchCount = 0;
const container2 = document.querySelector('.container2');
const container1 = document.querySelector('.container1');
const child_container1 = document.querySelector('.child_container1');
const child_container2 = document.querySelector('.child_container2')

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    try{
        let data = await fetch(`https://proxy-server-weatherapi.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${searchTerm}`);
        let res = await data.json();
        let id = res[0].woeid;
        let weather = await fetch(`https://proxy-server-weatherapi.herokuapp.com/https://www.metaweather.com/api/location/${id}`);
        let result = await weather.json();
        console.log(result);
        searchCount++;
        if(searchCount>1 && data){
            container2.innerHTML = "";
            child_container2.innerHTML = "";
        }
        leftdiv(result);
        rightdiv(result);
    }
    catch(err) {
        console.log(err);
        aside.innerHTML = '<h1>Sorry this place is invalid! Please try again</h1>';
    } 

})


function leftdiv(result) {
    const city = result.title;
    console.log(city);
    const temp = Math.floor(result.consolidated_weather[0].the_temp);

    const weather_name = result.consolidated_weather[0].weather_state_name;

    const weather_name_abbr = result.consolidated_weather[0].weather_state_abbr;
    if(parent){
    parent.innerrHTML = "";
    }
    container2.innerHTML = `<h1>${city}</h1>${temp}&deg;C`;

    const section = document.createElement('section');
    section.innerHTML = `<span>${weather_name}</span> <span><img class="sizing" src="image/${weather_name_abbr}.png"></span>`;
    section.classList.add("design");
    container2.appendChild(section);

    const obj = {
        temperature : `${Math.floor(result.consolidated_weather[0].max_temp)}&deg;C / ${Math.floor(result.consolidated_weather[0].min_temp)}&deg;C`,

        humidity : result.consolidated_weather[0].humidity,

        visibility : Math.floor(result.consolidated_weather[0].visibility)
    };
    for(let property in obj) {
        const section = document.createElement('section');
        section.innerHTML = `<span>${property}</span> <span>${obj[property]}</span>`;
        section.classList.add("design");
        container2.appendChild(section);
    } 
}


function rightdiv(result) {
    if(aside){
    aside.innerHTML = "";
    }
    const div1 = document.createElement('div');
    div1.innerHTML="Next 5 day's forecast";
    child_container2.appendChild(div1);
    const arr = result.consolidated_weather;
    for(let i=1;i<=5;i++) {
        const weather_name_abbr = result.consolidated_weather[i].weather_state_abbr;
        let name = arr[i].weather_state_name;
        let max_temp = Math.floor(arr[i].max_temp);
        let min_temp = Math.floor(arr[i].min_temp);
        const section = document.createElement('section');
        section.innerHTML = `<span><img class="sizing" src="image/${weather_name_abbr}.png"></span> <span>${name}</span> <span>${max_temp}&deg;C / ${min_temp}&deg;C</span>`;
        section.classList.add("design");
        child_container2.appendChild(section);
    }   
}