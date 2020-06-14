import { Reducer } from 'react';
import { v4 as uuid } from 'uuid';

import { AppAction, AppState } from '../types';

export const reducer: Reducer<AppState, AppAction> = (state, action) => {
  switch (action.type) {
    case 'setMessagesTop':
      return {
        messages: state.messages,
        messagesTop: action.payload.messagesTop,
        messagesHeight: state.messagesHeight,
      };
    case 'setMessagesHeight':
      return {
        messages: state.messages,
        messagesTop: state.messagesTop,
        messagesHeight: action.payload.messagesHeight,
      };
    case 'addMessage':
      return {
        messages: [
          ...state.messages,
          {
            id: uuid(),
            createdAt: new Date().toISOString(),
            ...action.payload,
          },
        ],
        messagesTop: state.messagesTop,
        messagesHeight: state.messagesHeight,
      };
    case 'renderMessage':
      const message = state.messages.find((m) => m.id === action.payload.id);
      const index = message ? state.messages.indexOf(message) : -1;

      return message && index !== -1
        ? {
            messages: [
              ...state.messages.slice(0, index),
              {
                ...message,
                top: action.payload.top,
                height: action.payload.height,
              },
              ...state.messages.slice(index + 1),
            ],
            messagesTop: state.messagesTop,
            messagesHeight: state.messagesHeight + action.payload.height,
          }
        : state;
    default:
      return state;
  }
};

export const initialState: AppState = {
  messages: [],
  messagesTop: 0,
  messagesHeight: 0,
};
