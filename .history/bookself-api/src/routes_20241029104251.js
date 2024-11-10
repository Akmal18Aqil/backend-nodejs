const { addBookHandler} = require('./src/handler.js');

const routes = [
    {
        method : "POST",
        path : "/books",
        handler : addBookHandler,
    },
    {
        method : "GET",
        path : "/books",
        handler : ()=> {}
    },
    {
        method : "GET",
        path : "/books/{id}",
        handler : ()=> {}
    },
    {
        method : "PUT",
        path : "/books/{id}",
        handler : ()=> {}
    },
    {
        method : "DELETE",
        path : "/books/{id}",
        handler : ()=> {}
    }
]