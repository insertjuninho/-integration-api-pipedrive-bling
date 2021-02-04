const axios = require('axios');

const pipeDrive = {
    base_Url:'https://api.pipedrive.com/v1',
    tokenApi:'659c9fddb16335e48cc67114694b52074e812e03',

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