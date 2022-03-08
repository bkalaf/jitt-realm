///<reference path="../../node_modules/@types/react/experimental.d.ts" />
///<reference path="../../node_modules/@types/react-dom/experimental.d.ts" />
import { createRoot } from 'react-dom';
import App from './layout/App';

const el = document.getElementById('app-root')!;

createRoot(el).render(<App />);
