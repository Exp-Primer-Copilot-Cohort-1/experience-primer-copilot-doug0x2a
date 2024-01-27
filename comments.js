// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto'); // To generate random id
const cors = require('cors');

const app = express();
app.use(bodyParser.json()); // Parse the body of the request
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []); // If no comments, return empty array
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex'); // Generate a random id
  const { content } = req.body; // Extract content from request body

  const comments = commentsByPostId[req.params.id] || []; // Check if comments array exists for post
  comments.push({ id: commentId, content }); // Add new comment to array
  commentsByPostId[req.params.id] = comments; // Save comments array to post id

  res.status(201).send(comments); // Return comments array
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});