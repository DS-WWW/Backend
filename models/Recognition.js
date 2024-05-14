const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recognitionSchema = mongoose.Schema({
    name: {     // 이름
        type: String
    },
    imageUrl: {  // 이미지
        type: String
    },
    category: {      // 카테고리
        type: String
    }
}, { timestamps: true });

const Recognition = mongoose.model('Recognition', recognitionSchema);

module.exports = { Recognition };