import Comment from "../schemas/comments.schema.js"
import postsSchema from "../schemas/posts.schema.js";
import usersSchema from "../schemas/users.schema.js";
import {
    JWT
} from "../utils/jwt.js";

class CommentController {
    static async createComment(req, res) {
        try {
            let token = req.headers.token;
            let {
                _id
            } = await usersSchema.findById(JWT.VERIFY(token).id);

            const {
                content,
                postId
            } = req.body;
            if (!_id) {
                return res.send({
                    message: "Invalid token Please try again later",
                    status: 404
                })
            } else {
                const comment = new Comment({
                    text: content,
                    post: postId,
                    author: _id
                });
                await comment.save();
                await postsSchema.findByIdAndUpdate(postId, {
                    $push: {
                        comments: comment._id
                    }
                });

                res.status(201).json({
                    success: true,
                    message: 'Comment created successfully',
                    comment
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message:error.message
            });
        }
    }
    static async getCommentsForPost(req, res) {
        try {
            const {
                id
            } = req.params;
            const comments = await postsSchema.findById(id).populate('comments');
            res.status(200).json({
                success: true,
                message: 'Comments fetched successfully',
                comments
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message:error.message
            });
        }
    }

    static async getComment(req, res) {
        try {
            const {
                id
            } = req.params;

            const comment = await Comment.findById(id).populate('userId', 'username');

            if (!comment) {
                return res.status(404).json({
                    success: false,
                    message: 'Comment not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Comment fetched successfully',
                comment
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message:error.message
            });
        }
    }

    static async updateComment(req, res) {
        try {
            const {
                id
            } = req.params;
            const {
                content
            } = req.body;

            const comment = await Comment.findByIdAndUpdate(
                id, {
                   text: content
                }, {
                    new: true,
                    runValidators: true
                }
            );

            if (!comment) {
                return res.status(404).json({
                    success: false,
                    message: 'Comment not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Comment updated successfully',
                comment
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message:error.message
            });
        }
    }

    static async deleteComment(req, res) {
        try {
            const {
                id
            } = req.params;

            const comment = await Comment.findByIdAndDelete(id);

            if (!comment) {
                return res.status(404).json({
                    success: false,
                    message: 'Comment not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Comment deleted successfully'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message:error.message
            });
        }
    }
}

export default CommentController;