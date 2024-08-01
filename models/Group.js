import mongoose from 'mongoose';
import {MessageSchema} from './Message.js';

const GroupSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  groupName: {
    type: String,
    required: true
  },
  messages: [MessageSchema]
});

const Group = mongoose.model('Group', GroupSchema);

export default Group;
