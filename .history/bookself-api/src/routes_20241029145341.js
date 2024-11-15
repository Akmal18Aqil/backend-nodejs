const { addBookHandler, getAllBooksHandler, getBookByIdHandler, updateBookByIdHandler, deleteBookByIdHandler} = require('./handler.js');

const routes = [
    {
        method : "POST",
        path : "/books",
        handler : addBookHandler,
    },
    {
        method : "GET",
        path : "/books",
        handler : getAllBooksHandler
    },
    {
        method : "GET",
        path : "/books/{id}",
        handler : getBookByIdHandler
    },
    {
        method : "PUT",
        path : "/books/{id}",
        handler : updateBookByIdHandler
    },
    {
        method : "DELETE",
        path : "/books/{id}",
        handler : deleteBookByIdHandler
    }
];
module.exports = routes;

// ns1.stablehost.com, ns2.stablehost.com