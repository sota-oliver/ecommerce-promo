import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'
import storage from './memory_storage';

const app = express() // app initialization
const port = process.env.PORT || 3000 // listening port

app.use(cors())
app.use(express.json());

app.get('/items', function (req, res) {
    res.send(storage.items)
})

app.get('/items/:id', async (req, res)=>{
    let id = req.params.id;
    let cursor = storage.items[id]
    res.json(cursor);
});

app.listen(port, () => {
    console.clear();
    console.log("\x1b[32m%s\x1b[0m", '\n' + `      Listening at port ${port}`, '\n\n')
    console.log("\x1b[36m%s\x1b[0m", "localhost:3000/items", "\x1b[37m\x1b[0m", "- get all products from table");
    console.log("\x1b[36m%s\x1b[0m", "localhost:3000/items/:id", "\x1b[37m\x1b[0m", "- get single product (index) from table", '\n\n');
    console.table(storage.items, ["item_name"]);
    console.log('\n\n');
    console.log("\x1b[36m%s\x1b[0m", "Press 'Ctrl + C' to exit");
    console.log("\x1b[36m%s\x1b[0m", "Feel free to mess around :)");
})