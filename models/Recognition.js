const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recognitionSchema = mongoose.Schema({
    title: {     // 이름
        type: String
    },
    img: {  // 이미지
        type: String
    },
    category: {      // 카테고리
        type: String
    },
    date: {
        type: Date
    }
});

const Recognition = mongoose.model('Recognition', recognitionSchema);

module.exports = { Recognition };