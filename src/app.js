const epxree = require('express');
const  {adminAuth, userAuth}  = require('./middleware/auth');
const app = epxree();

// Handle Auth Middleware for all request GET , POST

app.all("/admin",adminAuth);





app.get("/admin/getAllData" , (req , res) => {
        // Logic of check if the request is atuhenticated
        res.send("All Data")

})

app.get("/admin/deleteUser" , (req , res) => {

    res.send("Deleted a user") 
})


app.listen(3000, () => {
    console.log('App listening on port 3000!')
})




