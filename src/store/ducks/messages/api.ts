import { backendURL } from '../../../constants';

export const endPoint = `${backendURL}/message`;

export const addMessage = () => {
  return fetch(`${endPoint}/messages`)
    .then(response => ({ response }))
    .catch(error => ({ error }));
};

export const getAllMessages = () => {
  return fetch(`${endPoint}/messages`)
    .then(response => ({ response }))
    .catch(error => ({ error }));
};

export const getAllMessagesUrl = `${endPoint}/messages`;
