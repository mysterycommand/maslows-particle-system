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
  messagesTop: number;
  messagesHeight: number;
  isShowingFireworks: boolean;
  isShowingSentiment: boolean;
}

export interface SetMessagesTopAction {
  type: 'setMessagesTop';
  payload: {
    messagesTop: number;
  };
}

export interface SetMessagesHeightAction {
  type: 'setMessagesHeight';
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

export interface SetIsShowingFireworksAction {
  type: 'setIsShowingFireworks';
  payload: {
    isShowingFireworks: boolean;
  };
}

export interface SetIsShowingSentimentAction {
  type: 'setIsShowingSentiment';
  payload: {
    isShowingSentiment: boolean;
  };
}

export type AppAction =
  | SetMessagesTopAction
  | SetMessagesHeightAction
  | AddMessageAction
  | RenderMessageAction
  | SetIsShowingFireworksAction
  | SetIsShowingSentimentAction;
