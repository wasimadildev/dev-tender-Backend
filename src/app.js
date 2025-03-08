const epxree = require('express');
const app = epxree();



app.use("/user", [(req, res , next) =>{

 console.log("Handling the route user");

//  res.send("Responsed from user")
 next();
}, (req,res) =>{
    console.log("Handling the route user 2");
    res.send("Responsed from user 2")
}])


app.listen(3000, () => {
    console.log('App listening on port 3000!')
})




