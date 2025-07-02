import { useState } from 'react';
import { createRoom } from '../firebase/roomService';
import { v4 as uuidv4 } from 'uuid';

const RoomForm = ({ onJoin }) => {
  const [roomId, setRoomId] = useState('');

  const handleJoin = async () => {
    const playerId = uuidv4();
    const randomName = '📡 Signal' + Math.floor(Math.random() * 1000);

    await createRoom(roomId, {
      id: playerId,
      name: randomName,
    });

    onJoin({ roomId, playerId, name: randomName });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl text-white">🔊 Join or Create a Room</h1>
      <input
        className="px-4 py-2 rounded bg-gray-800 text-white"
        placeholder="Room ID (e.g. alpha42)"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button
        onClick={handleJoin}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Enter Room
      </button>
    </div>
  );
};

export default RoomForm;
