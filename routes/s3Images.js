const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');


// AWS SDK 설정
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();
const bucketName = process.env.S3_BUCKET_NAME;  // S3 버킷 이름

// 이미지 리스트 가져오기
const getImageDetails = (data) => {
    return data.Contents.map(item => {
        if (!item.Key) {
            return null;
        }
        const key = item.Key;
        const parts = key.split('_');

        if (parts.length < 3) {
            return null; // 파일 이름 형식이 유효하지 않은 경우
        }

        // label과 datetime
        const label = parts[0];
        const datetime = parts[1] + '_' + parts[2].split('.')[0];

        // 날짜와 시간을 데이터 타입으로 변환
        const year = datetime.slice(0, 4);
        const month = datetime.slice(4, 6) - 1; // 월은 0부터 시작하므로 -1
        const day = datetime.slice(6, 8);
        const hour = datetime.slice(9, 11);
        const minute = datetime.slice(11, 13);
        const second = datetime.slice(13, 15);

        // timestamp
        const timestamp = new Date(Date.UTC(year, month, day, hour, minute, second)).toISOString();

        return {
            name: key,
            label: label,
            timestamp: timestamp, 
            url: s3.getSignedUrl('getObject', {
                Bucket: bucketName,
                Key: key,
                Expires: 60 * 5 // URL 유효 기간 5분
            })
        };
    }).filter(item => item !== null); // null인 항목을 필터링
};

// S3 버킷에서 전체 이미지 리스트 가져오기
router.get('/images', async (req, res) => {
    const params = {
        Bucket: bucketName,
    };

    try {
        const data = await s3.listObjectsV2(params).promise();
        const imageDetails = getImageDetails(data);
        res.json(imageDetails);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// S3 버킷에서 라벨별 이미지 리스트 가져오기
router.get('/images/:label', async (req, res) => {
    const labelFilter = req.params.label;
    const params = {
        Bucket: bucketName,
    };

    try {
        const data = await s3.listObjectsV2(params).promise();
        const imageDetails = getImageDetails(data).filter(item => item.label === labelFilter);
        res.json(imageDetails);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


module.exports = router;