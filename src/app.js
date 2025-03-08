const epxree = require('express');
const app = epxree();


app.get('/' ,(req, res) => {
    res.send('Hello from the server!')
})



app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})
