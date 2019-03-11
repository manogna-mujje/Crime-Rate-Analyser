var d3 = require("d3");
var f3 = require("d3-fetch");
const csv = require('csv-parser');
const fs = require('fs');
var path = require('path');
var dl = require('datalib');
var alasql = require('alasql');
var _ = require('lodash');

var results = [];

function getDashboard(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'sampleHome.html'));
}

function getYearly(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'yoyCrimeRates.html'));
}

function getLawEnforcementDetails(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'law.html'));
}

function getFeedBack(req,res){
    res.sendFile(path.join(__dirname, '../public', 'feedback.html'));
}

function postFeedBackSubmit(req,res){
   res.sendFile(path.join(__dirname, '../public', 'response.html'));

}

function getOverallInsights(req, res) {


    /**
     * Import Data and check || Data: https://docs.google.com/spreadsheets/d/1yN7BCNn7xWerEqYdpHsKzRP9jY3b5NfW4iCo5Eaabvg/edit?usp=sharing
     */
    var csv_data = dl.load({ url: './public/sampledata.csv' });
    var data = dl.read(csv_data, { type: 'csv', parse: 'auto' });

    var rollup = dl.groupby('Primary Type', 'Arrest')
    .count()
        .execute(data);

        console.log(JSON.stringify(rollup));

        //Fetched distinct primary types
        var types = [...new Set(rollup.map(d => d["Primary Type"]))];
        console.log(types);

        var grouped = _.mapValues(_.groupBy(rollup, 'Primary Type'),
                          crimeslist => crimeslist.map(crime => _.omit(crime, 'Primary Type')));

console.log(grouped);

    //console.log(dl.print.table(rollup));

    res.render('bar', {grouped: grouped, crime_types: types});
    //res.sendFile(path.join(__dirname, '../public', 'bar.html'));
}

module.exports = {
    getLawEnforcementDetails,
    getDashboard,
    getYearly,
    getOverallInsights,
    getFeedBack,
    postFeedBackSubmit
    
}