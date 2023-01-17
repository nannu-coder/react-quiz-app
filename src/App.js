import Home from "./Components/Home";
import { AppProvider } from "./Context/AppProvider";

function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

export default App;
