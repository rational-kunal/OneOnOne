import React, { useState } from 'react';

import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import BlabSendIcon from '@material-ui/icons/CallMade';
import BlabRecievedIcon from '@material-ui/icons/CallReceived';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

export function SendBlabView({ sendToFn }) {
  const [blabValue, setBlabValue] = useState('');
  return (
    <div component="form">
      <InputBase
        style={{ marginLeft: 12 }}
        value={blabValue}
        onChange={(e) => setBlabValue(e.target.value)}
        placeholder="Chat"
      />
      <IconButton
        type="submit"
        aria-label="search"
        onClick={() => sendToFn(blabValue)}
      >
        <SendIcon />
      </IconButton>
    </div>
  );
}

export function BlabView({ blab }) {
  return (
    <>
      <ListItem button>
        <ListItemIcon>
          {blab.by === 'me' ? <BlabSendIcon /> : <BlabRecievedIcon />}
        </ListItemIcon>
        <ListItemText primary={blab.blab} />
      </ListItem>
      <Divider light />
    </>
  );
}
