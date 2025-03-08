const epxree = require('express');
const app = epxree();


app.use("/user", (req, res) =>{
    res.send("Hahahahahhahah")
})

app.get('/' ,(req, res) => {
    res.send('Hello from the server!')
})

// app.use("/" , (req ,res) => {
//     res.send("Hello from main route ")
// })

app.use("/hello" , (req, res) => {
    
    res.send('Hello hello Hello')
})


app.get("/hello/2" , (req, res) => {
    
    res.send('Hello hello test')
})


app.get("/user" , (req,res) =>{
    res.send({
        firstName : "Wasim",
        lastName : "Adil"

    })
})


app.post("/user" , (req,res) => {
    
    console.log("Data are saved in database");
    res.send("Data are saved in database")
})


app.delete("/user", (req,res) =>{
    res.send("Delete Successfully ... ")
})


app.listen(3000, () => {
    console.log('App listening on port 3000!')
})


// app.use("/user", (req, res) =>{
//     res.send("Hahahahahhahah")
// })


