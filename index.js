const request = require('request');
const config = require('config');
const ambient = require('ambient-lib');

const REMO_API_KEY = process.env.REMO_API_KEY || config.REMO_API_KEY;
const REMO_DEVICE_ID = process.env.REMO_DEVICE_ID || config.REMO_DEVICE_ID || 0;
const AMBIENT_CHANNEL_ID = process.env.AMBIENT_CHANNEL_ID || config.AMBIENT_CHANNEL_ID;
const AMBIENT_WRITE_KEY = process.env.AMBIENT_WRITE_KEY || config.AMBIENT_WRITE_KEY;

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
        // prepare data        
        const send_data = {};
        const datas = JSON.parse(body);
        if (datas.length < REMO_DEVICE_ID) {
            console.error('datas.length < REMO_DEVICE_ID');
            callback();
            return;
        }
        const data = datas[REMO_DEVICE_ID];
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
        if (te) {
           send_data.d1 = te.val;
        }
        if (hu) {
            send_data.d2 = hu.val;
        }
        if (il) {
            send_data.d3 = il.val;
        }
        // send to ambient
        ambient.connect(AMBIENT_CHANNEL_ID, AMBIENT_WRITE_KEY);
        ambient.send(send_data, (err2, res2, body2) => {
            if (err2 || res2.statusCode != 200) {
                console.error(`Ambient API Error err:${err2}, res:${res2}`);
                callback();
                return;
            }
            console.log(`[Send] ${JSON.stringify(send_data)}`);
            callback();
        });
    });
};