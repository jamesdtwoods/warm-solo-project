const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const router = express.Router();

const apiKey = process.env.MAPBOX_API_KEY

router.get('/:location', (req, res) => {
    console.log('req.params', req.params)
    axios({
        method: 'GET',
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${req.params.location}.json?autocomplete=false&access_token=${apiKey}`
    })
    .then((response) => {
        // console.log('response', response.data);
        axios({
            method: 'GET',
            url: `https://api.weather.gov/points/${response.data.features[0].center[1]},${response.data.features[0].center[0]}`
        })
        .then((response) => {
            // console.log(response.data.properties.forecastHourly);
            axios({
                method: 'GET',
                url: `${response.data.properties.forecastHourly}`
            })
            .then((response) => {
                res.send(response.data)
            })
            .catch((error) => {
                console.log('error getting weather forcast from weather.gov', error)
                res.sendStatus(500)
            })
        })
        .catch((error) => {
            console.log('error getting points from weather.gov', error)
            res.sendStatus(500)
        })
    })
    .catch((error) => {
        console.log('error getting lat/long from geocode.xyz', error)
        res.sendStatus(500)
    })
})

module.exports = router;