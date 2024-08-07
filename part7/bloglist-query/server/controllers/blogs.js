const Blog = require("../models/Blog");
const User = require("../models/User");
const blogsRouter = require("express").Router();
const middlewares = require("../utils/middlewares");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const comment = request.body.comment.trim();

  if (!blog) {
    return response.status(404).json({ error: "blog not found" });
  }

  if (comment === "") {
    return response.status(400).json({ error: "comment cannot be empty" });
  }
  if (comment.length > 49) {
    return response.status(400).json({ error: "comment too long" });
  }

  blog.comments = blog.comments.concat(comment);

  const updatedBlog = await blog.save();
  response.status(200).json(updatedBlog);
});

blogsRouter.post(
  "/",
  middlewares.checkAndGetUserToken,
  async (request, response) => {
    const newBlogData = { ...request.body };

    if (!newBlogData.title || !newBlogData.url)
      return response.status(400).json({ error: "title or url missing" });

    const userAuthor = await User.findById(newBlogData.userLogin);

    if (!userAuthor) {
      return response.status(404).json({ error: "User not found" });
    }

    delete newBlogData.userLogin;

    newBlogData.user = userAuthor.id;

    const newBlogSchema = new Blog(newBlogData);

    newBlogSchema.likes = 0;
    newBlogSchema.comments = [];

    userAuthor.blogs = [...userAuthor.blogs].concat(newBlogSchema.id);
    await userAuthor.save();

    const newBlog = await newBlogSchema.save();
    response.status(201).json(newBlog);
  }
);

blogsRouter.put("/:id", async (request, response) => {
  const likes = request.body.likes;
  console.log(request.body);

  if (likes === undefined)
    return response.status(400).json({ error: "likes missing" });

  const blogToUpdate = await Blog.findById(request.params.id);

  const newBlog = {
    ...blogToUpdate._doc,
    likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  });
  response.status(200).json(updatedBlog);
});

blogsRouter.delete(
  "/:id",
  middlewares.checkAndGetUserToken,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() !== request.body.userLogin) {
      return response.status(401).json({ error: "unauthorized" });
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  }
);

module.exports = blogsRouter;
