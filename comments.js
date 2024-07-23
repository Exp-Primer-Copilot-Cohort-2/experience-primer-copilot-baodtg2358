// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Create a function to read the comments from the file
function readComments() {
  const comments = fs.readFileSync('comments.json', 'utf8');
  return JSON.parse(comments);
}

// Create a function to write the comments to the file
function writeComments(comments) {
  fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2));
}

// Add middleware to parse the body of the request
app.use(bodyParser.json());

// Create a route to get all comments
app.get('/comments', (req, res) => {
  const comments = readComments();
  res.json(comments);
});

// Create a route to add a comment
app.post('/comments', (req, res) => {
  const comments = readComments();
  const newComment = req.body;
  comments.push(newComment);
  writeComments(comments);
  res.json(newComment);
});

// Create a route to get a comment by id
app.get('/comments/:id', (req, res) => {
  const comments = readComments();
  const comment = comments.find(comment => comment.id === req.params.id);
  res.json(comment);
});

// Create a route to update a comment by id
app.put('/comments/:id', (req, res) => {
  const comments = readComments();
  const commentIndex = comments.findIndex(comment => comment.id === req.params.id);
  const updatedComment = Object.assign(comments[commentIndex], req.body);
  writeComments(comments);
  res.json(updatedComment);
});

// Create a route to delete a comment by id
app.delete('/comments/:id', (req, res) => {
  const comments = readComments();
  const commentIndex = comments.findIndex(comment => comment.id === req.params.id);
  comments.splice(commentIndex, 1);
  writeComments(comments);
  res.json({ success: true });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});