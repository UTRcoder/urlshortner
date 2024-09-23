const { getUser } = require("../services/auth");

// lets make the code readable by merging duplicates by a authorixation header rather than cookies
/* 
async function checkForAuthentication(req,res,next){
    const authorizationHeaderValue=req.headers["authorization"];
    req.user=null;
    if(
        !authorizationHeaderValue||
        !authorizationHeaderValue.startsWith("Bearer")
    ) return next();
    const token=authorizationHeaderValue.split("Bearer ")[1];
    const user=getUser(token);
    req.user=user;
    return next();
}
*/

function restrictTo(roles=[]){
    return function (req,res,next){
        if(!req.user)return res.redirect("/login");
        if(!roles.includes(req.user.role))return res.end(" Unauthorised role login");
        return next() ;
    }
}
/* Merged function for cookies
*/
async function checkForAuthentication(req,res,next){
    const tokencookie=req.cookies?.token;
    req.user=null;
    if(
        !tokencookie
    ) return next();
    const user=getUser(tokencookie);
    req.user=user;
    return next();
}
/* This both functioins below are merged in one function above named as checkAuthorizationValue

async function restrictToLoggedInUserOnly(req,res,next){
    // since cookies are stopped other than browsers, hence for better authentication in user.js we use AUTHORIZATION HEADER
    // const userUid=req.cookies?.uid;

    //better authentication
    const userUid=req.headers["authorization"];
    if(!userUid)return res.redirect("/login");
    const token=userUid.split("Bearer ")[1];
    const user=getUser(token);
    if(!user) return res.redirect("/login");
    req.user=user;
    next();
}
async function checkAuth(req,res,next){
    const userUid=req.headers["authorization"];
    const token=userUid.split("Bearer ")[1];
    const user=getUser(token);
    req.user=user;
    next();
}
*/
module.exports={
    // restrictToLoggedInUserOnly,
    // checkAuth
    checkForAuthentication,
    restrictTo
};