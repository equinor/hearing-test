import { createAction } from 'redux-actions';

export const addToast = createAction('Toast/ADD', (text, type = 'INFO') => ({
  id: Math.random().toString(36),
  text,
  type,
}));
