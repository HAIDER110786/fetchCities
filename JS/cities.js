const cities = [];
const requestURL = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
window.addEventListener('load',()=>{
    fetch(requestURL)
    .then(bufferStream => bufferStream.json())
    .then(res=> cities.push(...res) )
})

const inputText =document.querySelector('input')

inputText.addEventListener('keyup',function(){
    if(inputText.value){
        const foundCities = findTheCorrespondingCities(this.value,cities);

        const foundCitiesHTML = foundCities.map((city)=>{
            return `<div class="cities"><div>${city.city}  , ${city.state}</div></div>`
        }).join('');

        if(!foundCitiesHTML){
            document.querySelector('.cityList').innerHTML = "<div class='cities'>Sorry! The city you typed is not in the list</div>";
        }
        else{
            document.querySelector('.cityList').innerHTML = foundCitiesHTML;
        }
    }
    else{
        document.querySelector('.cityList').innerHTML = '';
    }
})

function findTheCorrespondingCities(TheValue,Cities){
    return Cities.filter((city)=>{
        const regex = new RegExp(TheValue, 'gi')
        return city.city.match(regex);
    })
}
