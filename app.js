const express = require('express');
const app = express();

//start the Express server
app.listen(8080, () => {
    console.log(`server started at http://localhost:8080` );
});