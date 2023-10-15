const express = require ('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose')

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
      router.post('/', async (req,res) =>{
        try{
            const NewProduit = new Product ({
                     name: 'Nokia pile 15 pro',
                     price: 1100,
                     availability: true,
            })
            const saved = NewProduit.save();  
            return res.status(201).json(saved)   
            }catch(err){
                return res.status(500).json({ error: 'la walo matsavach' });
            }
    })
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

      router.put('/update/:id',async (req,res)=>{
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const Update =req.params.id;
            console.log(Update)
            const product = await Product.findById(Update).session(session);
            console.log(product);
            product.name = req.body.name;
            await product.save();
            await session.commitTransaction();
            session.endSession();
            res.send('Product updated successfully');
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            res.status(500).send('Error updating product');
            console.error(error.message);
        }
      })

module.exports = router ;