const express = require('express'); //express 모듈을 가져옴
const bodyParser = require('body-parser'); //새 앱을 만듦
const fs = require('fs');
const config = require('./config/key');

const app = express();
const PORT = 3000;

// JSON 파싱을 위한 미들웨어 설정
app.use(bodyParser.json());

// 몽고디비 연결
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
    }).then(() => 
    console.log('MongoDB connected')).catch(() => console.log('failed'));

const feedStation = require('./routes/feedStation');
//const feedStationDetail = require('./routes/feedStationDetail');
// const hospital = require('./routes/hospital');
// const recognition = require('./routes/recognition');

app.use('/api/feedStation', feedStation);
//app.use('/api/feedStationDetail', feedStationDetail);
// app.use('/api/hospital', hospital);
// app.use('/api/recognition', recognition);

app.get('/', (req,res)=> {
    res.send('hello express!');
})

// 메모 목록 조회
app.get('/memos', (req, res) => {
    fs.readFile('memos.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(JSON.parse(data));
    });
});

// 메모 생성
app.post('/memos', (req, res) => {
    const newMemo = req.body;
    fs.readFile('memos.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        const memos = JSON.parse(data);
        memos.push(newMemo);

        fs.writeFile('memos.json', JSON.stringify(memos), (err) => {
            if (err) {
                res.status(500).send('Internal Server Error');
                return;
            }

            res.status(201).send('Memo created successfully');
        });
    });
});

// 메모 업데이트
app.put('/memos/:id', (req, res) => {
    const memoId = req.params.id;
    const updatedMemo = req.body;

    fs.readFile('memos.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        let memos = JSON.parse(data);
        const memoIndex = memos.findIndex(memo => memo.id === memoId);

        if (memoIndex === -1) {
            res.status(404).send('Memo not found');
            return;
        }

        memos[memoIndex] = updatedMemo;

        fs.writeFile('memos.json', JSON.stringify(memos), (err) => {
            if (err) {
                res.status(500).send('Internal Server Error');
                return;
            }

            res.status(200).send('Memo updated successfully');
        });
    });
});

// 메모 삭제
app.delete('/memos/:id', (req, res) => {
    const memoId = req.params.id;

    fs.readFile('memos.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        let memos = JSON.parse(data);
        const memoIndex = memos.findIndex(memo => memo.id === memoId);

        if (memoIndex === -1) {
            res.status(404).send('Memo not found');
            return;
        }

        memos.splice(memoIndex, 1);

        fs.writeFile('memos.json', JSON.stringify(memos), (err) => {
            if (err) {
                res.status(500).send('Internal Server Error');
                return;
            }

            res.status(200).send('Memo deleted successfully');
        });
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
