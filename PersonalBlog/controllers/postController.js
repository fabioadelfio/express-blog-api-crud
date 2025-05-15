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

const store = (req, res) => {
    const { title, content, image, tags } = req.body;

    let isRequestMalformed = false;
    let malformedElements = [];

    if(!title || typeof title !== `string` || title.length < 3) {
        isRequestMalformed = true; 
        malformedElements.push(`title`);
    }
    if(!content || typeof content !== `string` || content.length < 3) {
        isRequestMalformed = true; 
        malformedElements.push(`content`);
    }
    if(!image || typeof image !== `string` || image.length < 3) {
        isRequestMalformed = true; 
        malformedElements.push(`image`);
    }
    if(!Array.isArray(tags)) {
        isRequestMalformed = true; 
        malformedElements.push(`tags`);
    }

    if(isRequestMalformed) {
        res.status(400);
        res.json({
            error: `400 Bad Request`,
            message: `Request is malformed`,
            malformedElements
        });
        return;
    };

    let maxId = 0;

    for (const post of posts) {
        if(post.id > maxId) maxId = post.id;
    }
    const postId = maxId + 1;

    const newPost = { 
        id: postId, 
        title, 
        content, 
        image, 
        tags
    };

    console.log(newPost);

    posts.push(newPost);
    res.status(201).json(newPost);
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

module.exports = { index, show, store, update, destroy };