import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, compose(applyMiddleware(thunk)));

export const persistor = persistStore(store);

export default store;
