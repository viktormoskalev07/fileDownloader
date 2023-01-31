import express, {request, response} from "express"
import * as path from "path";
const  __dirname = path.resolve();


import { networkInterfaces } from 'os';

const nets = networkInterfaces();
const results = []; // Or just '{}', an empty object
let i = 0;
for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        i++
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results.push(net.address);
        }
    }}


console.log(results[1]);

const app =express();
const port =8080;
app.listen(port , results[1],()=>{
    console.log("http://"+results[1]+":"+port)
});

app.use(express.static(path.resolve(__dirname,"static")))