const express = require("express");
const app = express();
const port = process.env.PORT || 3000

function Sum(n) {
    let ans = 0;
    for (let i=0; i<=n; i++){
        ans = ans+i;
    }
    return ans;
}


app.get('/', function(req, res){
    const n = req.query.n;
    const ans = Sum(n);
    res.send("Hi, the linear sum is " + ans);
})

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
})