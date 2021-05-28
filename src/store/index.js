import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {connect, Provider} from 'react-redux';
import {persistStore, persistCombineReducers} from 'redux-persist';
import rootReducers from './reducers';
import reducer from '../redux/reducer';
import storage from '@react-native-community/async-storage';
import {createWhitelistFilter} from 'redux-persist-transform-filter';

const config = {
  timeout: 50000,
  key: 'maps',
  storage,
  whitelist: ['mapsReducer'],
  debug: true, // to get useful logging
  transforms: [createWhitelistFilter('mapsReducer', ['saveSearches'])],
};
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const reducers = persistCombineReducers(config, rootReducers);
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);
const configureStore = () => {
  return {persistor, store};
};

// then run the saga
//sagaMiddleware.run(mySaga);
export default configureStore;
