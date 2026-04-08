import { User } from "../models/users.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //check if all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // create new user
        const New_user = await User.create({ username, email, password });

        res.status(201).json({
            message: "User registered successfully", user: New_user,
            user: { id: New_user._id, email: New_user.email, name: New_user.name }
        });

    } catch (error) {
        res.status(500).json({
            message: "Error registering user", error: error.message
        });
    }
};

export { registerUser };