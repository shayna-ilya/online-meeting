import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { rootReducer, rootSaga } from './ducks';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['example'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

const initialState = {};

const store = createStore(persistedReducer, initialState, enhancer);
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export { store, persistor };
