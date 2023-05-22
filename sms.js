require('dotenv').config();

// // Set your app credentials
const apikey = process.env.API_KEY

const credentials = {
    apiKey: apikey,
    username: 'deltabk',
}

console.log(apikey)

// Initialize the SDK
const AfricasTalking = require('africastalking')(credentials);

// Get the SMS service
// const sms = AfricasTalking.SMS;

function sendMessage() {
    const options = {
        // Set the numbers you want to send to in international format
        to: ['+254759248886'],
        // Set your message
        message: "Thank you for downloading music from our app. ",
        // Set your shortCode or senderId
        from: ''
    }

    // That’s it, hit send and we’ll take care of the rest
    sms.send(options)
        .then(console.log)
        .catch(console.log);
}

sendMessage();