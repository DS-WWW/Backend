const express = require('express');
const bodyParser = require('body-parser'); 
const router = express.Router();
const { Station } = require('../models/Station'); // 모델 선언
const { IoT, IoT2 } = require('../models/IoT');

router.use(bodyParser.json());


// 급식소 조회
router.get("/", async (req, res) => {
    try {
        // 모든 스테이션 데이터 가져오기
        const stations = await Station.find({}, { _id: 1, name: 1, lat: 1, lng: 1 });

        if (!stations.length) {
            return res.status(404).json({ success: false, message: '스테이션을 찾을 수 없습니다.' });
        }

        // 각 스테이션에 대해 가장 최근의 IoT 데이터 가져오기
        const results = await Promise.all(stations.map(async (station) => {
            let latestIoTData;

            if (station.name === "덕성여자대학교 정문") {
                latestIoTData = await IoT.find({
                    station_name: new RegExp(`^${station.name}$`, 'i') // 대소문자 무시 정규 표현식
                })
                .sort({ time: -1, count: -1 }) // time을 기준으로 내림차순 정렬 후 count를 기준으로 내림차순 정렬
                .limit(1)
                .exec();
            } else if (station.name === "덕성여자대학교 도서관") {
                latestIoTData = await IoT2.find({
                    station_name: new RegExp(`^${station.name}$`, 'i') // 대소문자 무시 정규 표현식
                })
                .sort({ time: -1, count: -1 }) // time을 기준으로 내림차순 정렬 후 count를 기준으로 내림차순 정렬
                .limit(1)
                .exec();
            }

            if (!latestIoTData || latestIoTData.length === 0) {
                return {
                    id: station._id.toString(),
                    name: station.name,
                    lat: station.lat,
                    lng: station.lng,
                    weight: null,
                    water_level: null,
                    time: null,
                    count: null,
                };
            }

            const latestData = latestIoTData[0];

            return {
                id: station._id.toString(),
                name: station.name,
                lat: station.lat,
                lng: station.lng,
                weight: latestData.weight,
                water_level: latestData.water_level,
                time: latestData.time,
                count: latestData.count,
            };
        }));

        res.status(200).json({ success: true, stations: results });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
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

// 최신 업데이트 시간 가져오기
router.get("/update-time", async (req, res) => {
    try {
        const latestData = await IoT.findOne().sort({ time: -1 }).exec();
        
        if (!latestData) {
            return res.status(404).json({ success: false, message: '데이터를 찾을 수 없습니다.' });
        }

        res.status(200).json({ success: true, updateTime: latestData.time });
    } catch (err) {
        console.error(err); // 에러 로그 추가
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;