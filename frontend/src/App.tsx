import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./redux/store";
import RouteApp from "./route";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouteApp />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;