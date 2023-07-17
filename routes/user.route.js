const express = require('express');
const UserRouter = express.Router();
const {UserModel} = require('../model/user.model');

// Middleware to handle user creation
UserRouter.post('/register', async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await UserModel.create({ username, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
  }
});

module.exports = {UserRouter};
