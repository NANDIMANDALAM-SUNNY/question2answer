const express = require("express");
const router = express.Router();

const commentDB = require("../../models/Comments");

const addComment = async (req, res) => {
    try {
        const object = {
            question_id: req.params.id,
            comment: req.body.comment,
            user: req.body.user,
       }
       const addcomment =await commentDB.create(object)
       res.send({
        statusCode:200,
        message:"suceess",
        addcomment
       })
    } catch (err) {
      res.status(500).send({
        message: "Error while adding comments",
      });
    }
  }
  module.exports = {addComment }