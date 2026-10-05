import bcrypt from "bcrypt";
import User from "../models/users.js";

export const getUser = async (req, res) => {
    const user_id = req.user.user_id;

    const userDetail = await User.findByPk(user_id, {
        attributes: ["user_id", "name", "email", "phone_no", "address"],    // attributes: {exclude: ["password_hash"]} ::: To exclude columns.
    });
    
    if(!userDetail){
        return res.status(404).json({ message: "User not found!!"});
    }

    res.status(200).json(userDetail);
};


export const updateName = async (req, res) => {
    try{
        const user_id = req.user.user_id;
        const {name} = req.body;

        const userOb = await User.findByPk(user_id);

        if(!userOb){
            return res.status(404).json({ message: "Invalid!!" });
        }
        
        userOb.name = name;
        await userOb.save();

        res.status(200).json({ message: "Name updated successfully!!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Database error",
        });
    }
};


export const updateEmail = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const {email} = req.body;

        const userOb = await User.findByPk(user_id);

        if(!userOb){
            return res.status(404).json({ message: "Invalid!!" });
        }
        
        userOb.email = email;
        await userOb.save();

        res.status(200).json({ message: "Email updated successfully!!" });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Database error",
        });
    }
};


export const updatePhone = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const {phone_no} = req.body;

        const userOb = await User.findByPk(user_id);

        if(!userOb){
            return res.status(404).json({ message: "Invalid!!" });
        }
        
        userOb.phone_no = phone_no;
        await userOb.save();

        res.status(200).json({ message: "Phone Number updated successfully!!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Database error",
        });
    }
};


export const updatePassword = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const {password} = req.body;

        const userOb = await User.findByPk(user_id);

        if(!userOb){
            return res.status(404).json({ message: "Invalid!!" });
        }
        
        userOb.password_hash = await bcrypt.hash( password, 10 );

        await userOb.save();

        res.status(200).json({ message: "Password updated successfully!!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Database error",
        });
    }
};


export const updateAddress = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const {address} = req.body;

        const userOb = await User.findByPk(user_id);

        if(!userOb){
            return res.status(404).json({ message: "Invalid!!" });
        }
        
        userOb.address = address;

        await userOb.save();

        res.status(200).json({ message: "Address updated successfully!!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Database error",
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        
        const userOb = await User.findByPk(user_id);

        if(!userOb){
            return res.status(404).json({ message: "User not found!"});
        }

        userOb.row_status = "INACTIVE";
        await userOb.save();
        res.status(200).json({message: "User deleted successfully!!"});

    } catch(error) {
        console.error(error);
        res.status(500).json({
            error: "Database error",
        });
    }
}
