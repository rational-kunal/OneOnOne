import dispatcher from '../appDispatcher';

export function recieveBlab(blab) {
    dispatcher.dispatch({
        actionType: "BLAB_REC",
        blab: {blab, by:"notme"}
    });
}

export function sendBlab(blab) {
    dispatcher.dispatch({
        actionType: "BLAB_SEND",
        blab
    });
}