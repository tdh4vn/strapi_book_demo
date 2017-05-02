import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const logger = createLogger();

const createStoreMiddleware = applyMiddleware(logger, thunk)(createStore);

export function configureStore(initialState) {
    return createStoreMiddleware(rootReducer, initialState);
}