'use strict';

const apiKey = 'lDMCSPBZQ0osm3rO0Pufbe26dx33thzS8cU2Uh49';
const baseURL = 'https://developer.nps.gov/api/v1/parks';



function getParkList(state, limit) {

    const params = {
        stateCode: state,
        limit,
        api_key: apiKey
    
    };
    //$('.park-list').empty();
    const queryString = formatQueryParams(params);
    const url = baseURL + '?' + queryString;
    console.log(url);
    //console.log(state);
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        /*.catch(err => {

        })*/
    
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('.park-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('.park-list').append(
            `<li>
             <h2>${responseJson.data[i].fullName}</h2>
             <div>| ${responseJson.data[i].url} |</div>
             <p>${responseJson.data[i].description}</p>
            </li>`
        )};
        $('.results').removeClass('hidden');
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}
/*
function getStateCode(state) {
    
}
*/
function watchForm() {
    $('#park-form').submit(function(event) {
        event.preventDefault();
        const state = $('#js-input-state').val();
        const limit = $('#js-input-limit').val();
        getParkList(state, limit);
    });
}

$(function() {
    console.log('App loaded successfully!');
    watchForm();
});