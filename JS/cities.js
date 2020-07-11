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
            const regex = new RegExp(this.value,'gi');
            const highlightedTextCity = city.city.replace(regex,`<span class="highlighted">
            ${this.value}</span>`)
            const regex2 = new RegExp(this.value,'gi');
            const highlightedTextState = city.state.replace(regex2,`<span class="highlighted">
            ${this.value}</span>`)
            return `<div class="cities">${highlightedTextCity}  , ${highlightedTextState}</div>`
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
    });
}
