import Group from '../models/Group.js';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';


const router = express.Router();

// Get all groups
router.get('/getAllGroups', async (req, res) => {
    try {
        const groups = await Group.find().select('-messages'); 
        res.status(200).json(groups);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Create a new group
router.post('/createGroup', async (req, res) => {
    const { groupName, color } = req.body;
    const groupId = uuidv4();
    console.log(groupName, color)

    try {
        const newGroup = new Group({
        groupId, 
        groupName,
        color,
        messages: []
        });
        const group = await newGroup.save();
        res.status(201).json({  groupId, groupName, color});
        req.io.emit('cratedGroup', { groupId, groupName, color,})
    } catch (err) {
        res.status(500).send('Server Error');
    }
});


export default router;
