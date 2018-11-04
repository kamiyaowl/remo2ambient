const request = require('request');
const config = require('config');

const REMO_API_KEY = process.env.REMO_API_KEY || config.REMO_API_KEY;

exports.update = (event, callback) => {
    request.get({
        url: 'https://api.nature.global/1/users/me',
        headers: {
            'Authorization': `Bearer ${REMO_API_KEY}`,
        },
     }, (err, res, body) => {
        if(err || res.statusCode !== 200) {
            console.error(err, res);
            callback();
            return;
        }
        const data = JSON.parse(body);
        callback(data);
    });
};