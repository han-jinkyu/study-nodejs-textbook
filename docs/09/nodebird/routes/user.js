const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { addFollowing } = require('../controllers/user');
const User = require('../models/user');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, addFollowing);

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
