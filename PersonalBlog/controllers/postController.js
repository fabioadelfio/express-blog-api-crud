const { posts } = require(`../data/db`);

const index = (req, res) => {

    const filterTag = req.query.tags;

    let filteredPosts = posts;

    if (filterTag) {
        filteredPosts = filteredPosts.filter(post => post.tags.includes(filterTag));
    }

    res.json(filteredPosts);
};

const show = (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    post ? res.json(post) : res.status(404).send({ error: `Post con id ${id} non trovato` });
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

    const post = posts.find(p => p.id === id);

    if(!post) {
        res.status(404);

        return res.json({
            status: 404,
            error: `Not Found`,
            message: `Post non trovato`
        })
    }

    const index = posts.indexOf(post);
    posts.splice(index, 1);

    res.sendStatus(204);
};

module.exports = { index, show, create, update, destroy };