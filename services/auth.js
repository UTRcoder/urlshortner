// The problem here in STATEFULL AUTHENTICATION is as soon as server restarts, map is emptied and we need to login again to generate url (since middleware restrictToLoggedInUserOnly is activated in /url route.)

//const sessionIdToUserMap=new Map();


// Hence we go for the STATELESS AUTHENTICATION, which holds the token until user in logged in (or until time limit)

const jwt = require('jsonwebtoken');
const secret = "UtrJ$0509";
function setUser(user) {
    //statefull approach
    // return sessionIdToUserMap.set(id,user);

    //stateless approach 
    // since id is not required we can directly use user as payload
    // const payload={
    //     id,
    //     ...user,
    // };
    // return jwt.sign(payload,secret);
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    }, secret);
}

function getUser(token) {
    //statefull approach
    // return sessionIdToUserMap.get(id);

    // stateless approach
    if(!token) return null;
    return jwt.verify(token ,secret);
}

module.exports = { setUser, getUser };