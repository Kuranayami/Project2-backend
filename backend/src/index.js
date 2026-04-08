import dotenv from "dotenv";
dotenv.config({
    path: './.env'
});

import connectDB from "./config/database.js";
import app from "./app.js";

const startserver = async () => {
    try {
        await connectDB();
        app.on("error", (error) => {
            console.error(`Server Error: ${error.message}`);
            throw error;
        });

        app.listen(process.env.PORT || 4000, () => {
            console.log(`Server is running on port ${process.env.PORT || 4000}`);
        });
    }catch (error) {
        console.error(`MongoDB Failed to start server: ${error.message}`);
    }
}

startserver();