import Game from "./components/Game";
import { app } from "./utils/FirebaseConfig";

import "./styles/root.scss";

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
