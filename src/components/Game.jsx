import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react/cjs/react.development';
import { SocketContext } from '../context/context';
import GlassButton from './GlassButton';
import GlassContainer from './GlassContainer';
import Loader from './Loader';
import { GiRock, GiPaper, GiScissors } from 'react-icons/gi';
function Game() {
  const socket = useContext(SocketContext);
  const { userName, roomId } = useParams();

  const [gameState, setGameState] = useState([
    {
      userName: userName,
      id: socket.id,
      ready: false,
      score: 0,
      option: '',
    },
  ]);
  const [timer, setTimer] = useState(5);
  const [option, setOption] = useState('');
  const [show, setShow] = useState(false);
  useEffect(() => {
    timer === 0 && socket.emit('finalResult', { roomId });
  }, [timer]);

  useEffect(() => {
    socket.on('result', (data) => {
      setGameState(data);
    });
    socket.on('timer', (time) => {
      setTimer(time);
    });
  }, []);
  const onStartClickHandler = () => {
    setShow(true);
    socket.emit('startGame', { userName: userName, roomId: roomId });
  };
  const sendOption = (e) => {
    let myOption = e.currentTarget.id;
    socket.emit('option', { myOption, roomId });
    console.log(myOption);
    setOption(myOption);
  };
  // const tick = () => {
  //   if (timer !== 0 && gameState[0].ready && gameState[1].ready) {
  //     setTimer(timer - 1);
  //   }
  // };
  const handleOnAgainClick = () => {
    socket.emit('userIsRdy', { userName, roomId: roomId, option });
  };

  const getIcon = (selectedOption) => {
    switch (selectedOption) {
      case 'rock':
        return <GiRock size={60} />;
      case 'paper':
        return <GiPaper size={60} />;
      case 'scissor':
        return <GiScissors size={60} />;
      default:
        return '';
    }
  };

  return (
    <GlassContainer>
      {show ? (
        <div className='row justify-space-around align-center'>
          <div className='column align-center justify-center'>
            <h2>{gameState[0].ready ? 'ready' : 'nope'}</h2>
            <h2>{gameState && gameState[0].userName}</h2>
            <div
              className='row justify-center'
              style={{ height: 108, width: 180 }}
            >
              {gameState[0].userName === userName ? (
                <>
                  <h5 id='rock' onClick={sendOption}>
                    <GiRock size={60} />
                  </h5>
                  <h5 id='paper' onClick={sendOption}>
                    <GiPaper size={60} />
                  </h5>
                  <h5 id='scissor' onClick={sendOption}>
                    <GiScissors size={60} />
                  </h5>
                </>
              ) : (
                <div className='row align-center justify-center'>
                  {gameState[0].option === '' ? (
                    <Loader />
                  ) : (
                    <h4 style={{ textAlign: 'center' }}>
                      {getIcon(gameState[0].option)}
                    </h4>
                  )}
                </div>
              )}
            </div>
            <div>
              <h2>
                score: <span>{gameState[0].score}</span>
              </h2>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h1>{timer}</h1>
            <GlassButton text='Ready' onClick={handleOnAgainClick} />
          </div>
          {gameState[1] ? (
            <div className='column align-center justify-center'>
              <h2>{gameState[1].ready ? 'ready' : 'nope'}</h2>

              <h2>{gameState && gameState[1].userName}</h2>
              <div
                className='row justify-center'
                style={{ height: 108, width: 180 }}
              >
                {gameState[1].userName === userName ? (
                  <>
                    <h5 id='rock' onClick={sendOption}>
                      <GiRock size={60} />
                    </h5>
                    <h5 id='paper' onClick={sendOption}>
                      <GiPaper size={60} />
                    </h5>
                    <h5 id='scissor' onClick={sendOption}>
                      <GiScissors size={60} />
                    </h5>
                  </>
                ) : (
                  <div
                    style={{ height: 108 }}
                    className='row align-center justify-center'
                  >
                    {gameState[1].option === '' ? (
                      <Loader />
                    ) : (
                      <h4>{getIcon(gameState[1].option)}</h4>
                    )}
                  </div>
                )}
              </div>
              <div>
                <h2>
                  score: <span>{gameState[1].score}</span>
                </h2>
              </div>
            </div>
          ) : (
            <h2>Wait for join...</h2>
          )}
        </div>
      ) : (
        <GlassButton text='Start' onClick={onStartClickHandler} />
      )}
    </GlassContainer>
  );
}

export default Game;
