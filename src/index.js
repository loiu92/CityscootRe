// external imports
var request         = require('request');
var http            = require('http');
var jsonfile        = require('jsonfile');


var cityscootAPI = require('./cityscootAPI');
var csAPI = new cityscootAPI();


var past_scootlist = [];


/* Execute once to check if the loggin phase work and copy the token received */
csAPI.loginUser();


/* Execute to check if the fetching works (does not save the fetched list) */
// csAPI.loginUser( function(){
//     csAPI.fetchScooterList();
// });

/* Get detail of a scoot, using his cityboxNum of the fetch list */
// csAPI.getScooterDetails( 292617084, "TOKEN" )

/* Reserve scooter */
// csAPI.reserveScooter( 286646251, "TOKEN" ) 



