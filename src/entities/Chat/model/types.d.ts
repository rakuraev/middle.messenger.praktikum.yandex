interface ITextMessage {
  type: 'message';
  content: string;
}

interface IFileMessage {
  type: 'file';
  content: string;
}
