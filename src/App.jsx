import IsLoginProvider from "./context/IsLoginProvider";
import Router from "./shared/Router";
import "./styles/reset.css";

function App() {
  return (
    <IsLoginProvider>
      <Router />
    </IsLoginProvider>
  );
}

export default App;
