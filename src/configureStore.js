import { configureStore } from '@reduxjs/toolkit';

import monitorReducersEnhancer from './enhancers/monitorReducers';
import logger from './middleware/logger';
import rootReducer from './reducers/rootReducer';

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().prepend(logger),
    preloadedState,
    enhancers: (getDefaultEnhancers) => {
      return getDefaultEnhancers().concat(monitorReducersEnhancer)
    },
  })

  // if (process.env.NODE_ENV !== 'production' && module.hot) {
    // module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  // }

  return store
}