// 급식소

const express = require('express');
const bodyParser = require('body-parser'); 
const router = express.Router();

router.use(bodyParser.json());

const stations = [
    {
        'id': 'abc',
        'name': '덕성여자대학교 정문',
        'feed': 100,
        'water': 50
    },
    {
        'id': 'def',
        'name': '덕성여자대학교 후문',
        'feed': 110,
        'water': 40
    },
    {
        'id': 'ghi',
        'name': '덕성여자대학교 도서관',
        'feed': 150,
        'water': 80
    }
];


// 급식소 조회
router.get('/', (req, res) => {
    res.json(stations);
});

// 생성
router.post('/', (req, res) => {
    // console.log(req.body);
    stations.push(req.body);    
    res.json(stations);    
});

// 업데이트
router.put('/:id', (req, res) => {
    const stationId = req.params.id;
    const updatedStation = req.body;

    let foundIndex = stations.findIndex(s => s.id === stationId);   
    if (foundIndex === -1) {
        res.status(404).json({errorMessage: 'not found' });
    } else {
        stations[foundIndex] = {...stations[foundIndex], ...updatedStation};    
        // stations[foundIndex] = updatedStation;
        res.json(stations[foundIndex]);
    }
});

// 삭제
router.delete('/:id', (req, res) => {
    const stationId = req.params.id;

    let foundIndex = stations.findIndex(s => s.id === stationId);   
    if (foundIndex === -1) {
        res.status(404).json({errorMessage: 'not found' });
    } else {
        // let foundStation = stations.splice(foundIndex, 1);
        // res.json(foundStation[0]);
        stations.splice(foundIndex, 1);     
    }
});



// 급식소 상세
router.get('/:id', (req, res) => {  
    // console.log(req.params.id)
    const station = stations.find((s) => {
        return s.id === req.params.id;
    });
    if (station) {
        res.json(station);
    } else {
        res.status(404).json({ errorMessage: "not found" });
    }
});

// 맵 마커용 데이터 배열
// router.get('/getMapMarker', (req, res) => {

// });


// router.post
// router.put
// router.delete

module.exports = router;