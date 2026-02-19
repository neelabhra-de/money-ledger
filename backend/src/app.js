const express = require("express")
const cookieParser = require("cookie-parser")

const app = express()

const authRouter = require("./routes/auth.routes")
const accountRouter = require("./routes/account.routes")
const transactionRoutes = require("./routes/transaction.routes")

//Routes//

app.use(express.json())
app.use(cookieParser())

//User Routes//

app.use("/api/auth", authRouter)
app.use("/api/accounts", accountRouter)
app.use("/api/transactions", transactionRoutes)


module.exports = app