import app from './app.js';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db/index.js';
dotenv.config();

connectDB()
.then((res)=>{
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

app.get("/",(req,res)=>{
  res.send("Hello World");
});
