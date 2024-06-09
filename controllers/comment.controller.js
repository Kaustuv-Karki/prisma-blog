import prisma from "../DB/db.config.js";

export const getAllComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        user: true,
        post: {
          include: {
            user: true,
          },
        },
      },
    });
    res
      .status(200)
      .json({ comments, message: "Comments fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createComment = async (req, res) => {
  const { content, user_id, post_id } = req.body;
  try {
    await prisma.post.update({
      where: {
        id: parseInt(post_id),
      },
      data: {
        comment_count: {
          increment: 1,
        },
      },
    });
    const comment = await prisma.comment.create({
      data: {
        content,
        user_id: parseInt(user_id),
        post_id: parseInt(post_id),
      },
    });
    res.status(201).json({ comment, message: "Comment created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentById = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    res.status(200).json({ comment, message: "Comment fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  const commentId = parseInt(req.params.id);
  const { content } = req.body;
  try {
    const comment = await prisma.comment.update({
      where: {
        id: parseInt(commentId),
      },
      data: {
        content,
      },
    });
    res.status(200).json({ comment, message: "Comment updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const commentId = parseInt(req.params.id);
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      select: {
        post_id: true, // Adjust this based on your schema
      },
    });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        comment_count: {
          decrement: 1,
        },
      },
    });
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
