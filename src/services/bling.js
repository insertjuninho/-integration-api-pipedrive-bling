const axios = require('axios');
const xml = require('xml');
const FormData = require('form-data');
const { response } = require('express');

const bling = {
    base_url: '',
    api_key: '',

    orders: async () => {
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
    }

}