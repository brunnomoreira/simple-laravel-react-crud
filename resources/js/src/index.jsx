import ReactDOM from 'react-dom/client'; 
import App from './App';

const rootEl = document.getElementById("app");

let render = () => {
  ReactDOM
    .createRoot(rootEl)
    .render(<App />);
};

render();