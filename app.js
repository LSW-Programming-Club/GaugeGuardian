import express from 'express'
var app = express();

import logger from 'morgan';

app.use(logger('dev'));

// Allows server side rendering
app.set('view engine', 'ejs')

// Static Web Files
app.use(express.static('public'))
// Flatten icons to /public for device support reasons
app.use(express.static('public/icons'))

// Import routing from other routers in ./routes
import { router as frontend } from './routes/frontend.js'
import { router as api } from './routes/api.js'

import db from './lib/db.js'
db.init();

app.use("/", frontend);
app.use("/api", api);

//start the Express server
app.listen(9090, () => {
    console.log(`server started at http://localhost:9090` );
});
