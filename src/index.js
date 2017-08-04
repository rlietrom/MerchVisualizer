import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './semantic/dist/semantic.min.css';
// import '../semantic/dist/semantic.css';
// import '../semantic/dist/components/dimmer';
// import '../semantic/dist/components/transition';
// import '../semantic/dist/components/dropdown';
// import '../semantic/dist/components/modal';
// import '../semantic/dist/components/rating';
// import '../semantic/dist/components/tab';
// import '../semantic/dist/components/popup';
// import '../semantic/dist/components/sticky';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
