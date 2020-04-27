import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function Home() {
  const [joinId, setJoinId] = useState('');
  return (
    <div>
      <div style={{ margin: '12px' }}>
        <Link to="/create">
          <Button variant="contained">create room</Button>
        </Link>
      </div>
      <div style={{ margin: '12px' }}>
        <TextField
          style={{ marginRight: '12px' }}
          size="small"
          label="peer id"
          variant="outlined"
          value={joinId}
          onChange={(e) => setJoinId(e.target.value)}
        />
        <Link to={'/join/' + joinId}>
          <Button variant="contained" size="large">
            join
          </Button>
        </Link>
      </div>
    </div>
  );
}
