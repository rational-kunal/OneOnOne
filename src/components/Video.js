import React, { useState } from 'react';

import Card from '@material-ui/core/Card';

export default function Video({ stream }) {
  const [videoRef] = useState(React.createRef());
  if (stream) {
    videoRef.current.srcObject = stream;
  }

  return (
    <Card style={{ marginBottom: 12 }} variant="outlined" raised={true}>
      <video width="100%" height="100%" ref={videoRef} autoPlay></video>
    </Card>
  );
}
