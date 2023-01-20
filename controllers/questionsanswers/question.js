const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const QuestionDB = require("../../models/Question");
const {cloudinary} = require('../../utils/cloudinary')

const addQuestion = async (req,res) =>{
  try {
    const uploadResponse = await cloudinary.uploader.upload(req.body.questionphoto, {upload_preset: 'testing api',})
      const object = {
           title: req.body.title,
            body: req.body.body,
            tags: req.body.tag,
            user: req.body.user,
            questionphoto:uploadResponse.url
      }
      const addquestion = await QuestionDB.create(object)
      res.send({
        statusCode:200,
        message:"success",
        addquestion
      })
  } catch (error) {
    res.send({
      message:"error"
    })
  }
};

const updateVoteCount = async (req,res)=>{
  const{ id,sign } = req.params
  
  try {
    const updateVotes = await QuestionDB.findById(id)
    if(sign == "+"){
      updateVotes.votes++;
      updateVotes.save();
      res.send({
        message:"success",
        updateVotes
      })
    }
    else if (sign=="-"){
      updateVotes.votes--;
      updateVotes.save();
      res.send({
        message:"success",
        updateVotes
      })
    }
   
  } catch (error) {
    console.log(error)
  }
}

const getAllQuestions =  async (req, res) => {
  const error = {
    message: "Error in retrieving questions",
    error: "Bad request",
  };
  console.log(req.query.sort)
  let sorted =req.query.sort || 1
  QuestionDB.aggregate([
    {
      $sort:{created_at:parseInt(sorted)},
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userDetails",
        pipeline:[
         {
          $project: {
            _id: 1,
            profile:1,
            name:1,
            email:1,
            created_at: 1,
          },
        },
      ]
      },
    },
  
    {
      $lookup: {
        from: "comments",
        let: { question_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$question_id", "$$question_id"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              comment: 1,
              created_at: 1,
            },
          },
        ],
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "answers",
        let: { question_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$question_id", "$$question_id"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              answer:1,
              created_at:1
            },
          },
        ],
        as: "answerDetails",
      },
    },
    {
      $project: {
        __v: 0,
      },
    },
  ])
    .exec()
    .then((questionDetails) => {
        res.status(200).send(questionDetails);
    })
    .catch((e) => {
      console.log("Error: ", e);
      res.status(400).send(error);
    });
};


const getSingleQuestion = async (req, res) => {
  const{ id } = req.params
  try {
    const updateviews = await QuestionDB.findById(id)
      updateviews.views++;
      updateviews.save();
    await QuestionDB.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
          pipeline:[
           {
            $project: {
              _id: 1,
              profile:1,
              name:1,
              email:1,
              created_at: 1,
            },
          },
        ]
        },
      },
      {
        $lookup: {
          from: "answers",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
           { 
            $lookup:{
              from:"users",
              localField: "user",
              foreignField: "_id",
              as: "singleuserDetails",
            pipeline:[
              {
                $project: {
                  _id: 1,
                  profile:1,
                  name:1,
                  email:1,
                  created_at: 1,
                },
              },
        ]
        },
          },
          ],
          as: "answerDetails",
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
                  $lookup:{
                    from:"users",
                    localField: "user",
                    foreignField: "_id",
                    as: "singleUserComments",
                  pipeline:[
                    {
                      $project: {
                        _id: 1,
                        profile:1,
                        name:1,
                        email:1,
                        created_at: 1,
                      },
                    },
              ]
              },
            },
          ],
          as: "comments",
        },
      },
      
      {
        $project: {
          __v: 0,
        },
      },
    ])
      .exec()
      .then((questionDetails) => {
        res.status(200).send(questionDetails);
      })
      .catch((e) => {
        console.log("Error: ", e);
        res.status(400).send(error);
      });
  } catch (err) {
    res.status(400).send({
      message: "Question not found",
    });
  }
};

module.exports = { addQuestion, getAllQuestions, getSingleQuestion ,updateVoteCount }
