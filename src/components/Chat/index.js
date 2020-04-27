import React, { useEffect, useState, useContext } from 'react';
import chatStore from '../../stores/chatStore';
import { ChatContext } from '../Room';

import Paper from '@material-ui/core/Paper';

import { BlabView, SendBlabView } from './DumbComponets';

export default function Chat() {
  const [blabHistory, setBlabHistory] = useState([]);
  const sendFn = useContext(ChatContext);

  useEffect(() => {
    chatStore.addChangeListener(() => {
      setBlabHistory([...chatStore.getBlabHistory()]);
    });
  }, []);

  return (
    <Paper>
      {blabHistory.map((blab) => (
        <BlabView blab={blab} />
      ))}

      <SendBlabView sendToFn={sendFn} />
    </Paper>
  );
}
