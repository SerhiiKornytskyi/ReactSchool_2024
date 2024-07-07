import "./App.css";
import { Wrapper } from "./components/Wrapper";
import {ErrorBoundary} from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Wrapper />
    </ErrorBoundary>
  );
}

export default App;
