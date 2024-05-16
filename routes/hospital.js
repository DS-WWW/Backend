const express = require('express'); // express 선언
const bodyParser = require('body-parser'); 
const router = express.Router();    // router 선언
const { Hospital } = require('../models/Hospital'); // 모델 선언

router.use(bodyParser.json());

router.get('/', (req, res) => {
    Hospital.find().then(hospitals => {
        res.status(200).json({
            success: true, hospitals
        })
    }).catch((err)=>{
        res.json({ success: false, err })
    })
});

// 맵 마커용 데이터 가져오기
router.get("/mapMarker", (req, res) => {
    Hospital.find({}, { _id: 1, name: 1, lat: 1, lng: 1 }) // name, lat, lng 필드만 선택
        .then(hospitals => {
            res.status(200).json({ success: true, hospitals });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err.message });
        });
});

// 검색 이름 기준으로
router.get('/search', (req, res) => {
    const keyword = req.query.keyword; // 검색어 가져오기
    Hospital.find({ name: { $regex: keyword} }) // 부분 검색
        .then(hospitals => {
            res.status(200).json({ success: true, hospitals });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err.message });
        });
});

module.exports = router;