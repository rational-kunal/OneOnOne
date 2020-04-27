import React from 'react';
import Chat from '../Chat';
import Video from '../Video';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

export function RoomView({
  localStream,
  otherPeerStream,
  shoulDisplayChat,
  joinData,
}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={5}>
        <Video stream={localStream} />
        <Video stream={otherPeerStream} />
      </Grid>
      <Grid item xs={12} md={7}>
        {joinData.shouldShow && <JoinTo peerId={joinData.peerId} />}
        {shoulDisplayChat && <Chat />}
      </Grid>
    </Grid>
  );
}

function JoinTo({ peerId }) {
  return (
    <Paper style={{ marginBottom: 12 }}>
      <Typography variant="h6" style={{ padding: 12 }}>
        {peerId ? 'share https://rational-kunal.github.io/OneOnOne/join/' + peerId : <CircularProgress />}
      </Typography>
    </Paper>
  );
}
