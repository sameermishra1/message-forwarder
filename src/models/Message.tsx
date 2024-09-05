class Message {
  isSynced: boolean;
  text: string;
  constructor(isSynced: boolean, text: string) {
    this.isSynced = isSynced;
    this.text = text;
  }
}
export default Message;
