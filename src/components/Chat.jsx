import React, { useContext, useRef, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { SocketContext } from '../context/context';
import Avatar from './Avatar';
import GlassContainer from './GlassContainer';
import './Chat.css';
import { isCompositeComponentWithType } from 'react-dom/test-utils';

function Chat() {
  const socket = useContext(SocketContext);
  const { userName, roomId } = useParams();
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef();
  console.log(messages);
  useEffect(() => {
    socket.emit('userJoin', { userName, roomId });

    socket.on('chat', (data) => {
      console.log(data);
      let temp = messages;
      temp.push(data);

      setMessages([...temp]);
    });
  }, [socket]);

  const sendMsg = () => {
    value && socket.emit('chat', value) && setValue('');
  };
  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <GlassContainer style={{ padding: '18px 12px' }}>
      <div className='message-wrapper'>
        {messages.map((m) =>
          m.userName === userName ? (
            <div className='row align-center justify-content-start'>
              <Avatar backgroundColor='#d1b536ce' name={m.userName} />
              <h4>{m.msg}</h4>
            </div>
          ) : (
            <div className='row align-center justify-content-end'>
              <h4>{m.msg}</h4>
              <Avatar backgroundColor='#3b1941' name={m.userName} />
            </div>
          )
        )}
        <div ref={messageEndRef}></div>
      </div>
      <div className='input-wrapper'>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
          className='input'
          type='text'
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMsg();
            }
          }}
        />
      </div>
    </GlassContainer>
  );
}

export default Chat;
