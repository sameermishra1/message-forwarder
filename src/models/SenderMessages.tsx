import Message from './Message';

class SenderMessages {
  sender: string;
  messages: Message[];
  constructor(sender: string, messages: Message[]) {
    this.sender = sender;
    this.messages = messages.map(
      (msg: {isSynced: boolean; text: string}) =>
        new Message(msg.isSynced, msg.text),
    );
  }
}
export default SenderMessages;
