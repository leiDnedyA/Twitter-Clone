import { Router } from 'express';
import { User } from '../models/models.js';

const router = new Router();

router.use('/api/user', async (req, res) => {
    if (!req.query.id) {
        res.status(400).send('Bad request, missing query param "id"')
        return;
    }

    const user = await User.findOne({ where: { id: req.query.id } });

    if (user) {
        res.send(user);
    } else {
        res.status(404).send('User does not exist');
    }

});

export default router;