const User=require("../models/user")
const {v4: uuidv4}=require("uuid");
const { setUser } = require("../services/auth");
async function handleUserSingup(req,res) {
    const {name,email,password,role}=req.body;
    await User.create({
        name,
        email,
        password,
        role,
    });
    return res.redirect("/")
}
async function handleUserLogin(req,res) {
    const {email,password}=req.body;
    const user= await User.findOne({email,password,});
    if(!user){
        console.log("Invalid username/password entered");
        return res.render("login",{
        error:"Invalid usename or password",
    })}
    else{
        // statefull session is made here using uuid pacakge.(works until server doesn.t stops)
        // const sessionId=uuidv4();
        // setUser(sessionId,user);
        // res.cookie("uid",sessionId);
        
        //stateless approach
        const token=setUser(user);
        res.cookie("token",token);
        console.log("Logged in successfully")
        return res.redirect("/")
        //better authentication approach
        // console.log("Logged in successfully")
        // return res.json({token})
    }
}

module.exports={handleUserSingup,handleUserLogin};