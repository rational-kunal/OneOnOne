import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [joinId, setJoinId] = useState('');
  return (
    <ul>
      <li>
        <Link to="/create">create</Link>
      </li>
      <li>
        <input value={joinId} onChange={(e) => setJoinId(e.target.value)} />
        <Link to={'/join/' + joinId}>join</Link>
      </li>
    </ul>
  );
}
