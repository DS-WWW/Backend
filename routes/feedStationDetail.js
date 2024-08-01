const express = require('express');
const bodyParser = require('body-parser'); 
const router = express.Router();
const { IoT, IoT2 } = require('../models/IoT'); 

router.use(bodyParser.json());


// 각 급식소의 데이터 가져오기
router.get("/:name", async (req, res) => {
    try {
        const station_name = decodeURIComponent(req.params.name); // URL 인코딩된 문자열을 디코딩
        console.log(`Fetching IoT data for station: ${station_name}`);

        // IoT 데이터 가져오기
        let iotData;
        if (stationName === "덕성여자대학교 정문") {
            iotData = await IoT.find({
                station_name: new RegExp(`^${station_name}$`, 'i')
            }).sort({ time: -1, count: -1 }).exec();
        } else if (stationName === "덕성여자대학교 도서관") {
            iotData = await IoT2.find({
                station_name: new RegExp(`^${station_name}$`, 'i')
            }).sort({ time: -1, count: -1 }).exec();
        } else {
            console.log('Station not found');
            return res.status(404).json({ success: false, message: '해당 스테이션을 찾을 수 없습니다.' });
        }

        console.log(`Found ${iotData.length} records`);
        res.status(200).json({ success: true, iotData });
    } catch (err) {
        console.error('Error fetching IoT data:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;