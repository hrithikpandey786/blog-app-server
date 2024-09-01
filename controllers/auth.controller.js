const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = async (req, res) =>{
    const {name, email, password} = req.body;
    const saltRound = 10;

    try{
        const isAlreadyRegistered = await prisma.registeredUser.findUnique({
            where: {
                email
            }
        })

        if(isAlreadyRegistered){
            return res.status(400).json({message: `This email Id is already registered`});
        }

        const hashedPassword = await bcrypt.hash(password, saltRound);

        const newUser = await prisma.registeredUser.create({
            data:{
                email,
                password: hashedPassword,
                name
            }
        })

        res.status(200).json(newUser);
    } catch(err){
        res.status(500).json({message: "Failed to register the user"});
    }
}


const login = async (req, res) =>{
    const {email, password} = req.body;
    
    try{
        const user = await prisma.registeredUser.findUnique({
            where:{
                email
            }
        })

        if(!user){
            return res.status(401).json({message: "User not registered!"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid Credentials!"});
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
        const age = 1000*60*60*24*7;

        return res.cookie('token', token, {
            httpOnly: true,
            maxAge: age
        }).status(200).json(user);

    } catch(err){
        res.status(500).json({message: "Failed to login"});
    }
}


// const logout = (req, res) =>{
//     try{
//         return res.clearCookie("token").status(200).json({message: "Logout Successful!"});
//     } catch(err){
//         res.status(500).json({message: "Failed to logout!"});
//     }
// }

const logout = (req, res)=>{
    const token = req.cookies;
    
    try{
        return res.clearCookie("token").status(200).json({message: "deleted"});
    } catch(err){
        console.log(err);
    }
}


const updateProfile = async (req, res) =>{
    const {name, email, password, avatar} = req.body;
    const saltRound = 10;
    const {id} = req.params;
    console.log(req.body, id);
    try{

        const hashedPassword = await bcrypt.hash(password, saltRound);

        const updatedUser = await prisma.registeredUser.update({
            where:{
                id: id
            },
            data:{
                avatar: avatar || "",
                email,
                password: hashedPassword,
                name
            }
        })

        res.status(200).json(updatedUser);
    } catch(err){
        res.status(500).json({message: "Failed to update the details"});
    }
}


module.exports = {register, login, logout, updateProfile};