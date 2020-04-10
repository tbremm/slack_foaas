// This file is for communicating with the FOAAS API

const axios = require("axios");


class Foaas {

    // url:     Base FOAAS URL
    // args:    Determines what API path is called
    //          See https://www.foaas.com/ for details
    async getFO(url, ...args) {
        try {
            // build the api call
            let strFO = '';
            for (let arg of args) {
                strFO += '/' + arg;
            }
            const response = await axios.get(url + strFO);
            console.log(response);
            return response.data; //([response.data.message, response.data.subtitle]);
        } catch (error) {
            console.log(error);
        }
    }
};


module.exports = {
    Foaas: Foaas
}