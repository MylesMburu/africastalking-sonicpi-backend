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

const payments = AfricasTalking.PAYMENTS;

function initiateMobileCheckout() {
    const options = {
        productName: 'groovehub254',
        phoneNumber: '+254759248886',
        currencyCode: 'KES',
        amount: 1.00,
        metadata: {
            foo: 'bar',
            baz: 'foobaz'
        }
    };

    payments.mobileCheckout(options)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });
}

initiateMobileCheckout();

// document.getElementById('yourButtonId').addEventListener('click', initiateMobileCheckout);
