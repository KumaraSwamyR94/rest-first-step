import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './routers'

const app = express();

app.use(cors({
    credentials: true,
}))

app.use(compression());
app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app);

server.listen(8008, () => {
    console.log('Server running at port http://localhost:8008/');
})

const MONGO_URL = 'mongodb+srv://ksr940210:4J3TKXguARkypkzQ@clusteruno.wrbxw.mongodb.net/?retryWrites=true&w=majority&appName=ClusterUno';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err: Error) => console.error('MongoDB connection error:', err));

mongoose.connection.on('error', (err: Error) => console.error('MongoDB error:', err));

app.use('/', router());