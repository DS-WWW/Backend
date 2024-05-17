const express = require('express');
const bodyParser = require('body-parser'); 
const router = express.Router();
const { Station } = require('../models/Station'); // 모델 선언

router.use(bodyParser.json());


// 급식소 조회
router.get("/", (req, res) => {
    Station.find() 
        .then(stations => {
            res.status(200).json({ success: true, stations });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err.message });
        });
});


// 맵 마커용 데이터 배열
router.get("/dsMapMarker", (req, res) => {
    Station.find({}, { _id: 1, name: 1, lat: 1, lng: 1 }) // name, lat, lng 필드만 선택
        .then(stations => {
            res.status(200).json({ success: true, stations });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err.message });
        });
});



module.exports = router;