const express = require("express") //gets express library
//const path = require("path")
// const axios = require("axios")
const mustacheExpress = require("mustache-express") //this is middleware
const userDirectory = require("./data") //look instide file in the project for data

const app = express() //app is the express
//teachs app to buil mustache engine
app.engine("mustache", mustacheExpress())

app.set("views", "./templates") //teacehs app where to find files (what if this was named templates) ./{word} tells it where to look for the files

//teaches app to use mustache for templates
app.set("view engine", "mustache")

//teaches it to use the CSS
app.use(express.static("public"))
// app.get("/info/:id", (request, responce) => {
//   responce.send(`info about user ${request.params.id}`)
// }) <- this way is the way to send only text/things that cant be used

app.get("/info/:id", (request, responce) => {
  const requestId = parseInt(request.params.id)
  const foundUser = userDirectory.users.find(user => user.id === requestId)
  responce.render("info", foundUser)
})

app.get("/", (request, responce) => {
  //responce.send("Hello again all") //appears in the webpage
  responce.render("home", userDirectory) // "home" tells engine to look in the home folder userDirectory tells it to use the data const above
})

app.listen(3000, () => {
  console.log("machine is running now") //appears in terminal
})
