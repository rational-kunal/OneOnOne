import React, {useEffect, useState} from 'react';
import chatStore from '../stores/chatStore';

export default function Chat({sendFn}) {
    const [blabHistory, setBlabHistory] = useState([]);
    const [blabValue, setBlabValue] = useState("");

    useEffect(() =>{
        chatStore.addChangeListener(() => {
            setBlabHistory([...chatStore.getBlabHistory()]);
        })
    }, []);

    return (
        <>
            { blabHistory.map((blab) => <div> {blab} </div>) }

            <input value={blabValue} onChange={(e) => setBlabValue(e.target.value)} />
            <button onClick={() => sendFn(blabValue)}> send </button>
        </>
    )
}