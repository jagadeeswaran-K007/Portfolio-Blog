const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');
const nodemailer = require('nodemailer');

dns.setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI ;
const PORT = process.env.PORT ;

mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas - Portblog Database"))
  .catch(err => console.error("MongoDB connection error:", err));

// Configure Nodemailer Transporter
// NOTE: For Gmail, use an "App Password" generated from your Google Account security settings.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER , // Your email
    pass: process.env.EMAIL_PASS   // Your email App Password
  }
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tags: { type: [String], default: [] },
  content: { type: String, required: true },
  author: { type: String, default: 'Jagadeeswaran K' },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema, 'Blog');

// 1. GET: Read all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. POST: Create a new blog
app.post('/api/blogs', async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const saved = await newBlog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. PUT: Update a blog by ID
app.put('/api/blogs/:id', async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. PUT: Like a blog (increment likes)
app.put('/api/blogs/:id/like', async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(
      req.params.id, 
      { $inc: { likes: 1 } }, 
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 5. DELETE: Delete a blog by ID
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. POST: Send Contact Form Email via Nodemailer
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER , // Receives the message
      subject: `New Portfolio Message from ${name}`,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f5; border-radius: 10px;">
          <h2 style="color: #e11d48;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #e4e4e7;">${message}</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));