import { Platform, StatusBar, Dimensions } from 'react-native';
import { theme } from 'galio-framework';

export const { height, width } = Dimensions.get('screen');
export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = (theme.SIZES.BASE * 3.5 + (StatusHeight || 0));
export const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812);
export const shadow = {
    elevation: 5,
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: {
        height: 2
    }
}