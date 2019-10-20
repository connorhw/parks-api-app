'use strict';

const apiKey = 'lDMCSPBZQ0osm3rO0Pufbe26dx33thzS8cU2Uh49';
const baseURL = 'https://www.developer.nps.gov/api/v1/parks';



function getParkList(query) {

    const params = {
        q: query,
        //limit,
        key: apiKey
    
    };
    //$('.park-list').empty();
    const queryString = formatQueryParams(params);
    const url = baseURL + '?' + queryString;
    console.log(url);
    //console.log(state);
    fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.code === 404) {
                alert("Try again...");
            }else{
                displayResults(responseJson);
            }
        })
    
}

function displayResults() {
    console.log(responseJson);
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function watchForm() {
    $('park-form').submit(function(event) {
        event.preventDefault();
        const state = $('#js-input-state').val();
        getParkList(state);
    });
}

$(function() {
    console.log('App loaded successfully!');
    watchForm();
});