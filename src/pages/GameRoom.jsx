import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import Chat from '../components/Chat';
import Game from '../components/Game';
import GlassContainer from '../components/GlassContainer';
import { SocketContext } from '../context/context';

function GameRoom() {
  const { roomId, userName } = useParams();
  const Socket = useContext(SocketContext);
  useEffect(() => {
    Socket.emit('roomId', roomId);
    Socket.on('currentRoom', (data) => {
      console.log(data);
    });
    Socket.emit('joinRoom', { roomId: roomId, userName: 'sina' });
  }, [Socket]);
  return (
    <div className='container'>
      <Game />
      <Chat />
    </div>
  );
}

export default GameRoom;
