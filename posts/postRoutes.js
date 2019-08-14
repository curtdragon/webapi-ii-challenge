const express = require("express");
const Posts = require("../data/db");
const router = express.Router();

//Root of posts is /api/posts

// POST	/api/posts	Creates a post using the information sent inside the request body.
router.post("/", (req,  res) => {
    const newPost=req.body;

    if (newPost.title && newPost.contents) {
        Posts.insert(newPost)
        .then(posts => {
            res.status(201).json(posts);
        })
        //Error when request body is missing title or contents
        .catch(err => {
            res.status(500).json({
                err: err,
                error: "There was an error while saving the post to the database",
            })
        })
    } 
    //Error Creating Post
    else {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }
})

// POST	/api/posts/:id/comments	Creates a comment for the post with the specified id using information sent inside of the request body.
router.post("/:id/comments", (req, res) => {
    const {id} = req.params;
    const {comment} = req.body;
    console.log(comment);

    Posts.insertComment(id, comment)
    .then(comments => {
        res.status(201).json(comments);
    })
    .catch(err => {
        res.status(500).json({
            error: "There was an error while saving the comment to the database"
        })
    })
})


// GET	/api/posts	Returns an array of all the post objects contained in the database.
router.get("/", (req, res) => {
    Posts.find()
    .then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.status(500).json({
            message: "The posts information could not be retrieved."
        })
    })
})


// GET	/api/posts/:id	Returns the post object with the specified id.
router.get("/:id", (req, res) => {
    const {id} = req.params;

    Posts.findById(id)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({
            message: "The post information could not be retrieved."
        })
    })
})

// GET	/api/posts/:id/comments	Returns an array of all the comment objects associated with the post with the specified id.

router.get("/:id/comments", (req, res) => {
    const {id} = req.params;

    Posts.findPostComments(id)
    .then(comments => {
        res.status(200).json(comments);
        console.log("Comments Object",comments);
    })
    .catch(err => {
        res.status(500).json({
            error: "The comments information could not be retrieved."
        })
    })
})


// DELETE	/api/posts/:id	Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    Posts.remove(id)
    .then(posts => {
        res.json(posts)
    })
    .catch(err => {
        res.status(500).json({
            error: "The post could not be removed"
        })
    })
})



// PUT	/api/posts/:id	Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.

router.put("/:id", (req, res) =>{
    const {id} = req.params;
    const updatePost = req.body;
    Posts.update(id,updatePost)
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((err) => {
        res.status(500).json({
            error: "The post information could not be modified." 
        })
    })
})

module.exports = router;