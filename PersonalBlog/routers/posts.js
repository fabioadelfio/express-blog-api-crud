const express = require(`express`);
const router = express.Router();
const { posts } = require(`../data/db`);

// # INDEX
router.get(`/`, (req, res) => {
    res.json(posts);
});

// # SHOW
router.get(`/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    post ? res.json(post) : res.status(404).send(`Post con id ${id} non trovato`);
});

// # CREATE
router.post(`/`, (req, res) => {
    res.send(`Creazione di un nuovo post`);
});

// # UPDATE
router.put(`/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    res.send(`Modifica del post ${id}`);
});

// # DELETE
router.delete(`/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    res.send(`Cancellazione del post ${id}`);
});

module.exports = router;
