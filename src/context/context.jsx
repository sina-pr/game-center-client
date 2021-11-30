import { createContext } from "react";
const initialValueSocket = {};
export const SocketContext = createContext(initialValueSocket);

const initialValueTheme = {
  palette: {
    primarry: "#FADD2C",
    secondary: "#7A0EAD",
    teritary: "#3163AD",
  },
};
export const ThemeContext = createContext(initialValueTheme);
