const {SESClient}  =  require("@aws-sdk/client-ses");
// Set the AWS Region.
const REGION = "ap-south-1";
// Credentials are automatically resolved using the AWS SDK credential provider chain.
// For more information, see https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html
// Create SES service object.
const sesClient = new SESClient({ region: REGION,credentials:{
    accesKeyId:process.env.AWS_SES_ACCESS_KEY ,
    secretAccesKey:process.env.AWS_SES_SECRET
} });
module.exports =  { sesClient };