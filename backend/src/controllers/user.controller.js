const User =
  require(
    "../models/user.model"
  );

const bcrypt =
  require(
    "bcryptjs"
  );

const jwt =
  require(
    "jsonwebtoken"
  );

// REGISTER
exports.registerUser =
  async (
    req,
    res
  ) => {

    try {

      const {
        name,
        email,
        password,
        role,
      } = req.body;

      // CHECK EXISTING USER
      const existingUser =
        await User.findOne({
          email:
            email.trim(),
        });

      if (
        existingUser
      ) {

        return res
          .status(400)
          .json({
            message:
              "User already exists",
          });

      }

      // HASH PASSWORD
      const hashedPassword =
        await bcrypt.hash(
          password.trim(),
          10
        );

      // CREATE USER
     // CREATE USER
const user =
  await User.create({
    name:
      name.trim(),
    email:
      email.trim(),
    password:
      hashedPassword,
    role:
      role ||
      "student",
  });

console.log(
  "REGISTERED USER:",
  user
);

console.log(
  "DB NAME:",
  user.db.name
);

console.log(
  "COLLECTION:",
  user.collection.name
);

res.status(201).json({
  message:
    "User registered successfully",
  user,
});

    } catch (error) {

      console.log(
        error
      );

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// LOGIN
exports.loginUser =
  async (
    req,
    res
  ) => {

    try {

      const email =
        req.body.email?.trim();

      const password =
        req.body.password?.trim();

      // FIND USER
      const user =
        await User.findOne({
          email,
        });

      // INVALID EMAIL
      if (!user) {

        return res
          .status(400)
          .json({
            message:
              "Invalid email",
          });

      }

      // CHECK PASSWORD
      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      // WRONG PASSWORD
      if (!isMatch) {

        return res
          .status(400)
          .json({
            message:
              "Wrong password",
          });

      }

      // CREATE TOKEN
      const token =
        jwt.sign(
          {
            id:
              user._id,
          },
          process.env
            .JWT_SECRET ||
            "campusconnectsecret",
          {
            expiresIn:
              "1d",
          }
        );

      // SUCCESS
      res.json({
  token,
  role: user.role,
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});

    } catch (error) {

      console.log(
        error
      );

      res.status(500).json({
        message:
          error.message,
      });

    }

  };