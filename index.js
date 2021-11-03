const express =  require('express');
const cors = require('cors');
const app = express();
const Pool = require('pg').Pool;
const DP = new Pool({
    connectionString:"postgres://ezmeyticlxbztw:29e3c6509f622f9ffa95fce1d33ae0be47481ddec08206ff20bcf5f974f0b4e5@ec2-18-210-233-138.compute-1.amazonaws.com:5432/da7ggj4bejq2og",
    ssl: {
        rejectUnauthorized: false
    }
   });
   const port = process.env.PORT || '5000';
app.use(cors());
app.use(express.json());
app.listen(5000,()=>{
    console.log('hello');
})

app.post('/course',async(req,res)=>{
    try{
    const {title,des,lang,url} = req.body;
    const ch = await DP.query('SELECT * FROM course WHERE URL = $1',[url]);
    if(ch.rows.length)
    {
        console.log(ch.rows.length);
        res.json('This course already exist');
    }else{
       
        const d = await DP.query('INSERT INTO course (TITLE,DESCRIPTION,LANG,URL) VALUES ($1,$2,$3,$4)',[title,des,lang,url]);
    
        res.json('course added');
    }
   
}
    catch(err)
    {
        console.log(err);
    }
})


app.get('/getcourse',async(req,res)=>
{
    try {
        const content = await DP.query('SELECT * FROM course');
        res.json(content.rows);
        console.log('contents');
        
    } catch (error) {
        
    }
})
