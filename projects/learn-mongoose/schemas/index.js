const mongoose = require('mongoose');

const username = 'root';
const password = 'root';
const url = `mongodb://${username}:${password}@localhost:27017/admin`

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }

    mongoose.connect(url, {
        dbName: 'nodejs',
        useNewUrlParser: true,
        useCreateIndex: true,
    }, (error) => {
        if (error) console.error('몽고디비 연결 에러', error);
        else console.log('몽고디비 연결 성공');
    });

    mongoose.connection.on('error', (error) => {
        console.error('몽고디비 연결 에러', error);
    });
    mongoose.connection.on('disconnect', () => {
        console.error('몽고디비 연결이 끊어졌습니다. 연결을 재시도합니다.');
        connect();
    });
}

module.exports = connect;
