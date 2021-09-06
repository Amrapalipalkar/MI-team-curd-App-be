

import express from 'express';
import { getPlayers, addPlayer, getUserById, editUser, deleteUser } from '../controller/user-controller.js';

const router = express.Router();

app.get('/users', getPlayers);
router.post('/add', addPlayer);
router.get('/:id', getUserById);
router.put('/:id', editUser);
router.delete('/:id', deleteUser);

export default router;
