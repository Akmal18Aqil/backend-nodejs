const {nanoid} = require('nanoid');
const books = require('./books');

// Menyimpan buku
const addBookHandler = (request,h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        }).code(400);
    }
    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        }).code(400);
    }
    
    
    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const newBook = { id, name, year,author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt};
    books.push(newBook);

    return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: { bookId: id},
    }).code(201);

    

};

// menampilkan semua buku 
const getAllBooksHandler = () => ({
    status : 'success',
    data : {
        books: books.map(({ id,name, publisher}) => ({id, name, publisher})),
    }
});
// Handler menampilkan detail buku
const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books.find((b) => b.id === bookId);

    if (book !== undefined) {
        return {
            status: 'success',
            data: { book },
        }
    }

    return h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    }).code(404);
};
// Menupdate data buku
const updateBookByIdHandler = (request,h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const index = books.findIndex((b) => b.id === bookId);

    if (index === -1) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        }).code(404);
    }
    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }
    const updatedAt = new Date().toISOString();
    books[index] = { ...books[index], name, year, author, summary, publisher, pageCount, readPage, reading, finished: pageCount === readPage, updatedAt };

    return h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    }).code(200);
    
    
};
// Handler menghapus buku
const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex((b) => b.id === bookId);

    if (index === -1) {
        return h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        }).code(404);
    }

    books.splice(index, 1);
    return h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
    }).code(200);
};


module.exports = {addBookHandler, getAllBooksHandler, getBookByIdHandler, updateBookByIdHandler, deleteBookByIdHandler};