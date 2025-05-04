const express = require("express")
const cors = require("cors")
const zod = require("zod")

const app = express()

app.use(cors())
app.use(express.json())

const userSchema = zod.object({
    name:zod.string(),
    email:zod.string().email(),
    password:zod.string().min(8)
})

let users = []

app.get("/users",function(req,res){
    return res.json({users})
})

app.post("/users",function(req,res){
    const body = req.body
    const user = body.user
    const response = userSchema.safeParse(user)
    if(!response.success){
        return res.status(400).json({msg:"input in wrong format"})
    }

    users.push(user)
    return res.status(200).json({msg:"user created"})
})

app.post("/login",function(req,res){
    const body = req.body
    const user=users.find(function(user){
        if(user.email==body.email && user.password==body.password){
            return true
        }
    })
    if(!user){
        return res.status(401).json({msg:"user not found"})
    }
    return res.status(200).json({msg:"login successfully"})
})

app.listen(3090,function(){
    console.log("server running on port 3090")
})