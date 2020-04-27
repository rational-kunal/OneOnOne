import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Peer from 'peerjs';

import * as chatActions from '../../actions/chatActions';

import { RoomView } from './DumbComponents';

export const ChatContext = React.createContext();

export default function Room() {
  const { otherPeerId } = useParams();

  // todo host peer server
  const [peer] = useState(
    new Peer({ host: 'peerjs-server.herokuapp.com', secure: true, port: 443 })
  );
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
        console.info('send connection to', otherPeerId);
        setOtherPeerConnection(connection);
      } else {
        setPeerId(id);
        peer.on('connection', function (connection) {
          console.info('connection arrived from', connection);
          setOtherPeerConnection(connection);
        });
      }
    });

    peer.on('call', (call) => {
      console.info('call arrived', call);
      setCall(call);
    });
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        setLocalStream(stream);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    otherPeerConnection &&
      otherPeerConnection.on('open', () => {
        console.info('connection opened');
        otherPeerConnection.on('data', (data) => {
          chatActions.recieveBlab(data);
        });
      });
  }, [otherPeerConnection]);

  // todo: remove this block
  if (call) {
    if (!otherPeerStream) call.answer(localStream);
    call.on('stream', (stream) => setOtherPeerStream(stream));
  } else {
    if (localStream && otherPeerConnection) {
      console.info('calling to', otherPeerId);
      setCall(peer.call(otherPeerId, localStream));
    }
  }

  function sendBlab(blab) {
    otherPeerConnection.send(blab);
    chatActions.sendBlab(blab);
  }

  return (
    <ChatContext.Provider value={sendBlab}>
      <RoomView
        localStream={localStream}
        otherPeerStream={otherPeerStream}
        shoulDisplayChat={otherPeerStream !== null}
        joinData={{
          peerId,
          shouldShow: otherPeerId === undefined && !otherPeerConnection,
        }}
      />
    </ChatContext.Provider>
  );
}
