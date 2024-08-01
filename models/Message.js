import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;

export { MessageSchema };

