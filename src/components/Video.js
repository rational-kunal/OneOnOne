import React, { useState } from 'react';

export default function Video({ stream }) {
  const [videoRef] = useState(React.createRef());
  if (stream) {
    videoRef.current.srcObject = stream;
  }

  return (
    <div>
      <video width="300" height="300" ref={videoRef} autoPlay></video>
    </div>
  );
}
