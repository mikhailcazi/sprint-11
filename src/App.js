import "./App.css";
import "./css/styles.css";
import { Provider } from "react-redux";
import { store } from "./state/store";
import Pokedex from "./components/Pokedex";
import FetchPractice from "./components/fetchPractice";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <FetchPractice />
      </Provider>
    </div>
  );
}

export default App;
