"use strict";

const baseURL = "https://restcountries.com/v2";
// All
// name/${countryName}

// ---------------- ALL COUNTRIES FUNCTION start ------------- //
const getAllCountries = async () => {
    const countries = await fetch(`${baseURL}/all`);
    const result = await countries.json();
    dataRender(result);
    dynamicCategory(result);
}
getAllCountries()

// ---------------- ALL COUNTRIES FUNCTION end ------------- //

// ------------------ RENDER ALL DATA FUNCTION start ----------------------- //
function dataRender(data = []) {

    data.forEach((el) => {
        const card = createElement('div', "card shadow-lg", `
        
        <img src="${el.flags.svg}" alt="flag" class="card-top-img rounded">
        <div class="card-body p-3">
            <h3 class="card-title">
                ${el.name}
            </h3>
            <ul class="card-list list-unstyled">
                <li class="card-list-item"><strong>Population: </strong> ${el.population} </li>
                <li class="card-list-item"><strong>Region: </strong> ${el.region} </li>
                <li class="card-list-item"><strong>Capital: </strong> ${el.capital} </li>
            </ul>
        </div>
        
        `);
        $('.wrapper').appendChild(card)
    })
}
// ------------------ RENDER ALL DATA FUNCTION end ----------------------- //


// ------------------ DYNAMIC CATEGORY FUNCTION start ----------------------- //

function dynamicCategory(data) {

    const category = [];

    data.forEach((el) => {
        if (!category.includes(el.region)) {
            category.push(el.region)
        }
    })

    category.sort();
    category.unshift('All');
    category.forEach((el) => {
        const option = createElement('option', 'item-option', el);
        $("#region").appendChild(option)
    })
}

// ------------------ DYNAMIC CATEGORY FUNCTION end ----------------------- //


// ------------------- FIND COUNTRIES FUNCTION start ----------------------- //
$("#search").addEventListener('keypress', (e) => {
    if (e.target.value.trim().length !== 0 && e.keyCode === 13) {
        findCountry(e.target.value);
    }
})


async function findCountry(country) {

    $(".wrapper").innerHTML = "";

    const response = await fetch(`${baseURL}/name/${country}`);

    const data = await response.json();

    if (response.status === 404) {
        $('.info').innerHTML = "<h1 class='text-center w-100'> not found country </h1>"
    } else {
        $('.info').innerHTML = `<h1 class='text-center w-100'> Search result: ${data.length} </h1>`
        dataRender(data)
    }
    
}
// ------------------- FIND COUNTRIES FUNCTION end ----------------------- //


$('#region').addEventListener('change', (e) => {

        sortCountry(e.target.value.toLowerCase())
        
})

async function sortCountry(region) {

    $(".wrapper").innerHTML = "";

    if (region === 'all') {
        const response = await fetch(`${baseURL}/all/`);

        const data = await response.json();

        if (response.status === 404) {
            $('.info').innerHTML = "<h1 class='text-center w-100'> not found 404 </h1>"
        } else {
            $('.info').innerHTML = `<h1 class='text-center w-100'> Search result: ${data.length} </h1>`
            dataRender(data)
        }
    } else {
        const response = await fetch(`${baseURL}/region/${region}`);

        const data = await response.json();

        if (response.status === 404) {
            $('.info').innerHTML = "<h1 class='text-center w-100'> not found 404 </h1>"
        } else {
            $('.info').innerHTML = `<h1 class='text-center w-100'> Search result: ${data.length} </h1>`
            dataRender(data)
        }
    }
}


