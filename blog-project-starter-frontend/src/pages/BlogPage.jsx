import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const API_BASE_URL = process.env.REACT_APP_API_URL ; // || 'http://localhost:5000'

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // For Read Full Post modal

  // Form states
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBlogs();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'jaga@gmail.com' && user.uid === 'R1Z3EeKQXAcJRA57AQECeBYcPlJ3') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/blogs`);
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.log('Error fetching blogs:', err);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const formattedTags = tags.split(',').map(t => t.trim()).filter(Boolean);
    const blogData = { title, tags: formattedTags, content, author: 'Jagadeeswaran K' };

    try {
      await fetch(`${API_BASE_URL}/api/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData)
      });
      setTitle('');
      setTags('');
      setContent('');
      setIsCreateOpen(false);
      fetchBlogs();
    } catch (err) {
      console.log('Error creating blog:', err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formattedTags = typeof tags === 'string' ? tags.split(',').map(t => t.trim()).filter(Boolean) : tags;
    const blogData = { title, tags: formattedTags, content };

    try {
      await fetch(`${API_BASE_URL}/api/blogs/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData)
      });
      setIsEditOpen(false);
      setEditId(null);
      setTitle('');
      setTags('');
      setContent('');
      fetchBlogs();
      if (selectedPost) setSelectedPost(null);
    } catch (err) {
      console.log('Error updating blog:', err);
    }
  };

  const openEditModal = (blog, e) => {
    if (e) e.stopPropagation();
    setEditId(blog._id);
    setTitle(blog.title);
    setTags(blog.tags ? blog.tags.join(', ') : '');
    setContent(blog.content);
    setIsEditOpen(true);
  };

  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await fetch(`${API_BASE_URL}/api/blogs/${id}`, { method: 'DELETE' });
        setSelectedPost(null);
        fetchBlogs();
      } catch (err) {
        console.log('Error deleting blog:', err);
      }
    }
  };

  const handleLike = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      const res = await fetch(`${API_BASE_URL}/api/blogs/${id}/like`, { method: 'PUT' });
      const updatedBlog = await res.json();
      setBlogs(blogs.map(b => b._id === id ? updatedBlog : b));
      if (selectedPost && selectedPost._id === id) {
        setSelectedPost(updatedBlog);
      }
    } catch (err) {
      console.log('Error liking blog:', err);
    }
  };

  const filteredBlogs = blogs.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.tags && b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="bg-[#09090b] text-white min-h-screen py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Header Section */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-orange-500 font-bold bg-orange-950/40 px-4 py-1.5 rounded-full border border-orange-900/50">
            Insights & Technical Articles
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Jagadeeswaran 's <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Technical Blog</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">
            Sharing my learnings, full-stack web development tutorials, and software architecture articles.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-rose-500 mx-auto rounded-full mt-3"></div>
        </div>

        {/* Admin Action: Add New Blog Post Button */}
        {isAdmin && (
          <div className="flex justify-center">
            <button
              onClick={() => {
                setTitle('');
                setTags('');
                setContent('');
                setIsCreateOpen(true);
              }}
              className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold px-7 py-3 rounded-xl text-sm transition shadow-lg shadow-orange-600/20 flex items-center gap-2"
            >
              + Add New Blog
            </button>
          </div>
        )}

        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search articles by title or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-orange-500 px-5 py-3.5 rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none transition shadow-inner"
          />
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBlogs.length === 0 ? (
            <div className="col-span-full text-center py-16 text-zinc-500">
              No blog posts found matching your criteria.
            </div>
          ) : (
            filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                onClick={() => setSelectedPost(blog)}
                className="bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 p-7 rounded-3xl space-y-4 shadow-xl cursor-pointer transition flex flex-col justify-between group hover:shadow-[0_0_35px_rgba(255,99,71,0.35)] hover:border-[#ff6347]/50"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs text-zinc-400">
                    <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="text-orange-500 font-medium">By {blog.author}</span>
                  </div>

                  <h2 className="text-xl font-bold text-white group-hover:text-orange-400 transition leading-snug">
                    {blog.title}
                  </h2>

                  <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                    {blog.content}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedPost(blog); }}
                    className="text-orange-500 hover:text-orange-400 text-xs font-bold transition flex items-center gap-1"
                  >
                    Read Full Post
                  </button>

                  <div className="flex items-center gap-2">
                    {/* Admin Edit & Delete buttons */}
                    {isAdmin && (
                      <>
                        <button
                          onClick={(e) => openEditModal(blog, e)}
                          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold px-3 py-1.5 rounded-lg text-xs transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => handleDelete(blog._id, e)}
                          className="bg-rose-950/50 border border-rose-900/60 hover:bg-rose-900 text-rose-400 font-semibold px-3 py-1.5 rounded-lg text-xs transition"
                        >
                          Delete
                        </button>
                      </>
                    )}

                    {/* Like Button (Visible to everyone) */}
                    <button
                      onClick={(e) => handleLike(blog._id, e)}
                      className="bg-zinc-800/80 hover:bg-zinc-800 text-rose-500 border border-zinc-700/60 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                    >
                      ❤️ {blog.likes}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 1. READ FULL POST MODAL */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#121216] border border-zinc-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 space-y-6 shadow-2xl relative">

              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 p-2 rounded-full transition"
              >
                ✕
              </button>

              <div className="space-y-2 pr-8">
                <span className="text-xs text-orange-500 font-medium">
                  {new Date(selectedPost.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • By {selectedPost.author}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                  {selectedPost.title}
                </h2>
                {selectedPost.tags && selectedPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedPost.tags.map((tag, idx) => (
                      <span key={idx} className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] px-2.5 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-zinc-300 text-sm md:text-base leading-relaxed whitespace-pre-line border-t border-zinc-800 pt-6">
                {selectedPost.content}
              </div>

              <div className="pt-6 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => handleLike(selectedPost._id)}
                  className="bg-rose-950/60 border border-rose-900/60 hover:bg-rose-900 text-rose-400 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition shadow-lg shadow-rose-950/30"
                >
                  ❤️ Like Post ({selectedPost.likes})
                </button>

                <div className="flex items-center gap-3">
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => { openEditModal(selectedPost); }}
                        className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold px-4 py-2.5 rounded-xl text-xs transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(selectedPost._id)}
                        className="bg-rose-950/60 border border-rose-900 text-rose-400 font-bold px-4 py-2.5 rounded-xl text-xs transition"
                      >
                        Delete
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold px-5 py-2.5 rounded-xl text-xs transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. CREATE BLOG POST MODAL */}
        {isCreateOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#121216] border border-zinc-800 w-full max-w-xl rounded-3xl p-8 space-y-6 shadow-2xl relative">
              <button
                onClick={() => setIsCreateOpen(false)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 p-2 rounded-full transition"
              >
                ✕
              </button>

              <h2 className="text-xl font-black text-white">Add New Technical Blog</h2>

              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Blog Title</label>
                  <input
                    type="text"
                    placeholder="*Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Tags (Comma-Separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. *MERN,*React, *JavaScript"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Article Content</label>
                  <textarea
                    rows="5"
                    placeholder="Write full article body here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500 resize-none"
                    required
                  ></textarea>
                </div>
                <div className="flex gap-4 pt-2">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold px-6 py-3 rounded-xl text-xs transition shadow-lg shadow-orange-600/30"
                  >
                    Publish Post
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreateOpen(false)}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold px-6 py-3 rounded-xl text-xs transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 3. EDIT BLOG POST MODAL */}
        {isEditOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#121216] border border-zinc-800 w-full max-w-xl rounded-3xl p-8 space-y-6 shadow-2xl relative">
              <button
                onClick={() => setIsEditOpen(false)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 p-2 rounded-full transition"
              >
                ✕
              </button>

              <h2 className="text-xl font-black text-white">Edit Technical Blog</h2>

              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Blog Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Tags (Comma-Separated)</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Article Content</label>
                  <textarea
                    rows="5"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500 resize-none"
                    required
                  ></textarea>
                </div>
                <div className="flex gap-4 pt-2">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold px-6 py-3 rounded-xl text-xs transition shadow-lg shadow-orange-600/30"
                  >
                    Update Post
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold px-6 py-3 rounded-xl text-xs transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogPage;
