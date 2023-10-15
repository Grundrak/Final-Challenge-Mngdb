const express = require ('express');
const router = express.Router();
const Product = require('../models/product');


router.get('/', async (req,res) =>{
    try{
    const Products = await Product.find();
    res.json(Products);
    }catch(err){
    res.status(500).json({ error: 'Error fetching data from MongoDB ' });
    }})

    router.get("/search", async (req, res) => {
        const { maxPrice, minPrice, name, availability,order } = req.query;
      
        try {
          const query = {};
          
          if (availability !== undefined) {
            query.availability = available === true;
          }else if (name) {
            query.name = { $regex: new RegExp(name, "i") };
          }else   if (minPrice !== undefined && maxPrice !== undefined) {
            query.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
          } else if (minPrice !== undefined) {
            query.price ={ $gte: parseFloat(minPrice) };
          } else if (maxPrice !== undefined) {
            query.price = {  $lte: parseFloat(maxPrice)};
          }
          
          const sort = {};
          sort['price'] = order === 'desc' ? -1 : 1;

          const products = await Product.find(query).sort(sort)
          res.json(products);
        } catch (err) {
          res.status(500).send('Error fetching data from MongoDB search');
        }
      });
      
      router.get('/sort', async (req, res) => {
        try {
          const { price,order } = req.query;
    
          if (order !== 'asc' && order !== 'desc') {
            return res.status(400).json({ error: 'Invalid sort order' });
          }
      
          const sort = {};
          sort['price'] = order === 'asc' ? 1 : -1;

          let query = Product.find();
          if (price) {
            query = query.where('price').equals(price);
          }
        
          const sortedProducts = await query.sort(sort);
          res.json(sortedProducts);
        } catch (err) {
          res.status(500).json({ error: 'Error fetching data from MongoDB  sort' });
        }
      });

module.exports = router ;