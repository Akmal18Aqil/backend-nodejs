const {nanoid} = require('nanoid');
const books = require('./books');

// Menyimpan buku
const addBookHandler = (request,h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku!'
        }).code(400);
    }
    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Jumlah halaman yang dibaca melebihi jumlah halaman yang ada!'
        }).code(400);
    }
    
    
    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const newBook = { id, name, year,author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt};
    books.push(newBook);

    return h.response({
        status: success,
        message: 'Buku berhasil ditambahkan!',
        data: { bookId: id},
    }).code(201);

    

};

module.exports = {addBookHandler};