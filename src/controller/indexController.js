const axios = require ('axios');
const Order = require('../models/Order');
const pipeDrive = require('../services/pipeDrive');
const bling = require('../services/bling');
const { orders } = require('../services/bling')

module.exports = {
    
    async full(resquest, response){

        const negocios = await pipeDrive.list();
        const orders   = await bling.orders();
        const idsOrdens = bling.ids(orders);
        const newNegocios = pipeDrive.removeDuplicates(negocios, idsOrdens);

        if (newNegocios.legth == 0) {
            return response.status(404).json({
                message:'Não tem novos negocios para adicionar como pedido'
            });
        }

        const newAmount = await bling.createOrders(newNegocios);

        if (!newAmount) {
            return response.status(500).json({
                message:'Errou enquanto cria a ordem'
            })
        }

        const date = new Date().toISOString().slice(0, 10);
        const dateIdsOrders = await Order.findOne({ date: date });

        if (dateIdsOrders) {
            await Order.updateOne(
                { 
                    _id: dateIdsOrders._id
                }, 
                { 
                    $set: {
                         amout: dateIdsOrders.amout + newAmount
                        }
                    });
        }else{
            await Order.create({ 
                    date : 'date' , 
                    amout: newAmount
                });
        }

        return response.status(200).json({
            message:'Success'
        })
    },

    async allOrders(request, response){
        const all = await Order.find();

        if (!all) {
            return response.status(404).json();
        }

        return response.status(200).json(all)
    }
} 