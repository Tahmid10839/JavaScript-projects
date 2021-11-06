

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city){
    const resp = await fetch(url(city),{origin: "cors"});
    const respdata = await resp.json();

    console.log(respdata,KtoC(respdata.main.temp));

    addWeatherToPage(respdata);
}

function addWeatherToPage(data){
    const temp = KtoC(data.main.temp);

    const weather = document.createElement('div');
    weather.classList.add('weather');
    weather.innerHTML = `
            <p>${data.weather[0].main}<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"><b>${temp}°C</b>&nbsp; in ${data.name}</p>
    `;
    main.innerHTML = '';
    main.appendChild(weather);
}

function KtoC(K){
    return Math.floor(K - 273.15);
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const city = search.value;
    if(city){
        search.value = '';
        getWeatherByLocation(city);
    }
});

