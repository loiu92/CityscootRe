"use strict"; 

/*  Modules */
const request   = require('request');
const config    = require('./config.js');
const EventEmitter = require('eventemitter3');
var querystring = require('querystring');
var md5         = require('md5');



class CityscootAPI extends EventEmitter {
    // Constructor
    constructor() {
        super();
        this.token = '';
        }

    
    // log in the user
    loginUser( callback ) {
        var form = {
            Username:   config.user.username,
            Password:   md5(config.user.username+config.user.password),
            UDID:       config.user.UDID,
            OS:         config.user.OS,
            Version:    config.user.version,
            Material:   config.user.material,
            Token:      '',
            AppVersion: config.user.appversion
        };

        var formData = querystring.stringify(form);
        var contentLength = formData.length;

        var that = this;

        request({
            headers: {
            'Content-Length': contentLength,
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            uri: config.url.base+config.url.login,
            body: formData,
            method: 'POST'
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                console.log(body);
                if (body.Result == 1) {
                    // login success
                    that.token = body.Token;
                    console.log('Successully logged in as ' + body.FirstName + ' ' + body.LastName);
                    console.log('Token = ' + that.token);
                    callback && callback();
                } else if (body.Result == 2) {
                    // password failed
                    console.error("! Error logging in: incorrect password.");
                }
            } else {
                console.error("! Error logging in");
                console.error(formData);
                console.error(response);
                console.error(error);
            }
        });
    }


    fetchScooterList( tokenForced, callback ) {

        var userToken = this.token;

         if ( typeof tokenForced !== 'undefined' && tokenForced ) {
            userToken = tokenForced;
         }

        request({
            headers: {
            'Content-Type': 'application/json'
            },
            uri: "https://api.cityscoot.eu/api/v2/scooter/list?token="+userToken,
            // qs: { token:userToken },
            method: 'GET'
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                console.log("Fetched " + body.reservables_scooters.length + " scooters available right now");
                // console.log(body);
               callback && callback( body.reservables_scooters );
            } else {
                console.error("! Error fetching scooter list");
                console.error(response);
                console.error(error);
            }
        });
    }


    getScooterDetails( scooterID, tokenForced, callback ) {
        var userToken = this.token;
         if ( typeof tokenForced !== 'undefined' && tokenForced ) {
            userToken = tokenForced;
         }

        request({
            headers: {
            'Content-Type': 'application/json'
            },
            uri: "https://api.cityscoot.eu/api/v2/scooter/details?token="+userToken+'&id='+scooterID,
            // qs: { token:userToken },
            method: 'GET'
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                console.log(body);
            } else {
                console.error("! Error fetching scooter list");
                console.error(response);
                console.error(error);
            }
        });
    }


    reserveScooter( scooterID, tokenForced, callback ) {
        var userToken = this.token;
         if ( typeof tokenForced !== 'undefined' && tokenForced ) {
            userToken = tokenForced;
         }

        request({
            headers: {
            'Content-Type': 'application/json'
            },
            uri: "https://api.cityscoot.eu/api/v3/scooter/reserve?token="+userToken+'&id='+scooterID,
            // qs: { token:userToken },
            method: 'GET'
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                console.log(body);
            } else {
                console.error("! Error fetching scooter list");
                console.error(response);
                console.error(error);
            }
        });
    }

cancelReservationScooter( scooterID, tokenForced, callback ) {
        var userToken = this.token;
         if ( typeof tokenForced !== 'undefined' && tokenForced ) {
            userToken = tokenForced;
         }

        request({
            headers: {
            'Content-Type': 'application/json'
            },
            uri: "https://api.cityscoot.eu/api/v3/scooter/reserve/cancel?token="+userToken+'&id='+scooterID,
            // qs: { token:userToken },
            method: 'GET'
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                console.log(body);
            } else {
                console.error("! Error fetching scooter list");
                console.error(response);
                console.error(error);
            }
        });
    }

endReservationScooter( scooterID, tokenForced, callback ) {
        var userToken = this.token;
         if ( typeof tokenForced !== 'undefined' && tokenForced ) {
            userToken = tokenForced;
         }

        request({
            headers: {
            'Content-Type': 'application/json'
            },
            uri: "https://api.cityscoot.eu/api/v3/scooter/reserve/end?token="+userToken+'&id='+scooterID,
            // qs: { token:userToken },
            method: 'GET'
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                console.log(body);
            } else {
                console.error("! Error fetching scooter list");
                console.error(response);
                console.error(error);
            }
        });
    }


remotlyStartReservedScooter( scooterID, tokenForced, callback ) {
        var userToken = this.token;
         if ( typeof tokenForced !== 'undefined' && tokenForced ) {
            userToken = tokenForced;
         }

        request({
            headers: {
            'Content-Type': 'application/json'
            },
            uri: "https://api.cityscoot.eu/api/v3/scooter/reserve/startupScooter?token="+userToken+'&id='+scooterID,
            // qs: { token:userToken },
            method: 'GET'
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                console.log(body);
            } else {
                console.error("! Error fetching scooter list");
                console.error(response);
                console.error(error);
            }
        });
    }

}


module.exports = CityscootAPI;


