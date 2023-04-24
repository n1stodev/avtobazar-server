import Post from "../schemas/posts.schema.js"
import usersSchema from "../schemas/users.schema.js";
import {
    JWT
} from "../utils/jwt.js";

class PostController {
    static async create(req, res) {
        try {
            let token = req.headers.token;
            let {
                _id
            } = await usersSchema.findById(JWT.VERIFY(token).id)
            let {
                title,
                distance,
                color,
                variant,
                wheel,
                price,
                description,
                comments,
                year,
            } = req.body;
            if (!_id) {
                return res.send({
                    message: "Invalid token Please try again later",
                    status: 404
                })
            } else {
                const post = new Post({
                    title,
                    distance,
                    author: _id,
                    color,
                    variant,
                    wheel,
                    price,
                    year,
                    description,
                    comments
                });
                await post.save();
                res.status(201).send({
                    data: post,
                    status: 200
                });
            }
        } catch (err) {
            console.log('err :', err);
            res.status(500).send('Server error');
        }
    }

    static async getAll(req, res) {
        try {
            const posts = await Post.find().populate('author', 'username');
            res.json(posts);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    }

    static async getById(req, res) {
        try {
            const post = await Post.findById(req.params.id).populate('author', 'username');
            if (!post) {
                return res.status(404).send('Post not found');
            }
            res.json(post);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    }

    static async update(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).send('Post not found');
            }
            let {
                title,
                distance,
                color,
                variant,
                wheel,
                price,
                year,
                description,
                comments
            } = req.body;
            post.title = title ? title : post.title,
                post.distance = distance ? distance : post.distance,
                post.color = color ? color : post.color,
                post.variant = variant ? variant : post.variant,
                post.wheel = wheel ? wheel : post.wheel,
                post.price = price ? price : post.price,
                post.year = year ? year : post.year,
                post.description = description ? description : post.description,
                post.comments = comments ? comments : post.comments
            await post.save();
            res.json(post);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    }

    static async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params.id);
            if (!post) {
                return res.status(404).send('Post not found');
            }
            if (req.user._id.toString() !== post.author.toString()) {
                return res.status(403).send('Forbidden');
            }
            await post.save();
            res.send('Post deleted');
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    }
}

export default PostController;