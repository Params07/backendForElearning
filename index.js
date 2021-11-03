const express =  require('express');
const cors = require('cors');
const app = express();
const Pool = require('pg').Pool;
const DP = new Pool({
    user:"postgres",
    password:"parama",
    host:"localhost",
    port:5432,
    database:"course"
   });

app.use(cors());
app.use(express.json());
app.listen(5000,()=>{
    console.log('hello');
})

app.post('/course',async(req,res)=>{
    try{
    const {title,des,lang,url} = req.body;
    const ch = await DP.query('SELECT * FROM courses WHERE URL = $1',[url]);
    if(ch.rows.length)
    {
        console.log(ch.rows.length);
        res.json('This course already exist');
    }else{
       
        const d = await DP.query('INSERT INTO courses (TITLE,DESCRIPTION,LANG,URL) VALUES ($1,$2,$3,$4)',[title,des,lang,url]);
    
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
        const content = await DP.query('SELECT * FROM courses');
        res.json(content.rows);
        console.log('contents');
        
    } catch (error) {
        
    }
})