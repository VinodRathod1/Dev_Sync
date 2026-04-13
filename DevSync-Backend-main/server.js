import express from "express";// Express is a Node.js framework for building REST APIs easily
import cors from 'cors';// CORS allows requests from different origins (frontend <-> backend)
import bodyParser from "body-parser"; // Parses incoming JSON data in request bodies
// Importing database connection function from config folder
import { connectDB } from "./config/db.config.js";
// Importing all route modules (these define our API endpoints)
import authRoutes from "./routes/auth.routes.js"
import projectRoutes from "./routes/project.routes.js"
// Importing authentication middleware
import { verifyUser  } from "./middlewares/auth.middleware.js";
import taskRoutes from "./routes/task.routes.js"
import inviteRoutes  from "./routes/invite.routes.js"
// Creating an Express app instance
const app = express();

// Middleware setup (runs before route handlers)
app.use(bodyParser.json());  // Converts JSON request bodies into JS objects for easy access in req.body

app.use(cors()); // Enables cross-origin access (e.g., React app running on a different port)
// A simple GET route for testing if the server is running
app.get("/", (req,res)=>{
    res.send("hello world");
})
// Mounting route modules onto specific paths
// Public routes (no authentication required)
app.use("/auth", authRoutes)// Handles user registration and login
app.use("/project", verifyUser, projectRoutes)// CRUD operations for projects
app.use("/task", verifyUser, taskRoutes)// CRUD operations for tasks
app.use("/invite", verifyUser, inviteRoutes)// Sending and accepting invites
// A route to fetch currently logged-in user details (for frontend user profile)
app.get("/fetchDetails",verifyUser,(req,res)=>{
    return res.status(200).json(req.user)// verifyUser middleware attaches req.user
})
// Connecting to MongoDB and starting the server
connectDB().then(()=>{ // connectDB returns a Promise, so .then() ensures DB is ready
    app.listen(5001, ()=>{
        console.log("server listening on port 5001")
    })
})
