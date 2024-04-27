import express from "express";

const app = express();

const PORT = 3000;

app.use(express.json());
// This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res)=>{
    res.send('working...')
});

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
})