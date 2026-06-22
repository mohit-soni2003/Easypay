import { User } from "../models/User.js";


export const createUser = async(data)=>{

    return await User.create(data);

};


export const findUserByEmail = async(email)=>{

    return await User.findOne({
        email
    });

};


export const findUserByMobile = async(mobile)=>{

    return await User.findOne({
        mobile
    });

};