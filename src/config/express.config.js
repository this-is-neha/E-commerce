const express = require("express")

const app = express();







app.use("/", (request, response) => {
    // response.send("Hello world")

    response.status(404).json({
        result: "",
        message: "Resource not fund",
        meta: null
    })
})


module.exports = app