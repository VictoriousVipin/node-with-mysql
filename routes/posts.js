const express = require("express");
const db = require("../db");

const router = express.Router();

// GET A POST
router.get("/", (req, res) => {
  const id = req.query.id;
  const title = req.query.title;
  let isWhere = false;

  let query = `SELECT * FROM posts`;
  if (id) {
    isWhere = true;
    query += ` WHERE id=${id}`;
  }
  if (title) {
    query += isWhere ? ` AND ` : " WHERE ";
    query += `title='${title}'`;
  }

  db.query(query, [], (err, data) => {
    if (data.length) {
      res.status(200).send(data);
    } else {
      res.status(204).send();
    }
  });
});

// CREATE A POST
router.post("/", (req, res) => {
  const data = req.body;
  db.query(
    `INSERT INTO posts (title, description) VALUES ('${data.title}', '${data.description}')`,
    (err, data) => {
      if (err) {
        console.log(err.sqlMessage);
        res
          .status(500)
          .send({ errorCode: "500", message: "Something went wrong" });
      } else if (data) {
        res.status(200).send("Post created successfully");
      }
    }
  );
});

// UPDATE A POST
router.patch("/:id", (req, res) => {
  const data = req.body;
  const postId = req.params.id;
  db.query(
    `UPDATE posts set  title='${data.title}', description='${data.description}' where id= ${postId}`,
    (err, data) => {
      if (err) {
        console.log(err.sqlMessage);
        res
          .status(500)
          .send({ errorCode: "500", message: "Something went wrong" });
      } else if (data) {
        res.status(200).send("Post patched successfully");
      }
    }
  );
});

// DELETE A POST
router.delete("/:id", (req, res) => {
  const data = req.body;
  const postId = req.params.id;
  db.query(`DELETE FROM posts where id= ${postId}`, (err, data) => {
    if (err) {
      res.status(502).send(new Error("Something went wrong"));
    } else if (data) {
      res.status(200).send("Post deleted successfully");
    }
  });
});

module.exports = router;
