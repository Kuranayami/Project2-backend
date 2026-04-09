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
            user: {
                id: New_user._id,
                email: New_user.email,
                username: New_user.username
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Error registering user", error: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        //checking if the user exists
        const { email, password } =  req.body;

        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (!user) { return res.status(400).json({
            message: "Invalid email or password"
        })}

        //comparing the password entered by the user with the hashed password in the database
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        })

        res.status(200).json({
            message: "Login successful",
            user:{
                id: user._id,
                email: user.email,
                username: user.username
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error: error.message
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "Logout successful" });

    } catch (error) {
        res.status (500).json({ message: "Internal server error", error: error.message });
    }
}
export { registerUser, loginUser, logoutUser };