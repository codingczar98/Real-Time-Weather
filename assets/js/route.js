/**
 * @fileoverview Menage all routes
 * @copyright codingczar 2024 All rights reserved
 * @author codingczar <codingczar98@gmail.com>
 */

'use strict';

import { updateWeather, error404 } from "./app.js";
const defaultLocation = "#/weather?lat=20.5937&lon=78.9629" //India

const currentLocation = function () {
window.navigator.geolocation.getCurrentPosition(res =>{
    const {latitude, longitude} = res.coords;

    updateWeather(`lat=${latitude}`, `lon=${longitude}`);
}, err =>{
    window.location.hash = defaultLocation;
});
}

/**
 * @param {string} query Searched query 
 */

const searchedLocation = query => updateWeather(...query.split("&"));
// updateWeather("lat=20.5937", "lon=78.9629")

const routes = new Map([
    ["/current-location", currentLocation],
    ["/weather", searchedLocation]
]);

const checkHash = function () {
    const requestURL = window.location.hash.slice(1);

    const [route, query] = requestURL.includes ? requestURL.split("?") : [requestURL];

    routes.get(route) ? routes.get(route)(query) : error404();
}

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function () {
    if (!this.window.location.hash) {
        window.location.hash = "#/current-location";
    }
    else {
        checkHash();
    }
});
