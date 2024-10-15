const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    
})

app.listen(port, function() {
    console.log(`listen on port ${port}`);    
})