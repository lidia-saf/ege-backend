import AWS from 'aws-sdk';

class AWSCredentials {

    public async getCredentials() {
        return new Promise(function (resolve, reject) {
            AWS.config.getCredentials(async function(err) {
                if (err) {
                    console.log('Error getting credentials', err);
                    return reject(err);
                } else {
                    console.log('Successfully got credentials');
                    resolve(AWS.config.credentials);
                }
            });
        });
    }
}

export default new AWSCredentials();


