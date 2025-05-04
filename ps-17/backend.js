const express = require("express")
const fs = require("fs")

const app = express()
app.use(express.static("public"))

app.get("/emp",function(req,res){
    fs.readFile("employees.json","utf8",function(err,data){
        if(err){
            console.log(err.message)
            return res.status(401).json({msg:"error in reading file"})
        }
        const response = JSON.parse(data)
        return res.status(200).json({data:response})
    })
})

app.listen(3000,function(){
    console.log("server running on 3000")
})
