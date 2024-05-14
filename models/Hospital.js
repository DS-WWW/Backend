const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name: {     // 이름
        type: String
    },
    address: {  // 주소
        type: String
    },
    lat: {  // 위도
        type: Number
    },
    lng: {  // 경도
        type: Number
    },
    workingHours: {   // 운영시간
        type: String
    },
    website: {  // 웹사이트
        type: String
    }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = { Hospital };