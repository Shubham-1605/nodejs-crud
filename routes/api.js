// routes/api.js
const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// CREATE
router.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).send(newItem);
  } catch (error) {
    res.status(400).send(error);
  }
});

// READ
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find({});
    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

// UPDATE
router.patch('/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      return res.status(404).send();
    }
    res.send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE
router.delete('/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).send();
    }
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
