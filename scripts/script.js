"use strict";

const baseURL = "https://restcountries.com/v2";
// All
// name/${countryName}

// ---------------- ALL COUNTRIES FUNCTION start ------------- //
const getAllCountries = async () => {
    const countries = await fetch(`${baseURL}/all`);
    const result = await countries.json();
    $('.wrapper').innerHTML = ` <span class="loader"></span> `;

    setTimeout(()=> {
        $('.wrapper').innerHTML = "";
        dataRender(result);
    }, 2000);
    
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
            <button class="btn btn-primary readMore data-id="${el.name}">Read More . . .</button>
        </div>
        
        `);

        card.dataset.id = el.name;

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
        $('.wrapper').innerHTML = ` <span class="loader"></span> `;    
        setTimeout(() => {
            $('.wrapper').innerHTML = "";
            findCountry(e.target.value);
        }, 1500)
        
    }
})

$('#btn-search').addEventListener('click', () => {
    let str = $("#search").value.trim();
    if (str.length > 0) {
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
    $('.wrapper').innerHTML = ` <span class="loader"></span> `;
    setTimeout(() => {
        $('.wrapper').innerHTML = "";
        sortCountry(e.target.value.toLowerCase())
    }, 1500)

    

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

$('.wrapper').addEventListener('click', (e) => {
    $('.country-info').innerHTML = "";

    if (e.target.classList.contains('readMore')) {
        let id = e.target.getAttribute('data-id');
        getCountry(id);
        $('.sidebar').classList.remove('swipe')
        $('body').style.overflow = `hidden`;
    }

})


async function getCountry(country) {
    console.log(country);

    const response = await fetch(`${baseURL}/name/${country}`)
    console.log(response);

    const result = await response.json();
    // console.log(result);

    const {name, capital, region, population, flags: { svg } } = result[0];

    const row = createElement('div', 'row p-2', `
                    
    <div class="col-md-4 p-3">
        <img src="${svg}" alt="flag" id="img-country">
    </div>
    <div class="col-md-7 p-3">
        <ul class="list-group w-75">
            <li class="list-group-item"><h2>${name}</h2></li>
            <li class="list-group-item"><strong>Native Name:</strong>${name}</li>
            <li class="list-group-item"><strong>Population:</strong>${population}</li>
            <li class="list-group-item"><strong>Region:</strong>${region}</li>
            <li class="list-group-item"><strong>Sub Region:</strong>${name}</li>
            <li class="list-group-item"><strong>Capital:</strong>${capital}</li>
            <li class="list-group-item"><strong>Top Level Domain:</strong>${name}</li>
            <li class="list-group-item"><strong>Currencies:</strong>${name}</li>
            <li class="list-group-item"><strong>Languages:</strong>${name}</li>
        </ul>
    </div>
    
    `);

    $('.country-info').appendChild(row);
}

$('.close').addEventListener('click', () => {
    $('.sidebar').classList.add('swipe');
    $('body').style.overflow = `visible`;
})

