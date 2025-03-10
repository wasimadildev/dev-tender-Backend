const adminAuth = (req, res, next ) => {
    const token = "asda234";
    const isAdminAuthorzied = token == "1234"
    isAdminAuthorzied ? next() : res.status(401).send
    ("Unauthorized")
}


const userAuth = (req, res, next ) => {
    const token = "asda234";
    const isAdminAuthorzied = token == "1234"
    isAdminAuthorzied ? next() : res.status(401).send
    ("Unauthorized")
}


module.exports = {
    adminAuth,
    userAuth
}