import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const signup = async (req, res) => {

    const { name, email, phone_no, password, address } = req.body;

    const password_hash = await bcrypt.hash( password, 10 );

    await User.create({
        name,
        email,
        phone_no,
        password_hash,
        address
    });

    res.status(201).json({ message : "User Created!!" });

};


export const loginEmail = async (req,res) => {
    const {email, password} = req.body;

    const user = await User.findOne({
        where : { 
            email,
            row_status : "ACTIVE"
         }
    });

    if(!user){
        return res.status(401).json({
            message : "Invalid Credentials!!"
        });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if(!isValid){
        return res.status(401).json({
            message : "Invalid Credentials!!"
        });
    }
   
    const token = jwt.sign(
        {user_id : user.user_id, name : user.name}, 
        process.env.JWT_SECRET_KEY, 
        { expiresIn : "1h"}
    );

    res.json({ 
        token,
        message: "Login Successful!!",
    });

};


export const loginPhone = async (req, res) => {
    const {phone_no, password} = req.body;

    const user = await User.findOne({
        where : { phone_no }
    });

    if(!user){
        return res.status(401).json({
            message : "User Not Found!!"
        });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if(!isValid){
        return res.status(401).json({
            message : "Invalid Credentials!!"
        });
    }
   
    const token = jwt.sign(
        {user_id : user.user_id, name : user.name}, 
        process.env.JWT_SECRET_KEY, 
        { expiresIn : "1h"}
    );

    res.json({ 
        token,
        message: "Login Successful!!",
     });
};