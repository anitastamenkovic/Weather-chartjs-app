import Home from "./pages/Home";
import { AppProvider } from "./store/context";

import "./style/App.css";

const App = () => {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
};

export default App;
