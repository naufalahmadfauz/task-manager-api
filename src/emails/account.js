// sendgrid  //

// const sgMail = require('@sendgrid/mail')
// const sendgridAPIKey = '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'
//
// sgMail.setApiKey(sendgridAPIKey)
//
// sgMail.send({
//     to: 'naufalahmadfauz@gmail.com',
//     from: 'supernaufalboy@gmail.com',
//     subject:'This Is My First Send Grid Email',
//     text:'I hope this one is work'
// })


// sendin //
//
// var SibApiV3Sdk = require('sib-api-v3-sdk');
// var defaultClient = SibApiV3Sdk.ApiClient.instance;
//
//
// var apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = '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';
//
// var apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
// var emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();
// // var sendEmail = new SibApiV3Sdk.SendEmail();
//
//
// emailCampaigns.name = "Campaign sent via the API";
// emailCampaigns.subject = "My subject";
// emailCampaigns.sender = {"name": "From name", "email":"supernaufalboy@gmail.com"};
// emailCampaigns.type = "classic";
// emailCampaigns.htmlContent = 'Congratulations! You successfully sent this example campaign via the SendinBlue API.',
//
//
//
//
// apiInstance.createEmailCampaign(emailCampaigns).then(function(data) {
//     console.log('API called successfully. Returned data: ' + data);
// }, function(error) {
//     console.error(error);
// });


const mailjet = require ('node-mailjet').connect('8f62401f926b4ceb1a2490f3b5df818a', 'e524b19baccdb986768f4bba996b89f2')
// const naufal = "naufalahmadfauz@gmail.com"
const request = mailjet.post("send", {'version': 'v3.1'})
    .request({
        "Messages":[
            {
                "From": {
                    "Email": "supernaufalboy@gmail.com",
                    "Name": "Naufap"
                },
                "To": [
                    {
                        "Email": "supernaufalboy@gmail.com",
                        "Name": "Naufal Ahmad Fauzan"
                    }
                ],
                "Subject": "Welcome To Task Manager APP.",
                "TextPart": "My first Mailjet email",
                "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
                "CustomID": "AppGettingStartedTest"
            }
        ]
    })
request
    .then((result) => {
        console.log(result.body)
    })
    .catch((err) => {
        console.log(err.statusCode)
    })
