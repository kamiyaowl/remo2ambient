const request = require('request');
const config = require('config');

const REMO_API_KEY = process.env.REMO_API_KEY || config.REMO_API_KEY;

exports.update = (event, callback) => {
    request.get({
        url: 'https://api.nature.global/1/devices',
        headers: {
            'Authorization': `Bearer ${REMO_API_KEY}`,
        },
     }, (err, res, body) => {
        if(err || res.statusCode !== 200) {
            console.error(`Remo API Error err:${err}, res:${res}`);
            callback();
            return;
        }
        const datas = JSON.parse(body);
        datas.forEach(data => {
            const name = data.name;
            const te_offset = data.temperature_offset;
            const hu_offset = data.humidity_offset;
            const newest_events = data.newest_events;
            if (!newest_events) {
                console.error('newest_events not found');
                callback();
                return;
            }
            const te = newest_events.te;
            const hu = newest_events.hu;
            const il = newest_events.il;
            callback(data);
        });
    });
};