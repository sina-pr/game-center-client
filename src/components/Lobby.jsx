import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SocketContext } from '../context/context';
import GlassButton from './GlassButton';
import GlassContainer from './GlassContainer';
import './Lobby.css';
import Stepper from './Stepper/Stepper';
function Lobby() {
  const steps = [
    {
      step: 1,
      text: 'Enter user name',
    },
    {
      step: 2,
      text: 'Create/Join loby',
    },
    {
      step: 3,
      text: 'Have fun!',
    },
  ];
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);
  const [lobies, setLobies] = useState([]);
  const [lobyName, setLobyName] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on('newConnection', (data) => {
      setUsers(data);
    });
    socket.on('allLobies', (data) => {
      setLobies(data);
    });
  }, [socket]);
  const handleSendUserName = () => {
    if (userName) {
      socket.emit('userJoin', { userName: userName });
      setActiveStep(2);
    } else {
      alert('Nope!');
    }
    console.log('Hi');
  };
  useEffect(() => {
    if (userName) {
      setActiveStep(1);
    } else {
      setActiveStep(0);
    }
  }, [userName]);
  const handleClickRoom = () => {
    if (userName) {
      setActiveStep(3);
    }
  };
  const handleCreateLoby = () => {
    socket.emit('NewRoom', { userName: userName, lobyName: lobyName });
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Stepper steps={steps} activeStep={activeStep} />
      <GlassContainer style={{ flex: 70, flexDirection: 'row' }}>
        <div className='column mr-1' style={{ flex: 6 }}>
          <div>
            <h4>User name:</h4>
            <input
              value={userName}
              className='input'
              onChange={(e) => setUserName(e.currentTarget.value)}
            />
          </div>

          <div>
            <h4>Loby name:</h4>
            {userName.length > 3 ? (
              <input
                className='input'
                value={lobyName}
                onChange={(e) => setLobyName(e.currentTarget.value)}
              />
            ) : (
              <input className='input' disabled />
            )}
          </div>
          <div>
            <GlassButton
              style={{ marginTop: 20 }}
              onClick={handleCreateLoby}
              text='Create Loby'
            />
          </div>
        </div>
        <div className='column justify-space-between' style={{ flex: 8 }}>
          <h4>
            Available Games:
            <span>RPS</span>
          </h4>
          <div className='row  align-center'>
            <h3>Playing now:{users.length}</h3>
          </div>
          <div className='row align-center'>
            <h4>Lobies</h4>
            <div>
              {lobies.map((l) => (
                <Link to={`/RPS/${l.id}/${userName}`} key={l.id}>
                  <GlassButton
                    onClick={handleClickRoom}
                    style={{ margin: '5px 5px' }}
                    text={l.roomName}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </GlassContainer>
    </div>
  );
}

export default Lobby;
