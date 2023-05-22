const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const credentials = require('./credentials');
const AfricasTalking = require('africastalking')(credentials)

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const airtime = AfricasTalking.AIRTIME;

// the users phone number - should be passed from front-end
const phoneNumber = "+254743380666"

function sendAirtime(phoneNumber) {
    const options = {
        maxNumRetry: 3, // Will retry the transaction every 60seconds for the next 3 hours.
        recipients: [{
            phoneNumber: phoneNumber,
            currencyCode: "KES",
            amount: 5
        }]
    };

    airtime.send(options)
        .then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
}

// airtime function with the users phone number
sendAirtime(phoneNumber);


// Start the Express server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});