const express = require('express')
const app = express()
const {products} = require('../data/data1')
const userModel = require('../models/userModel')
const productsModel = require('../models/productsModel')
const {BadRequestError, NotFoundError} = require('../errors')

// GET ALL
const get_all = async(req, res)=>{
    const allData = await productsModel.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(200).json({ allData, count:allData.length })
    
}
// GET SINGLE 
const get_single = async (req, res)=>{
    const { user: { userId }, params: { id: productId } } = req

    const foundProduct = await productsModel.findOne({_id: productId, createdBy: userId})
    if(!foundProduct){
        throw new BadRequestError(`I did not found any product with id: ${productId}`)
        // res.status(401).json({msg: `id ${productId} does not exists`})
    }
    res.status(200).json({ foundProduct })
}
// POST 
const postItem = async (req, res)=>{
    req.body.createdBy = req.user.userId
    const productsModel = require('../models/productsModel')
    const product = await productsModel.create(req.body)
    res.status(201).json({product})
    
}

// UPDATE
const updateItem = async (req, res)=>{
    const {user: {userId}, params:{id:productId}} = req
    const {name, description, price} = req.body
    if(name === '' || description === '' || price === ''){
        res.status(401).json({msg: 'Name, description and Price cannot be empty'})
    }
    const updatedProduct = await productsModel.findByIdAndUpdate({_id: productId, createdBy: userId}, req.body, { new: true, runValidators: true })
    if(!updatedProduct){
        throw new NotFoundError('that product does not exists')
        // res.send('that product does not exists')
    }
    res.status(200).json(updatedProduct)
}

// DELETE

const deleteItem = async (req, res)=>{
    const {user:{userId}, params:{id:productId}} = req
    if(!userId || !productId){
        throw new BadRequestError('id and id of Product is required')
        // res.send('id and id of Product is required')
    }
    const deletedItem = await productsModel.findByIdAndDelete({_id: productId, createdBy: userId})
    res.send(deletedItem)
}

module.exports = {
    get_all,
    get_single,
    postItem,
    updateItem,
    deleteItem
}