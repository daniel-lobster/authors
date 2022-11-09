const AuthorController = require("../controllers/author.controller")

module.exports = app => {
    // CREATE
    app.post("/api/authors", AuthorController.createAuthor)
    // READ ALL
    app.get("/api/authors", AuthorController.allAuthors)
    // READ ONE
    app.get("/api/authors/:author_id", AuthorController.oneAuthor)
    // UPDATE
    app.put("/api/authors/:author_id", AuthorController.updateAuthor)
    // DELETE
    app.delete("/api/authors/:author_id", AuthorController.deleteAuthor)
}