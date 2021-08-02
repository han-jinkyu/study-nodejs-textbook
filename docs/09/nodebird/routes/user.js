const express = require('express');

const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (user) {
            await user.addFollowing(parseInt(req.params.id, 10));
            res.send('success');
        } else {
            res.status(404).send('no user');
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.delete('/:id/follow', isLoggedIn, async (req, res, next) => {
    try {
        if (req.user.id === req.params.id) {
            return res.status(400).send('bad request');
        }
        const follower = await User.findOne({ where: { id: req.params.id } });
        if (!follower) {
            return res.status(400).send('bad request');
        }
        await req.user.removeFollowings(follower);
        res.send('success');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
