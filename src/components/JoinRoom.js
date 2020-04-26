import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Peer from 'peerjs';

export default function JoinRoom() {
  const { otherPeerId } = useParams();
  const [peer] = useState(new Peer());
  const [otherPeerConnection, setOtherPeerConnection] = useState(null);

  useEffect(() => {
    peer.on('open', (id) => {
      const connection = peer.connect(otherPeerId);
      setOtherPeerConnection(connection);
      
      connection.on('open', () => {
        console.info('connection arrived from', connection);
        connection.send('hello from other side');
        connection.send('hello from other side');
      });
    });
  }, [otherPeerId, peer]);

  return (
    <div>
      <h1>join {otherPeerId}</h1>
      <h1>{otherPeerConnection && "ok"}</h1>
    </div>
  );
}
