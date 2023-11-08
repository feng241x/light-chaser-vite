
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { createRoot } from 'react-dom/client';

export let designerRouter: any = null;
const container : any = document.getElementById('root');
const root = createRoot(container);
root.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
));
// ReactDOM.render(
//     <BrowserRouter ref={ref => designerRouter = ref}>
//         <App/>
//     </BrowserRouter>,
//     document.getElementById('root')
// );