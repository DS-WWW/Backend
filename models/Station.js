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
    },
    feed: {      // 먹이
        type: Number
    },
    water: {      // 물
        type: Number
    },
    time: {
        type: Date  // 측정 시간
    }
})

const Station = mongoose.model('Station', stationSchema)

module.exports = { Station }