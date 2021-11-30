import "./App.css";
import Main from "./pages/Main";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { ThemeContext, SocketContext } from "./context/context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GameRoom from "./pages/GameRoom";
function App() {
  const [Socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
      transports: ["websocket"],
    });
    setSocket(newSocket);
  }, [setSocket]);

  return (
    <ThemeContext.Provider>
      <SocketContext.Provider value={Socket}>
        <Router>
          {Socket && (
            <Switch>
              <Route exact={true} path="/" component={Main} />
              <Route path="/RPS/:roomId/:userName" component={GameRoom} />
            </Switch>
          )}
        </Router>
      </SocketContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
