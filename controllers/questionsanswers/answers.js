const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const answerDB = require("../../models/Answers");


const addAnswer =  async (req, res) => {
    try {
        const object = {
            question_id: req.body.question_id,
            answer: req.body.answer,
            user: req.body.user,
       }
       const addanswer = await answerDB.create(object)
        res.send({
            statusCode:200,
            message:"successfully added answer",
            addanswer
        })
    } catch (error) {
        res.send({
          message:"error"
        }) 
    }
  };

  module.exports = { addAnswer}