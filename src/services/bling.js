const axios = require('axios');
const xml = require('xml');
const FormData = require('form-data');
const { response } = require('express');


const bling = {
    base_url: 'https://bling.com.br/Api/v2',
    api_key: 'b0ccab4ed68422d3d487bded1160b4cdebf340e044d13d9dbc21e22d3aa9a1c154e3558c',

    orders: async () => {
        console.log("TO AQ", bling.base_url)
        const response = await axios.get(`${bling.base_url}/pedidos/json`, {
            params:{
                api_key: bling.api_key
            }
        });

        let orders = response.data;

        orders = orders.retorno.pedidos.map(order => order.pedido);

        return orders;
    },

    ids: orders => {
        const ids = {};

        orders.forEach(order =>{
            ids[order.numeroOrdemCompra] = true;
        });
        return ids;
    },

    prepare: async opportunities => {
        var xmls = [];
        var xmlString;

        opportunities.forEach(opportunities => {
        xmlString = xml ({
            pedido: [
                {
                    numeroOrdemCompra: opportunities.id
                },
                {
                    cliente: [
                        {
                            nome: opportunities.org_id.name
                        }
                    ]
                },
                {
                    items: [
                        {
                            item:[
                                {
                                    codido: 1
                                }
                            ]
                        }
                    ]
                }
            ]
        }, {
            declation: true,
        });
        xmls.push(xmlString)
    });
        return xmls;
    },
    
    createOrders: async newOpportunities => {
        const xmlString = await bling.prepare(newOpportunities);
        let amount = 0;

        for (let i = 0; index < newOpportunities.length; i++) {
            const form = new FormData();

            form.append('apiKey', bling.api_key);
            form.append('xml', xmlString[i]);

            let res = await axios.post(`${bling.base_url}/pedido/json`, form, {
                headers: form.getHeader()
            });

            amount += newOpportunities[i].value;
        }

        return amount;
    }
}

module.exports = bling;