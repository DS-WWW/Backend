const mongoose = require('mongoose');

const iotSchema = new mongoose.Schema({
    weight: {        // 무게
        type: Number
    },
    water_level: {   // 수위
        type: Number
    },
    time: {          // 측정 시간
        type: String
    },
    count: {         // 카운트
        type: Number
    },
    station_name: {
        type: String
    }
});


const IoT = mongoose.model('IoT', iotSchema, ' test1');
const IoT2 = mongoose.model('IoT2', iotSchema, 'iot2'); 

module.exports = { IoT, IoT2 };
