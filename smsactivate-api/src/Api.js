const Request = require('./Request')


module.exports = 
class Api {
    /** 
     * @param {string} api_key Your api key from https://sms-activate.org/en/profile
    */
    constructor(api_key) {
        this.key = api_key;
        this.Request = new Request(api_key);
        this.balance = {}
    }

    /**
     * Returns your current balance (can also be accessed by this.balance) to update use this function
     */
    async getBalance() {
        this.balance = await this.Request.request(
            "GET",
            "getBalance",
            {},
            false
        )
        return this.balance;
    }

    /**
     * Returns all active numbers
     */
    async getActiveActivations() {
        return await this.Request.request(
            "GET",
            "getActiveActivations",
            {}
        )
    }

    /**
    * @param service Service to order see order table at https://sms-activate.org/en/api2#number
    * @param params Params options at https://sms-activate.org/en/api2#number
    */

    async orderNumber(service, params={}) {
        return await this.Request.request(
            "GET",
            "getNumberV2",
            Object.assign({service: service}, params)
        )
    }

    /**
     * @param {string} activationId activationId that you get when you first ordered the number
     * @param {string} status View status numbers at https://sms-activate.org/en/api2#changeStatus
     * @param {object} params This endpoint only supports one param which is `forward` and should only be used if u used forward when ordering the number
     */

    async setNumberStatus(activationId, status, params={}) {
        return await this.Request.request(
            "GET",
            "setStatus",
            Object.assign({id: activationId, status: status}, params),
            false
        )
    }

    /**
     * @param {string} activationId activationId that you get when you first ordered the number
     */
    async getNumberStatus(activationId) {
        return await this.Request.request(
            "GET",
            "getStatus",
            {id: activationId},
            false
        )
    }

    /**
     * @param {object} params Supports service & country (https://sms-activate.org/en/api2#prices)
     */
    async getPricesByCountry(params={}) {
        return await this.Request.request(
            "GET",
            "getPrices",
            params
        )
    }

    async getCountries() {
        return await this.Request.request(
            "GET",
            "getCountries",
            {}
        )
    }

    /**
     * 
     * @param {object} params Supports service & freePrice (https://sms-activate.org/en/api2#quantity)
     */
    async getTopCountriesByService(params={}) {
        return await this.Request.request(
            "GET",
            "getTopCountriesByService",
            params
        )
    }

    /**
     * @param {object} params Supports country param only (https://sms-activate.org/en/api2#operators)
     */
    async getOperators(params={}) {
        return await this.Request.request(
            "GET",
            "getOperators",
            params
        )
    }
    /**
     * Get the status of an incoming call (https://sms-activate.org/en/api2#getIncomingCallStatus)
     * @param {*} activationId 
     */
    async getIncomingCallStatus(activationId) {
        return await this.Request.request(
            "GET",
            "getIncomingCallStatus",
            {id: activationId}
        )
    }

    /**
     * Having received the first SMS for redirected numbers, you can buy other related services such as Yula, Yandex, Avito, Any other (https://sms-activate.org/en/api2#additionalService)
     * @param {string} activationId Parent activationId
     * @param {string} service Service to order see order table at https://sms-activate.org/en/api2#additionalService
     */
    async getAdditionalService(activationId, service) {
        return await this.Request.request(
            "GET",
            "getAdditionalService",
            {id: activationId, service: service},
            false
        )
    }

    /**
     * If you have made a successful activation on the number, then you can do it again. (https://sms-activate.org/en/api2#additionalActivation)
     * The cost of additional activation is determined depending on the country and service. The specific cost can be obtained from this query.
     * @param {string} activationId Parent activationId
     */
    async getExtraActivation(activationId) {
        return await this.Request.request(
            "GET",
            "getExtraActivation",
            {activationId: activationId},
            false
        )
    }

    /**
     * You can find out the availability of the number for additional activation and get its cost (https://sms-activate.org/en/api2#additionalActivationPrice)
     * The cost of additional activation depends on the time that has passed since the main activation. If the base cost is 50 rubles, then the final cost will be: 50 x *number of months from the date of the main activation*
     * @param {string} activationId Parent activationId
     */
    async checkExtraActivation(activationId) {
        return await this.Request.request(
            "GET",
            "checkExtraActivation",
            {activationId: activationId},
            false
        )
    }

