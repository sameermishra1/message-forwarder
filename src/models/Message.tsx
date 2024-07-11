class Message {
  isSyncedWithTelegram: boolean;
  text: string;
  constructor(isSyncedWithTelegram: boolean, text: string) {
    this.isSyncedWithTelegram = isSyncedWithTelegram;
    this.text = text;
  }
}
export default Message;
