// This file is for communicating with the FOAAS API

const axios = require("axios");

class Foaas {

    // url:     Base FOAAS URL
    // arg1:    First argument to FOAAS api (https://www.foaas.com/arg1)
    // arg2:    Second argument to FOAAS api (https://www.foaas.com/arg1/arg2)
    async getFO(url, ...args) {
        try {
            // build the api call
            let strFO = '';
            for (let arg of args) {
                strFO += '/' + arg;
            }

            const response = await axios.get(url + strFO);
            console.log(response);
            return ([response.data.message, response.data.subtitle]);
        } catch (error) {
            console.log(error);
        }
    }
};



module.exports = {
    Foaas: Foaas
}