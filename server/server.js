import express from "express";
import "../utils/mongo.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import bodyParser from 'body-parser';
import userRoutes from '../routes/users.routes.js';
import postRoutes from '../routes/posts.routes.js';
import commentRoutes from '../routes/comments.routes.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors('*'))
// User routes
app.use('/api', userRoutes);

// Post routes
app.use('/api', postRoutes);

// Comment routes
app.use('/api', commentRoutes);

app.listen(PORT, () => {
    console.log("Service listening on port " + PORT);
});