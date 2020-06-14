export enum Sender {
  Self = 'Self',
  Other = 'Other',
}

export interface MessageData {
  id: string;
  createdAt: string;
  sender: Sender;
  content: string;
  top?: number;
  height?: number;
}

export interface AppState {
  messages: MessageData[];
  messagesHeight: number;
}

export interface InitMessagesAction {
  type: 'initMessages';
  payload: {
    messagesHeight: number;
  };
}

export interface AddMessageAction {
  type: 'addMessage';
  payload: {
    sender: Sender;
    content: string;
  };
}

export interface RenderMessageAction {
  type: 'renderMessage';
  payload: {
    id: string;
    top: number;
    height: number;
  };
}

export type AppAction =
  | InitMessagesAction
  | AddMessageAction
  | RenderMessageAction;
