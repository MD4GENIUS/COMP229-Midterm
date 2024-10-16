/**
 * Midterm API Project - COMP229 Winter 2024
 */

const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// Serve static files (e.g., images, CSS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Array of books (strings)
let books = ['The Hobbit', '1984', 'To Kill a Mockingbird', 'Moby Dick', 'Pride and Prejudice'];

// Set the port for the server
const PORT = 8080;

// Serve the instructions HTML file (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// API Endpoints

// GET /api/items
// Description: Get all items (books)
app.get('/api/items', (req, res) => {
  // Return the array of books as a JSON response
  res.status(200).json(books);
});


// GET /api/items/search?title=[<<partial title name>>]
// Description: Search for books by partial title match
app.get('/api/items/search', (req, res) => {
  const title = req.query.title.toLowerCase();
  const matchedBooks = books.filter(book => book.toLowerCase().includes(title));
  res.status(200).json(matchedBooks);
});

// GET /api/items/:id
// Description: Get a specific item by ID
app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < books.length) {
    res.status(200).json(books[id]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// POST /api/items
// Description: Add a new item
app.post('/api/items', (req, res) => {
  const newBook = req.body.title;
  if (newBook) {
    books.push(newBook);
    res.status(201).json(newBook);
  } else {
    res.status(400).json({ message: 'Invalid input, book title is required' });
  }
});

// PUT /api/items/:id
// Description: Update an item by ID
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedBook = req.body.title;
  if (id >= 0 && id < books.length && updatedBook) {
    books[id] = updatedBook;
    res.status(200).json(books[id]);
  } else {
    res.status(400).json({ message: 'Invalid input or book not found' });
  }
});

// DELETE /api/items/:id
// Description: Remove an item by ID
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < books.length) {
    const removedBook = books.splice(id, 1);
    res.status(200).json(removedBook);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