    /**
     * After ordering an outgoing call, you can check the status of the application(s). By default, requests for the current day are returned. (https://sms-activate.org/en/api2#getOutgoingCalls)
     * @param {object} params Supports activationId and date param 
     */
    async getOutgoingCalls(params={}) {
        return await this.Request.request(
            "GET",
            "getOutgoingCalls",
            params
        )
    }

    /**
     * https://sms-activate.org/en/api2#quantityAr
     * @param {string || array} operator mobile number operator, you can specify several numbers separated by passing an array
     * @param {object} params Supports time and country params
     */
    async getRentServicesAndCountries(operator, params={}) {
        return await this.Request.request(
            "GET",
            "getRentServicesAndCountries",
            Object.assign({ operator: Array.isArray(operator) ? operator.join(",") : operator }, params)
        )
    }

    /**
     * https://sms-activate.org/en/api2#numberAr
     * @param {string} service the service for which you need to get a number
     * @param {object} params Supports time, operator, country & url
     */
    async getRentNumber(service, params={}) {
        if (Array.isArray(params.operator)) params.operator = params.operator.join(",")
        return await this.Request.request(
            "GET",
            "getRentNumber",
            Object.assign({service: service}, params)
        )
    }

    /**
     * https://sms-activate.org/en/api2#getStatusAr
     * @param {string} rentalId rental id received in the response when ordering a phone
     */
    async getRentStatus(rentalId) {
        return await this.Request.request(
            "GET",
            "getRentStatus",
            {id: rentalId}
        )
    }

    /**
     * https://sms-activate.org/en/api2#setStatusAr
     * @param {string} rentalId rental id received in the response when ordering a phone
     * @param {string} status code for changing the status (1=finish 2=cancel)
     */
    async setRentStatus(rentalId, status) {
        return await this.Request.request(
            "GET",
            "setRentStatus",
            {id: rentalId, status: status}
        )
    }

    /**
     * https://sms-activate.org/en/api2#getRentListAr
     */
    async getRentActivationsList() {
        return await this.Request.request(
            "GET",
            "getRentList",
            {}
        )
    }

    /**
     * https://sms-activate.org/en/api2#continueRentAr
     * @param {string} rentalId rental id received in the response when ordering a phone
     * @param {string} params Supports something... documentation has some error but i think its time.
     */
    async renewRentNumber(rentalId, params={}) {
        return await this.Request.request(
            "GET",
            "continueRentNumber",
            Object.assign({id: rentalId}, params)
        )
    }

    /**
     * https://sms-activate.org/en/api2#getContinueRentPriceAr
     * @param {string} rentalId rental id received in the response when ordering a phone
     */
    async getContinueRentPriceNumber(rentalId) {
        return await this.Request.request(
            "GET",
            "getContinueRentPriceNumber",
            {id: rentalId}
        )
    }
    /**
     * This endpoint is undocumented and does not use your api-key, but this returns the country table in a nice format. I would recommend this over getCountries()
     */
    async getCountriesTable() {
        return await this.Request.requestPost(
            "https://sms-activate.org/api/api.php",
            "act=getCountriesList",
            {'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        )
    }

    /**
     * This endpoint is undocumented and does not use your api-key, but this returns the service table in a nice format.
     */
    async getServicesTable() {
        return await this.Request.requestPost(
            "https://sms-activate.org/api/api.php",
            "act=getServicesList",
            {'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        )
    }

    /**
     * This endpoint isn't documented either apparently, but returns the full sms content that the provider sent to the number.
     * @param {*} activationId activationId that you get when you first ordered the number
     */
    async getFullSms(activationId) {
        return await this.Request.request(
            "GET",
            "getFullSms",
            {id: activationId}
        )
    }

    /**
     * This endpoint is undocumented and does not use your api-key, but this returns the operator table in a nice format.
     */
    async getOperatorsList() {
        return await this.Request.requestPost(
            "https://sms-activate.org/api/api.php",
            "act=getOperatorsList",
            {'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        )
    }
}