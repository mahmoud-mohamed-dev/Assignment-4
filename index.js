// Mahmoud-Mohamed_C45_mon&thurs_5-8_online_assignment4_01009916596

// Assignment4

// Part1:Simple CRUD Operations Using Express.js:

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const filePath = path.join(__dirname, "users.json");

function readUsers() {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users));
}

// 1 - Create User

app.post("/user", (req, res, next) => {
  const { name, age, email } = req.body;
  const users = readUsers();

  const userExist = users.find((user) => user.email === email);
  if (userExist) {
    return res.status(409).json({ message: "Email already exists." });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    age,
    email,
  };

  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ message: "User added successfully." });
});

// 2 - Update User by ID

app.patch("/user/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const users = readUsers();

  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.json({ message: "User ID not found." });
  }

  const { name, age, email } = req.body;

  if (name !== undefined) user.name = name;
  if (age !== undefined) user.age = age;
  if (email !== undefined) user.email = email;

  writeUsers(users);
  res.json({ message: "User age updated successfully." });
});

// 3 - Delete User by ID

app.delete("/user/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const users = readUsers();

  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "User ID not found." });
  }

  users.splice(index, 1);
  writeUsers(users);

  res.json({ message: "User deleted successfully." });
});

// 4 - Get User by Name

app.get("/user/getByName", (req, res, next) => {
  const { name } = req.query;
  const users = readUsers();

  const user = users.find((u) => u.name === name);
  if (!user) {
    return res.status(404).json({ message: "User name not found." });
  }

  res.json(user);
});

// 5 - Get All Users

app.get("/user", (req, res, next) => {
  const users = readUsers();
  res.json(users);
});

// 6 - Filter Users by Minimum Age

app.get("/user/filter", (req, res, next) => {
  const minAge = Number(req.query.minAge);
  const users = readUsers();

  const filteredUsers = users.filter((u) => u.age >= minAge);

  if (!filteredUsers.length) {
    return res.status(404).json({ message: "no user found" });
  }

  res.json(filteredUsers);
});

// 7 - Get User by ID

app.get("/user/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const users = readUsers();

  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  res.json(user);
});

const port = 3000;

app.listen(port, () => {
  console.log("Application is running on port", port);
});

/////////////////////////////////////////////////////
