type Message = FileMessage | StringMessage;

type FileMessage = {
  id: number;
  time: string;
  user_id: number;
  content: string;
  type: MessageTypeFile;
  file: null;
  is_read: boolean;
  chat_id: number;
  file: FileData;
};

type StringMessage = {
  id: number;
  time: string;
  user_id: number;
  content: string;
  type: MessageTypeString;
  is_read: boolean;
  chat_id: number;
  content: string;
};

type FileData = {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
};

type MessageTypes = MessageTypeString | MessageTypeFile;

type MessageTypeString = 'message';

type MessageTypeFile = 'file';
