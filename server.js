const express = require("express")
const mongoose = require("mongoose")
const routes = require("./Routes")

const port = process.env.PORT || 3001
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//app.use(routes)

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/friendsbase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).catch(err => console.log(err))

mongoose.connection.once("open", () => {
    app.listen(port, () => {
        console.log("server listening on port", port)
    })
})