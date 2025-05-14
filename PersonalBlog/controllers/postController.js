const { posts } = require(`../data/db`);

const index = (req, res) => {
    res.json(posts);
};

const show = (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    post ? res.json(post) : res.status(404).send(`Post con id ${id} non trovato`);
};

const create = (req, res) => {
    res.send(`Creazione di un nuovo post`);
};

const update = (req, res) => {
    const id = parseInt(req.params.id);
    res.send(`Modifica del post ${id}`);
};

const destroy = (req, res) => {
    const id = parseInt(req.params.id);
    res.send(`Cancellazione del post ${id}`);
};

module.exports = { index, show, create, update, destroy };