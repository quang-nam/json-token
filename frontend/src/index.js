
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react'
import store from './redux/store';
import {persistor} from './redux/store';


const rootElement=  document.getElementById('root');
// pass it here
ReactDOM.render(
  <Provider store ={store}> 
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>,
    rootElement
)

