import usersSchema from "../schemas/users.schema.js";
import {
    JWT
} from './../utils/jwt.js';
class UserController {
    // CRUD operatsiyalari
    static async createUser(req, res) {
        try {
            const {
                username,
                password,
                email
            } = req.body;

            const user = new usersSchema({
                username,
                password,
                email
            });
            await user.save();
            res.status(201).send({
                data: user.username,
                token: JWT.SIGN({
                    id: user._id
                })
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await usersSchema.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    static async getUserById(req, res) {
        try {
            const user = await usersSchema.findById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    static async updateUser(req, res) {
        try {
            const {
                username,
                password,
                email
            } = req.body;

            const user = await usersSchema.findById(req.params.id);

            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            } else {
                user.username = username ? username : user.username;
                user.password = password ? password : user.password;
                user.email = email ? email : user.email;

                await user.save();
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    static async deleteUser(req, res) {
        try {
            const user = await usersSchema.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            await user.save();

            res.status(204).json({
                message: 'User deleted'
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
}

export default UserController;