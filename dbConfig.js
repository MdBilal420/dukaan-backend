const mongoose = require("mongoose")
function initializeDBConnection() {
    console.log(process.env.DB_CONNECTION)
    mongoose.connect(process.env.DB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true
    })
        .then(() => console.log("MongoDB Connected"))
        .catch(error => console.error("mongoose connection failed...", error))
}

module.exports = { initializeDBConnection }