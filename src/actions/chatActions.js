import dispatcher from '../appDispatcher';
import actionTypes from './types';

export function recieveBlab(blab) {
  dispatcher.dispatch({
    actionType: actionTypes.BLAB_RECEVIE,
    blab: { blab, by: 'notme' },
  });
}

export function sendBlab(blab) {
  dispatcher.dispatch({
    actionType: actionTypes.BLAB_SEND,
    blab: { blab, by: 'me' },
  });
}
