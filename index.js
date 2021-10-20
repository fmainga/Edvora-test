const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let users = [
    {id:1, username: 'Test1', password: "Test1Pass"}
]
app.get('/', (req,res) => {
    res.send('Welcome to Edvora')
})
app.post('/register',(req,res) =>{
    const user = {
        id: users.length + 1,
        username: req.body.username,
        password: req.body.password
    }
    users.push(user)
    console.log("User added")
    res.json(user)
})
app.post('/login', (req,res) => {
const isRegistered = users.find((user) =>{
    return user.username === req.body.username && user.password === req.body.password
})
if(isRegistered){
    res.send(`Hello ${isRegistered.username}, welcome to Edvora`)
} else {
    res.send('Username and Password is incorrect.')
}
})

app.post('/change-password', (req,res) => {
    const newPassParams = {
        username: req.body.username,
        password: req.body.password,
        newPassword: req.body.newPassword
    }
    const validUser = users.find((user) =>{
        return user.username === req.body.username && user.password === req.body.password
    })

    if(validUser){
        users.push({username:req.body.username, password:req.body.newPassword})
        res.send('Password Changed')
    }else {
        res.send('Password change unauthorized')
    }

   
})

const port  = process.env.PORT || 4000

app.listen(port, () => {console.log(`App started on port ${port}`)})