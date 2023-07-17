const express = require('express');
const QuizRouter = express.Router();
const { QuizModel } = require('../model/quiz.model');

QuizRouter.get("/allquiz", async (req, res) => {
  try {
    const users = await QuizModel.find();
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send({ "msg": error.message })
  }
})


QuizRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await QuizModel.findById(id);
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send({ "msg": error.message })
  }
})

// to add quizquestion
QuizRouter.post('/add', async (req, res) => {
  try {
    const { creator, title, description, questions } = req.body;
    const quiz = await QuizModel.create({ creator, title, description, questions });
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
    res.status(500).json({ "message": 'Failed to create quiz' });
  }
});


//to delete the particular quiz
QuizRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await QuizModel.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
});


//to update the particular quiz
QuizRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const quiz = await QuizModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quiz' });
  }
});

module.exports = { QuizRouter };
