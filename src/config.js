var config = {};

config.port = process.env.PORT || '3000';

config.user = {};
config.user.username    = 'ACCOUNT_EMAIL';
config.user.password    = 'ACCOUNT_PASSWORD';
config.user.UDID        = 'IPHONE_UDID';
config.user.OS          = 'ios';        // example
config.user.version     = '11.2.6';     // example
config.user.material    = 'iphone7';    // example
config.user.token       = '';
config.user.appversion  = '3.0.15';      // example

config.url = {};
config.url.base         = 'https://api.cityscoot.eu/api'
config.url.login 		= '/v3/account/login';



module.exports = config;