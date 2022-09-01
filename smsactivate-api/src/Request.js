const fetch = require('node-fetch')
const formatter = require('./Formatter')
module.exports = class {
    constructor(api_key) {
        this.key = api_key
        this.url = `https://api.sms-activate.org/stubs/handler_api.php?api_key=${api_key}`
        this.formatter = formatter
    }

    async request(method, action, params, json=true) {
        let r = await fetch(`${this.url}&action=${action}${Object.keys(params).length > 0 ? `&${new URLSearchParams(params).toString()}` : ``}`,{
            method: method
        })
        let res = await r.text()
        if (json) {
            try {
                return JSON.parse(res)
            } catch(e) {
                return {error: res.replace("BAD_KEY", "INVALID_API_KEY")}
            }
        }
    }
    async requestPost(url, body, headers) {
        let r = await fetch(url, {
            method: "POST",
            body: body,
            headers: headers
        })
        let res = await r.text()
        try {
            return JSON.parse(res)
        } catch(e) {
            return {error: res.replace("BAD_KEY", "INVALID_API_KEY")}
        }
    }
}