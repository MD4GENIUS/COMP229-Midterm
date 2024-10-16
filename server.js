
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

let books = ['The Hobbit', '1984', 'To Kill a Mockingbird', 'Moby Dick', 'Pride and Prejudice'];

const PORT = 8080;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/api/items', (req, res) => {
  res.status(200).json(books);
});


app.get('/api/items/search', (req, res) => {
  const title = req.query.title.toLowerCase();
  const matchedBooks = books.filter(book => book.toLowerCase().includes(title));
  res.status(200).json(matchedBooks);
});


app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < books.length) {
    res.status(200).json(books[id]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.post('/api/items', (req, res) => {
  const newBook = req.body.title;
  if (newBook) {
    books.push(newBook);
    res.status(201).json(newBook);
  } else {
    res.status(400).json({ message: 'Invalid input, book title is required' });
  }
});

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

app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < books.length) {
    const removedBook = books.splice(id, 1);
    res.status(200).json(removedBook);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
