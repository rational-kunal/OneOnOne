import React from 'react';
import Chat from '../Chat';
import Video from '../Video';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export function RoomView({ localStream, otherPeerStream, shoulDisplayChat }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={5}>
        <Video stream={localStream} />
        <Video stream={otherPeerStream} />

        {shoulDisplayChat && <Chat/>}
      </Grid>
      <Grid item xs={12} md={7}>
        <Paper>xs=4</Paper>
      </Grid>
    </Grid>
  );
}
