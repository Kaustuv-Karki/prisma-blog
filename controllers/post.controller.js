import prisma from "../DB/db.config.js";

export const getAllPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  if (page < 0) {
    page = 1;
  }

  if (perPage < 0 || perPage > 100) {
    perPage = 10;
  }

  const offset = (page - 1) * perPage;
  try {
    const posts = await prisma.post.findMany({
      skip: offset,
      take: perPage,
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

    const totalPosts = await prisma.post.count();
    const totalPages = Math.ceil(totalPosts / perPage);
    res.status(200).json({
      posts,
      message: "Posts fetched successfully",
      meta: { totalPages, currentPage: page, limit: perPage },
    });
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
