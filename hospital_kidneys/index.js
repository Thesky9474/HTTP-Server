const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json()); // for parsing the body on POST request

const users = [{
    name: "John",
    kidneys: [{
        healthy: false
    },{
        healthy: true
    }]
}]

// Giving number, healthy and unhealthy kidneys of user 
app.get('/', function(req, res){
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    for(let i=0; i<johnKidneys.length; i++){
        if(johnKidneys[i].healthy){
            numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    });
})

// To add new kidenys in users
app.post('/', function(req, res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    });
    res.json({
        msg: "Done!"
    })
})

// Replacing all unhealthy kidney to healthy
app.put('/', function(req, res){
    for(let i=0; i<users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
})

// Checking edge cases because in future frontend require status code and details
function checkUnhealthykidney() {
    let unhelthyKidney = false;
    for( let i=0; i<users[0].kidneys.length; i++) {
        if(!users[0].kidneys[i].healthy){
            unhelthyKidney = true
        }
    }
    return unhelthyKidney;
}

// Removing all unhealthy kidneys
app.delete('/', function(req, res){
    if(checkUnhealthykidney()){
        let newKidneys = [];
        for( let i=0; i<users[0].kidneys.length; i++) {
            if(users[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy: true
                })
            }
        } 
        users[0].kidneys = newKidneys;
        res.json({msg: "done"})
    } else {
        res.status(411).json({
            msg: "You have all healthy kidneys"
        })
    }
})

app.listen(port, function() {
    console.log(`Listen on port ${port}`);
})