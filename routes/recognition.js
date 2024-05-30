const express = require('express'); // express 선언
const bodyParser = require('body-parser'); 
const router = express.Router();    // router 선언
const { Recognition } = require('../models/Recognition'); // 모델 선언

router.use(bodyParser.json());

// 인식된 전체
router.get('/tabs', (req, res) => {
    Recognition.find().then(recognitions => {
        res.status(200).json({
            success: true, recognitions
        })
    }).catch((err)=>{
        res.json({ success: false, err })
    })
});


// 장소별(category) 인식된 동물만
router.get('/tabs/:category', (req, res) => {  
    Recognition.find({ category: req.params.category })
    .then(recognitions => {
        if (recognitions) {
            res.status(200).json({ success: true, recognitions });
        } else {
            res.status(404).json({ success: false, message: 'Recognition not found' });
        }
    })
    .catch(err => {
        res.status(500).json({ success: false, error: err.message });
    });
});

module.exports = router;