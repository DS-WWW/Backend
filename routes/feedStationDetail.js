const express = require('express');
const bodyParser = require('body-parser'); 
const router = express.Router();
const { Station } = require('../models/Station'); // 모델 선언

router.use(bodyParser.json());

// 급식소 상세
router.get('/:id', (req, res) => {  
    Station.findById(req.params.id)
    .then(stations => {
        if (stations) {
            res.status(200).json({ success: true, stations });
        } else {
            res.status(404).json({ success: false, message: 'Feed station not found' });
        }
    })
    .catch(err => {
        res.status(500).json({ success: false, error: err.message });
    });
});

module.exports = router;