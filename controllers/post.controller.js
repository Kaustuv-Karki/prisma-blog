import prisma from "../DB/db.config.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        comment: {
          select: {
            content: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        comment_count: {
          gt: 0,
        },
      },
    });
    res.status(200).json({ posts, message: "Posts fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, content, user_id } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        user_id: parseInt(user_id),
      },
    });
    res.status(201).json({ post, message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  const postId = parseInt(req.params.id);
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    res.status(200).json({ post, message: "Post fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content } = req.body;
  try {
    const post = await prisma.post.update({
      where: {
        id: parseINt(postId),
      },
      data: {
        title,
        content,
      },
    });
    res.status(200).json({ post, message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const postId = parseInt(req.params.id);
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchPosts = async (req, res) => {
  const { query } = req.query;
  try {
    const posts = await prisma.post.findMany({
      where: {
        title: {
          search: query,
        },
      },
    });
    res.status(200).json({ posts, message: "Posts fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
