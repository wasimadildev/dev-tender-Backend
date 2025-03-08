const epxree = require('express');
const app = epxree();


app.get("/user/:userId/:name/:password", (req,res) =>{
    console.log(req.params);

    res.send({
        firstname: "Wasim",
        lastname: "Adil"
    })

})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})



