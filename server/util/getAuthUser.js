module.exports = (req) => {
  try {
    const { db } = req.app;
    console.log(req?.claims?.email);
    const { id, email, firstName, lastName, avatar, batchNo, desg } = db.get("users").find({ email: req?.claims?.email }).value();

    return {
      id,
      email,
      firstName,
      lastName,
      avatar,
      batchNo,
      desg,
      name: `${firstName} ${lastName}`,
    };
  } catch (e) {
    throw new Error("User not found");
  }
};
