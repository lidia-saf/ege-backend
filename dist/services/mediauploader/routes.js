"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const AwsCredentials_1 = __importDefault(require("../../config/AwsCredentials"));
const fs_1 = __importDefault(require("fs"));
const AuthorizationHandler_1 = __importDefault(require("../../config/AuthorizationHandler"));
const upload = multer_1.default({ dest: '/tmp/uploads/' });
const router = express_1.default.Router();
router.post('/', upload.single('file'), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        AuthorizationHandler_1.default.verifyJwt(req, res);
        // @ts-ignore
        let credentials = yield AwsCredentials_1.default.getCredentials();
        aws_sdk_1.default.config.update({
            region: 'eu-central-1',
            credentials: credentials
        });
        let file = req.file;
        let fileKey = `${req.body.filename}.${req.file.originalname}`;
        let filestream = fs_1.default.createReadStream(file.path);
        let params = {
            Bucket: 'ege-image-bucket',
            Key: fileKey,
            Body: filestream,
            ACL: 'public-read'
        };
        let upload = new aws_sdk_1.default.S3.ManagedUpload({ params });
        let promise = upload.promise();
        promise.then((data) => {
            console.log("Successfully uploaded photo.", data);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).end(JSON.stringify(data));
        }, (err) => {
            console.log("There was an error uploading your photo: ", err.message);
            res.status(500).end(JSON.stringify(err));
        }).then(() => {
            fs_1.default.unlinkSync(req.file.path);
        });
    });
});
exports.default = router;
//# sourceMappingURL=routes.js.map