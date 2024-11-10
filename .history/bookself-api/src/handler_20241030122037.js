const { nanoid } = require('nanoid');
const books = require('./books');

// Menyimpan buku
const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt,
  };
  books.push(newBook);

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: { bookId: id },
  });
  response.code(201);
  return response;
};

// Menampilkan semua buku
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let filteredBooks = books;

  if (name) {
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undefined) {
    const isReading = reading === '1';
    filteredBooks = filteredBooks.filter((book) => book.reading === isReading);
  }

  if (finished !== undefined) {
    const isFinished = finished === '1';
    filteredBooks = filteredBooks.filter((book) => book.finished === isFinished);
  }

  const responseBooks = filteredBooks.map(({ id, name, publisher }) => ({
    id,
    name,
    publisher,
  }));

  const response = h.response({
    status: 'success',
    data: {
      books: responseBooks,
    },
  });
  return response;
};

// Menampilkan detail buku
const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = books.find((b) => b.id === id);

  if (!book) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: { book },
  });
  return response;
};

// Memperbarui data buku
const updateBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const updatedAt = new Date().toISOString();
  books[index] = {
    ...books[index], name, year, author, summary, publisher, pageCount, readPage, reading, finished: pageCount === readPage, updatedAt,
  };

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  return response;
};

// Menghapus buku
const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  books.splice(index, 1);
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
  return response;
};

module.exports = {
  addBookHandler, getAllBooksHandler, getBookByIdHandler, updateBookByIdHandler, deleteBookByIdHandler,
};
