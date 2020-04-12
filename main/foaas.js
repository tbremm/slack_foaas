// This file is for communicating with the FOAAS API
const axios = require('axios');


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
            if (!response.data.message || !response.data.subtitle) {
                response.data = {
                    message: 'Please follow the correct format and use the correct number of arguments. :face_with_rolling_eyes:',
                    subtitle: 'Mr.  Robot'
                };
            }
            return response.data; // ([response.data.message, response.data.subtitle]);
        } catch (error) {
            console.log(error);
        }
    };

    
    // response.body JSON schema is:
    // [
    // {
    //     "name": "Who the fuck are you anyway",
    //     "url": "/anyway/:company/:from",
    //     "fields": [
    //         {
    //             "name": "Company",
    //             "field": "company"
    //         },
    //         {
    //             "name": "From",
    //             "field": "from"
    //         }
    //     ]
    // }
    // ]
    async getOperations(url) {
        try {
            const response = await axios.get(url + '/operations');
            return (response.data);
        } catch (error) {
            console.log(error);
        }
    }
};


module.exports = {
    Foaas: Foaas
}