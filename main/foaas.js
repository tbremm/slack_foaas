// This file is for communicating with the FOAAS API

const axios = require("axios");


class Foaas {

    // url:     Base FOAAS URL
    // args:    Determines what API path is called
    //          See https://www.foaas.com/ for details
    async getFO(url, args) {
        try {
            // build the api command
            let strFO = '';
            for (let i = 0; i < args.length; i++) {
                strFO += '/' + args[i];
            }
            const response = await axios.get(url + strFO);
            return response.data; // ([response.data.message, response.data.subtitle]);
        } catch (error) {
            console.log(error);
        }
    }
};


module.exports = {
    Foaas: Foaas
}