#### An api wrapper for https://sms-activate.org/

`npm install @cexyboy/smsactivate-api`
```js
const SMSActivate = require('@cexyboy/smsactivate-api')
/*
   This lib supports every single feature sms-activate has to offer, even some undocumented endpoints.
   This is just a short example of some methods.
*/
const client = new SMSActivate("your_api_key")
(async() => {
    let number = await client.orderNumber("ot", {country: "0"}) // Ordering "any other" service with russian number
    let status = await client.getNumberStatus(number.activationId) // Returns current status for the number
    let fullSMS = await client.getFullSms(number.activationId) // Returns full sms that the number received, if the sms is not received it will return status
    let setStatus = await client.setNumberStatus(number.activationId, "1") // Inform about the readiness of the number (SMS sent to the number)
    let completeStatus = await client.setNumberStatus(number.activationId, "6") // Complete activation
})();
```

**For any issues/errors please open an issue in this repo and i will fix your issue**
