import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Peer from 'peerjs';

import Chat from './Chat';
import Video from './Video';
import * as chatActions from '../actions/chatActions';

export default function Room() {
  const { otherPeerId } = useParams();

  const [peer] = useState(new Peer());
  const [peerId, setPeerId] = useState(null);
  const [otherPeerConnection, setOtherPeerConnection] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [call, setCall] = useState(null);
  const [otherPeerStream, setOtherPeerStream] = useState(null);

  useEffect(() => {
    peer.on('open', (id) => {
      console.info('connection id', id);
      if (otherPeerId) {
        const connection = peer.connect(otherPeerId);
        setOtherPeerConnection(connection);
      } else {
        setPeerId(id);
      }
    });

    peer.on('connection', function (connection) {
      console.info('connection arrived from', connection);
      setOtherPeerConnection(connection);

      connection.on('open', () => {
        console.info('connection opened');
        connection.on('data', (data) => {
          chatActions.recieveBlab(data);
        });
      });
    });

    peer.on('call', (call) => {
      console.log('calllll');
      setCall(call);
    });

    // navigator.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.getUserMedia;
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((stream) => {
        setLocalStream(stream);
      })
      .catch((error) => console.error(error));
  }, [otherPeerId, peer]);

  // todo: remove this block
  if (call) {
    if (!otherPeerStream) call.answer(localStream);
    call.on('stream', (stream) => setOtherPeerStream(stream));
  } else {
    if (localStream && otherPeerConnection) {
      setCall(peer.call(otherPeerId, localStream));
    }
  }

  function sendBlab(blob) {
    otherPeerConnection.send(blob);
    chatActions.sendBlab(blob);
  }

  return (
    <div>
      <h1>{peerId && 'join at ' + peerId}</h1>
      <div>
        {otherPeerConnection && <Chat sendFn={(blab) => sendBlab(blab)} />}
      </div>

      <Video stream={localStream} />
      <Video stream={otherPeerStream} />
    </div>
  );
}
