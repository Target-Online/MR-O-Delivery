import { StyleSheet, Platform, Dimensions } from 'react-native';
import { theme } from 'galio-framework';

import { HeaderHeight } from "../../constants/utils";
import materialTheme from '../../constants/Theme';

const { width, height } = Dimensions.get('screen');

export const styles = StyleSheet.create({
    profile: {
        marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
        marginBottom: -HeaderHeight * 2
    },
    profileImage: {
        width: width * 1.1,
        height: 'auto',
    },
    profileContainer: {
        width: width,
        height: height / 2,
    },
    profileDetails: {
        paddingTop: theme.SIZES.BASE * 4,
        justifyContent: 'flex-end',
        position: 'relative',
    },
    profileTexts: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE * 2,
        zIndex: 2
    },
    driver: {
        marginRight: theme.SIZES.BASE / 2,
    },
    options: {
        position: 'relative',
        padding: theme.SIZES.BASE,
        marginHorizontal: theme.SIZES.BASE,
        marginTop: -theme.SIZES.BASE * 7,
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
        elevation: 10,
        shadowOpacity: 0.15,
        shadowRadius: 4,
        shadowOffset: {
            height: 2
        }
    },
    gradient: {
        zIndex: 1,
        left: 0,
        right: 0,
        bottom: 0,
        height: '30%',
        position: 'absolute',
    },
    pageBackgroundColor: {
        position: 'absolute',
        borderRadius: 13,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        padding: 30,
        zIndex: -1,
    },
    rows: {
        height: theme.SIZES.BASE * 2,
        paddingHorizontal: theme.SIZES.BASE,
        marginBottom: theme.SIZES.BASE / 2
    },
    button: {
        paddingTop: Platform.OS === 'ios' ? 20 : 15,
        borderRadius: 5,
        alignItems: 'center',
        height: 50,
        width: 165,
        elevation: 5,
        shadowOpacity: 0.15,
        shadowRadius: 4,
        shadowOffset: {
            height: 2
        }
    },
    navbars: {
        position: 'absolute',
        top: Platform.OS === 'android' ? 110 : 60,
        left: 30,
        zIndex: 1,
        color: materialTheme.COLORS.PRIMARY
    },
    pro: {
      backgroundColor: materialTheme.COLORS.LABEL,
      paddingHorizontal: 8,
      marginLeft: 12,
      borderRadius: 2,
      height: 22
    },
    photoUpdateSpinner: {
        position: 'absolute',
        top: Platform.OS === 'android' ? 220 : 150,
        left: width * 0.48,
        zIndex: 1,
        color: materialTheme.COLORS.PRIMARY
      },
});
