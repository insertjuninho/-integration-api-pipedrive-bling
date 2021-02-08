const axios = require('axios');

const pipeDrive = {
    base_Url:'https://api.pipedrive.com/v1',
    tokenApi:'58a181f0a2a9ddef29c90b3149c147b2a0b708ff',

    list: async() => {
        const response = await axios.get(`${pipeDrive.base_Url}/deals`, {
            params: {
                api_token: pipeDrive.api_token,
                status: 'won'
            }
        });

        const opportunities = response.data;

        return opportunities.data;
    },

        removeDuplicates: (opportunities, idsOrdens) => {
            const newOpportunities =  opportunities.filter(op => !idsOrdens.hasOwnProperty(op.id))

            return newOpportunities;
    }
}

module.exports = pipeDrive;