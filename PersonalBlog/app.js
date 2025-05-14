const express = require(`express`);
const app = express();
const { posts, appPort, appURL } = require(`./data/db`);
const postsRouter = require('./routers/posts');


app.use(express.static(`public`));

app.get("/", (req, res) => {
    res.send(`Server del mio blog`);
});

app.get(`/bacheca`, (req, res) => {
    res.json({ posts });
});

app.use(`/posts`, postsRouter);

app.listen(appPort, () => {
    console.log(`Server listening on ${appURL}`);
});