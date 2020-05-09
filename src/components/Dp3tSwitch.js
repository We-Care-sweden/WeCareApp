import { useState } from 'react'

import {
    initWithDiscovery,
    requestPermissions,
    start,
    stop,
    isInitialized,
} from 'react-native-dp3t-sdk';

const Dp3tSwitch = () => {
    const [contactTracingEnabled, setContactTracingEnabled] = useState(false)
    const [initialized, setInitialized] = useState(false)
    const backendAppId = '';
    const publicKeyBase64 = '';

    const connectBackend = async () => {
        try {
            await initWithDiscovery(backendAppId, publicKeyBase64, true);
            await isInitialized().then(initialized => setInitialized(initialized));
        } catch (e) {
            console.log(e);
        }
    }

    const toggleSwitch = async () => {
        if (!initialized) {
            await connectBackend();
        }
        if (contactTracingEnabled) {
            stop().then(() => {
                setContactTracingEnabled(false);
            });
        } else {
            const permission = await requestPermissions();
            if (permission && permission === 'granted') {
                start().then(() => {
                    setContactTracingEnabled(true);
                });
            }
        }
    }

    <Switch
        trackColor={{ false: '#C4C4C4', true: '#33BDBD' }}
        thumbColor={'#ffffff'}
        ios_backgroundColor="#C4C4C4"
        onValueChange={() => toggleSwitch()}
        value={contactTracingEnabled}
    />
}

export default Dp3tSwitch;