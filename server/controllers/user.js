
import User from "./../models/User.js";
import md5 from "md5";

const postSignup = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "name, email and password are required"
        });
    }

    const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const nameValidationRegex = /^[A-Za-z ]+$/;

    const passwordValidationRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;


    if (!nameValidationRegex.test(name)) {
        return res.status(400).json({
            success: false,
            message: "Name should contain only alphabets and space",
        });
    }


    if (!emailValidationRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email",
        });
    }


    if (!passwordValidationRegex.test(password)) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters and contain one letter and one number",
        });
    }


    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: `User with email ${email} already exists`,
        });
    }


    const newUser = new User({
        name,
        email,
        password: md5(password)
    });

    const savedUser = await newUser.save();

    res.json({
        success: true,
        message: "User registered successfully",
    });
};


const postLogin = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "email and password are required",
        });
    }


    const existingUser = await User.findOne({
        email,
        password: md5(password)}).select("-password"

        );


    if (existingUser) {
        return res.json({
            success: true,
            message: "User logged in successfully",
            user: existingUser,
        });
    } else {
        return res.status(401).json({
            success: false,
            message: "invalid email or password",
        });
    }
};


export { postLogin, postSignup };

