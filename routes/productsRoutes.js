const express = require("express")
const router = express.Router()
const {
    get_all,
    get_single,
    postItem,
    updateItem,
    deleteItem,
} = require('../controllers/products')


router
    .route('/')
        .get(get_all)
        .post(postItem)
    

router
    .route('/:id')
        .get(get_single)
        .patch(updateItem)
        .delete(deleteItem)

    module.exports = router