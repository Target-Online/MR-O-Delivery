import { WSnackBar } from 'react-native-smart-tip';

export const onSuccess = message => WSnackBar.show({
    data: message,
    backgroundColor: '#a1f09c',
    position: WSnackBar.position.TOP
});

export const onError = message => WSnackBar.show({
    data: message,
    backgroundColor: '#db4d6b',
    position: WSnackBar.position.TOP
});

export const onInfo = message => WSnackBar.show({
    data: message,
    backgroundColor: '#FF9800',
    position: WSnackBar.position.TOP
});

