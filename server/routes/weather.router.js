const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const router = express.Router();

const apiKey = process.env.GEOCODE_API_KEY

router.get('/:location', (req, res) => {
    console.log('req.params', req.params)
    axios({
        method: 'GET',
        url: `https://geocode.xyz/?locate=${req.params.location}&json=1&auth=${apiKey}`
    })
    .then((response) => {
        console.log('response', response.data);
        axios({
            method: 'GET',
            url: `https://api.weather.gov/points/${response.data.latt},${response.data.longt}`
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