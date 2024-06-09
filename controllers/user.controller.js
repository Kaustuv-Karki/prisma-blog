import prisma from "../DB/db.config.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!findUser) {
    return res.status(400).json({ error: "User not found" });
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    res.status(200).json({ user, message: "User updated successfully" });
  } catch (error) {
    console.log(error);
  }
};
