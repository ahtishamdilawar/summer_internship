const express = require('express');
const  dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
console.log(process.env.MONGOSTR);
//if mongoose connect print a console line
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
    }
    );
    
    const app = express();
    app.use("/", require("./routes/hello.js"));
    
    app.listen(3000,async () =>  {
        console.log('Server is running on port 3000');
        await mongoose.connect(process.env.MONGOSTR);
    }
    );

app.post('/', (req, res) => {
    res.send('Hello World!');
    }
);
