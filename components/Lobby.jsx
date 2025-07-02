import { useEffect, useState } from 'react';
import { listenToPlayers } from '../firebase/roomService';

const Lobby = ({ roomInfo }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const unsub = listenToPlayers(roomInfo.roomId, setPlayers);
    return () => unsub();
  }, [roomInfo.roomId]);

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl mb-4">🛰 Connected to Room: {roomInfo.roomId}</h2>
      <ul className="space-y-2">
        {players.map((p) => (
          <li key={p.id} className="bg-gray-800 p-2 rounded">
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;
