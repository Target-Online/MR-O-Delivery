import React from 'react';
import { WSnackBar, WToast } from 'react-native-smart-tip';
import { SimpleLineIcons } from '@expo/vector-icons';

import { materialTheme } from '../constants';

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


export const toastInfo = (message, iconName) => WToast.show({
    data: message,
    textColor: '#ffffff',
    backgroundColor: materialTheme.COLORS.PRIMARY,
    duration: WToast.duration.LONG, //1.SHORT 2.LONG
    position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    icon: iconName ? <SimpleLineIcons size={16} color={materialTheme.COLORS.ICON} name={iconName} /> : null
})


export const toastError = (message, iconName) => WToast.show({
    data: message,
    textColor: '#ffffff',
    backgroundColor: materialTheme.COLORS.ERROR,
    duration: WToast.duration.LONG, //1.SHORT 2.LONG
    position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    icon: iconName ? <SimpleLineIcons size={16} color={materialTheme.COLORS.ICON} name={iconName} /> : null
})

export const toastSuccess= (message, iconName) => WToast.show({
    data: message,
    textColor: '#ffffff',
    backgroundColor: materialTheme.COLORS.SUCCESS,
    duration: WToast.duration.LONG, //1.SHORT 2.LONG
    position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    icon: iconName ? <SimpleLineIcons size={16} color={materialTheme.COLORS.ICON} name={iconName} /> : null
})
