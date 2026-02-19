const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

const authRouter = require("./routes/auth.routes")
const accountRouter = require("./routes/account.routes")
const transactionRoutes = require("./routes/transaction.routes")

//Routes//

app.use(express.json())


const allowedOrigins = [
  "http://localhost:5173",
//   "https://your-frontend-domain.com", // replace with real deployed frontend
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("/{*any}", cors(corsOptions));






app.use(cookieParser())

//User Routes//

app.get("/", (req, res) => {
    res.send("Ledger Service is up and running")
})


app.use("/api/auth", authRouter)
app.use("/api/accounts", accountRouter)
app.use("/api/transactions", transactionRoutes)


module.exports = app