const express = require('express'); //express 모듈을 가져옴
const bodyParser = require('body-parser'); //새 앱을 만듦
const cors = require('cors'); // cors 모듈 가져옴
const fs = require('fs');
const config = require('./config/key');

const app = express();
const PORT = 8080;

// JSON 파싱을 위한 미들웨어 설정
app.use(bodyParser.json());

// CORS 미들웨어 설정
app.use(cors());

// 몽고디비 연결
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
    }).then(() => 
    console.log('MongoDB connected')).catch(() => console.log('failed'));

const feedStation = require('./routes/feedStation');
const feedStationDetail = require('./routes/feedStationDetail');
const hospital = require('./routes/hospital');
const recognition = require('./routes/recognition');

app.use('/api/feedStation', feedStation);
app.use('/api/feedStationDetail', feedStationDetail);
app.use('/api/hospital', hospital);
app.use('/api/recognition', recognition);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
