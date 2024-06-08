const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    name: {     // 이름
        type: String
    },
    lat: {      // 위도
        type: Number
    },
    lng: {      // 경도
        type: Number
    }
})

const Station = mongoose.model('Station', stationSchema)

module.exports = { Station }