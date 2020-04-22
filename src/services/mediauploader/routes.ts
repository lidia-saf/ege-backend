import express  from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import AwsCredentials from '../../config/AwsCredentials';
import fs from 'fs';
import authorizationHandler from '../../config/AuthorizationHandler';

const upload = multer({dest: '/tmp/uploads/'});

const router = express.Router();

router.post('/', upload.single('file'), async function (req, res, next) {
    if (!authorizationHandler.verifyJwt(req, res)) {
        return;
    };

    // @ts-ignore
    let credentials: AWS.Credentials = await AwsCredentials.getCredentials();

    AWS.config.update({
        region: 'eu-central-1',
        credentials: credentials
    });

    let file = req.file;
    let fileKey = `${req.body.filename}.${req.file.originalname}`;
    let filestream = fs.createReadStream(file.path);

    let params = {
        Bucket: 'ege-image-bucket',
        Key: fileKey,
        Body: filestream,
        ACL: 'public-read'
    }

    let upload = new AWS.S3.ManagedUpload({ params });
    let promise = upload.promise();
    promise.then((data) => {
            console.log("Successfully uploaded photo.", data);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).end(JSON.stringify(data));
        },(err) => {
            console.log("There was an error uploading your photo: ", err.message);
            res.status(500).end(JSON.stringify(err));
        }
    ).then(() => {
        fs.unlinkSync(req.file.path);
    })
})

export default router;
