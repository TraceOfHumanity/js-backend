import PostSchema from "../models/post.js";

export const createPost = async (req, res) => {
  try {
    const doc = new PostSchema({
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags,
      author: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostSchema.find().populate("author").exec();
    res.json(posts);
  } catch (error) {
    console.log("posts not found", error);
    res.status(500).json({ error: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    PostSchema.findByIdAndUpdate(
      postId,
      {
        $inc: { viewsCount: 1 },
      },
      { new: true }
    ).exec();
    const post = await PostSchema.findById(postId).populate("author").exec();

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.log("post not found", error);
    res
      .status(500)
      .json(console.log("post not found", error), { error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostSchema.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    PostSchema.findByIdAndDelete(postId).exec();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("post not found", error);
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostSchema.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const updatedPost = await PostSchema.findByIdAndUpdate(
      postId,
      {
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tags,
      },
      { new: true }
    ).exec();

    res.json(updatedPost);
  } catch (error) {
    console.log("post not found", error);
    res.status(500).json({ error: error.message });
  }
};
