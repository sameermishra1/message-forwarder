import Message from './Message';

class SenderMessages {
  sender: string;
  messages: Message[];
  constructor(sender: string, messages: Message[]) {
    this.sender = sender;
    this.messages = messages.map(
      (msg: {isSyncedWithTelegram: boolean; text: string}) =>
        new Message(msg.isSyncedWithTelegram, msg.text),
    );
  }
}
export default SenderMessages;
