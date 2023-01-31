const mongoose = require('mongoose')

const ProducstModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name dor the products']        
    },
    description:{
        type: String,
        required:[true, 'Please write a brief description']
    },
    price:{
        type: Double,
        required:[true, 'Please let customer knows the price of your item']
    },
    category:{
        type: String,
        enum:['info products', 'electronics', 'health', 'software', 'others'],
        default: 'info products'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'userModel',
        required: [true, 'Please provide a user']
    }
    
}, {timestamps:true})

module.exports = mongoose.model('productsPro2', ProducstModel)