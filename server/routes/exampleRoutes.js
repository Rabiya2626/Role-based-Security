const express = require('express');
const router = express.Router();
const fetchUserType = require('../middleware/fetchUserType');

router.get('/admin', fetchUserType, (req, res) => {
    let execution = true;
    try {
        let type = false;
        if (req.user.type === 'admin') {
            type = true;
            return res.status(200).json({ type });
        }

        res.status(422).json({ type });

    } catch (error) {
        execution = false;
        res.status(500).json({ execution });
    }
});

router.get('/user', fetchUserType, (req, res) => {
    let execution = true;
    try {
        let type = false;
        if (req.user.type === 'user') {
            type = true;
            return res.status(200).json({ type });
        }

        res.status(422).json({ type });

    } catch (error) {
        execution = false;
        res.status(500).json({ execution });
    }
});

router.get('/moderator', fetchUserType, (req, res) => {
    let execution = true;
    try {
        let type = false;
        if (req.user.type === 'moderator') {
            type = true;
            return res.status(200).json({ type });
        }

        res.status(422).json({ type });

    } catch (error) {
        execution = false;
        res.status(500).json({ execution });
    }
});



module.exports = router;