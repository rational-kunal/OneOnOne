import React, { useState, useEffect } from 'react';
import Peer from 'peerjs';

export default function CreateRoom() {
  const [peer] = useState(new Peer());
  const [peerId, setPeerId] = useState(null);
  const [otherPeerConnection, setOtherPeerConnection] = useState(null);

  useEffect(() => {
    peer.on('open', (id) => setPeerId(id));

    peer.on('connection', function (connection) {
      console.info('connection arrived from', connection);
      setOtherPeerConnection(connection);
      connection.on('open', () => {
        console.log('connection opened');
        connection.on('data', (data) => {
          console.log('Received', data);
        });
      });
    });
  }, [peer]);

  return (
    <div>
      <h1>create {peerId}</h1>
      <h1>{otherPeerConnection && "ok"}</h1>
    </div>
  );
}
