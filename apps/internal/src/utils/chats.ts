export type IMessage = {
  id: string;
  from: string;
  chatID: string;
  content: string;
  sentAt: Date;
  delieveredAt: Date;
  readBy: {
    uid: string;
    time: Date;
  }[]
}

export type IUserChat = {
  id: string;
  with: string;
  lastMessage: string;
  type: 'user';
} 

export type IGroupChat = {
  id: string;
  users: string[];
  avatar: string;
  name: string;
  admins: string[];
  description: string;
  createdAt: Date;
  lastMessage: string;
  type: 'group';
}

export type IChat = IUserChat | IGroupChat;

export type IChatPreview = {
  ChatId: string;
  name: string;
  lastMessage: string;
  lastMessageAt: Date;
  picture: string;
}

const chats: IChat[] = [
  {
    id: '1',
    with: '2',
    type: 'user',
    lastMessage: '2'
  },
  {
    id: '2',
    with: '3',
    type: 'user',
    lastMessage: ''
  },
  {
    id: '3',
    with: '4',
    type: 'user',
    lastMessage: ''
  },
  {
    id: '4',
    users: ['auth0|649467ec877f08093c04c28b', '2', '3', '4'],
    avatar: '',
    name: 'Einsatzabteilung',
    admins: ['auth0|649467ec877f08093c04c28b'],
    description: 'Alle Mitglieder der Feuerwehr Rödingen',
    createdAt: new Date(),
    type: 'group',
    lastMessage: '1'
  }
];
const messages: IMessage[] = [
  {
    id: '1',
    from: 'system',
    chatID: '4',
    content: 'Die Gruppe wurde erstellt',
    sentAt: new Date(),
    delieveredAt: new Date(),
    readBy: []
  },
  {
    id: '2',
    from: 'auth0|649467ec877f08093c04c28b',
    chatID: '1',
    content: 'Hallo',
    sentAt: new Date(),
    delieveredAt: new Date(),
    readBy: []
  },
  {
    id: '3',
    from: 'auth0|649467ec877f08093c04c28b',
    chatID: '4',
    content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    sentAt: new Date(),
    delieveredAt: new Date(),
    readBy: []
  },
  {
    id: '4',
    from: 'Test Benutzer 1234',
    chatID: '4',
    content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    sentAt: new Date(),
    delieveredAt: new Date(),
    readBy: []
  }
];

export async function getChats(){
  return chats;
}
export async function getMessages(chatID: string){
  return messages.filter(message => message.chatID === chatID);
}
export async function getMessage(id: string){
  return messages.find(message => message.id === id);
}
export async function getChatPreview(id: string): Promise<IChatPreview|null> {
  const chat = chats.find(chat => chat.id === id);
  if(!chat) 
    throw new Error('Chat not found');

  if(!chat.lastMessage)
    return null;

  const lastMessageObj = await getMessage(chat.lastMessage);
  if(!lastMessageObj) 
    throw new Error('Message not found');
  
  let lastMessage;
  let lastMessageAt;
  let name;
  let picture;

  if(chat.type === 'user'){
    lastMessage = lastMessageObj.content;
    lastMessageAt = lastMessageObj.sentAt;
    name = chat.with;
    picture = '';
  }
  else {
    const from = lastMessageObj.from === "system"? "": lastMessageObj.from + ': ';
    lastMessage = `${from}${lastMessageObj.content}`;
    lastMessageAt = lastMessageObj.sentAt;
    name = chat.name;
    picture = chat.avatar;
  }

  return {
    ChatId: id,
    name,
    lastMessage,
    lastMessageAt,
    picture
  }
}
