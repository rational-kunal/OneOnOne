import { EventEmitter } from 'events';
import dispatcher from '../appDispatcher';
import actionTypes from '../actions/types';

const CHANGE_EVENT = 'change';
let _blabHistory = [];

class ChatStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListner(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getBlabHistory() {
    return _blabHistory;
  }
}

const chatStore = new ChatStore();

dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.BLAB_RECEVIE:
      _blabHistory.push(action.blab);
      chatStore.emitChange();
      break;
    case actionTypes.BLAB_SEND:
      _blabHistory.push(action.blab);
      chatStore.emitChange();
      break;
    default:
      break;
  }
});

export default chatStore;
