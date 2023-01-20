var express = require('express');
const { addAnswer } = require('../controllers/questionsanswers/answers');
const { addComment } = require('../controllers/questionsanswers/comment');
const { addQuestion, getAllQuestions, getSingleQuestion, updateVoteCount } = require('../controllers/questionsanswers/question');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({hello:"HI"})
});



router.post('/addquestion', addQuestion )
router.get('/updatevote/:id/:sign', updateVoteCount )
router.get('/allquestions', getAllQuestions )
router.get('/question/:id', getSingleQuestion )
router.post('/addanswer', addAnswer )
router.post('/addcomment/:id', addComment )




module.exports = router;
