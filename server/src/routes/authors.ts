import express from 'express';
import Author from '../models/author';
import middleware from '../utils/middlewares';

const authorsRouter = express.Router();

authorsRouter.get('/', async (_req, res, next) => {
    try {
        const authors = await Author.find({}).sort({ createdAt: -1 });
        res.json(authors);
    } catch (err) {
        next(err);
    }
});

authorsRouter.get('/:ssn', async (req, res, next) => {
    try {
        const author = await Author.findOne({ ssn: req.params.ssn });
        if (author) {
            res.json(author);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
});

authorsRouter.post('/', middleware.isLoggedIn, async (req, res, next) => {
    const body = req.body;
    const session = req.session;
    try {
        const author = new Author({
            ssn: body.ssn,
            name: body.name,
            gender: body.gender,
            birth: body?.birth,
            address: body?.address,
            uploader: session!.user.id,
        });
        
        const savedAuthor = await author.save();
        res.json(savedAuthor);
    } catch (err) {
        next(err);
    }
});

authorsRouter.delete('/:ssn', middleware.isLoggedIn, async (req, res, next) => {
    const session = req.session;
    try {
        const deleted = await Author.findOneAndDelete({ uploader: session!.user.id, ssn: req.params.ssn });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(400).end();
        }
    } catch (err) {
        next(err);
    }
});

authorsRouter.put('/:ssn', middleware.isLoggedIn, async (req, res, next) => {
    const body = req.body;
    const session = req.session;
    try {
        const author = {
            ...body,
        };
        const updated = await Author.findOneAndUpdate({ uploader: session!.user.id, ssn: req.params.ssn }, author, { new: true });
        if (updated) {
            res.status(204).end();
        } else {
            res.status(400).end();
        }
    } catch (err) {
        next(err);
    }
});

export default authorsRouter;