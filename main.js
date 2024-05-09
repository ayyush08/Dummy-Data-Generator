import express from "express"
import mongoose from "mongoose"
import Employee  from "./models/Employee.js"

let conn = mongoose.connect('mongodb://localhost:27017/')
const app = express()
const port = 3000

app.set('view engine','ejs')

const getRandom = (arr)=>{
    let rand = Math.floor(Math.random()*(arr.length-1))
    return arr[rand];
}
app.get( "/", (req, res) =>{
    res.render('index', {foo: 'FOO'});
})

//hitting GENERATE ROUTE to generate data 
app.get( "/generate", async (req, res) =>{
    //clearing collection
    await Employee.deleteMany({})
    //generate random data
    let randomNames = ['Michael',"John",'Alfred','Watson'];
    let randomLanguages = ['Python','JavaScript','C++','React']
    let randomCities = ['Mumbai','Delhi','Agra','Kolkata']

    for (let index = 0; index < 10; index++) {
        let r = await Employee.create(
            {
                    name: getRandom(randomNames),
                    salary: Math.floor(Math.random()*22000),
                    language: getRandom(randomLanguages),
                    city: getRandom(randomCities),
                    isManager: (Math.random>0)?true:false
                
        })        
        // await r.save()
        console.log(r);
    }
    
    res.render('index', {foo: 'FOO'});
})

app.listen(port , ()=> console.log(`Server running on ${port}`));
