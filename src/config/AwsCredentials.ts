import AWS from 'aws-sdk';



class AWSCredentials {
    public async getCredentials() {
        // chain.resolve((err, cred) => {
        //     if (!err) {
        //         console.log('success: fully got credentials')
        //         AWS.config.credentials = cred;
        //     }
        //     console.error(`failure to get credentials: ${err}`);
        // });

        return AWS.config.credentials;
    }
}

export default new AWSCredentials();


