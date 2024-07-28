import "./App.css";
import { Wrapper } from "./components/Wrapper/Wrapper";
import { DarkModeProvider } from "./context/index.tsx";

function App() {
  return (<DarkModeProvider><Wrapper /></DarkModeProvider>);
}

export default App;
