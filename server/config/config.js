// Entorno

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

// Port
process.env.PORT = process.env.PORT || 3000;

// DB
let url_db;
process.env.NODE_ENV === 'dev' ? url_db = 'mongodb://localhost:27017/socket-ticket'
    : url_db = process.env.MONGO_URI;

process.env.URL_DB = url_db;