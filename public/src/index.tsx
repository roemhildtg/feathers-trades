/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { Router } from '@solidjs/router';
import { HopeProvider, HopeThemeConfig } from '@hope-ui/solid';

const config: HopeThemeConfig = {
    lightTheme: {
        colors: {
            primary9: 'salmon',
        }
    }
}

render(() => <>
    <Router>
        <HopeProvider config={config}>
            <App />
        </HopeProvider>
    </Router>
</>, document.getElementById('root') as HTMLElement);
