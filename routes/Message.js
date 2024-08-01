import express from 'express';
import Group from '../models/Group.js';

const router = express.Router();

router.get('/:groupId', async (req, res) => {
    const {groupId} = req.params;
    try {
      const group = await Group.findOne({ groupId });
      if (!group) {
        return res.status(404).json({ message: 'group not found' });
      }
      const message = {name: group.groupName, messages: group.messages, color: group.color}
      res.status(200).json(message);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });

  router.post('/newMessage', async (req, res) => {
    const { groupId, message } = req.body;
    try {
      const group = await Group.findOne({ groupId });
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
    const newMessage = { message, time: new Date().toISOString() };
    group.messages.push({message});
    group.chatTime = Date.now();
    await group.save();
    req.io.to(groupId).emit('receiveMessage', newMessage);
    res.status(201);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Server Error');
    }
  });


export default router;