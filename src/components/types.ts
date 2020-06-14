export enum Sender {
  Self = 'Self',
  Other = 'Other',
}

export interface MessageData {
  id: string;
  createdAt: string;
  sender: Sender;
  content: string;
}

export interface AppState {
  messages: MessageData[];
}

export interface AddMessageAction {
  type: 'addMessage';
  payload: {
    sender: Sender;
    content: string;
  };
}

export type AppAction = AddMessageAction;
