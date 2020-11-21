import React, { useContext } from "react";
import { TouchableWithoutFeedback, ScrollView, StyleSheet, Image } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

import { Drawer as DrawerCustomItem, Icon } from '../components/';
import { materialTheme, Images } from "../constants/";
import { CurrentUserContext } from "../Store";
import appsettings from 'app/appsettings';

export default function CustomDrawerContent({
  drawerPosition,
  navigation,
  state
}) {
  const [currentUser] = useContext(CurrentUserContext)
  const insets = useSafeArea();
  const screens = currentUser && currentUser.isDriver
    ? ["Home", "History", "Settings", "Logout"]
    : ["Home", "Profile", "History", "Settings", "Logout"]
  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.25} style={styles.header}>
        <LinearGradient style={styles.linearGradient} colors={['#784212', materialTheme.COLORS.PRIMARY, 'white']}>
          <TouchableWithoutFeedback
            onPress={() => currentUser.isDriver ? navigation.navigate("Home") : navigation.navigate("Profile")}
          >
            <Block style={styles.profile}>
              <Image source={currentUser && currentUser.photoUrl ? { uri: currentUser.photoUrl } : Images.photoPlaceHolder} style={styles.avatar} />
              <Text h5 color={"white"}>
                {currentUser && currentUser.displayName}
              </Text>
            </Block>
          </TouchableWithoutFeedback>
          <Block row>
            {currentUser && currentUser.averageRating >= 2.5 &&
              <Block middle style={styles.pro}>
                <Text size={16} color="white">
                  {'pro'}
                </Text>
              </Block>
            }
            <Block row center>
              <Text size={16} color={"white"} style={styles.seller}>
                {currentUser && currentUser.isDriver ? 'Driver' : 'User'}
              </Text>
              {currentUser && currentUser.averageRating &&
                <Text size={16} color={materialTheme.COLORS.SUCCESS}>
                  {currentUser.averageRating.toFixed(2)}{" "}
                  <Icon name="shape-star" family="GalioExtra" size={14} />
                </Text>
              }</Block>
          </Block>
        </LinearGradient>
      </Block>
      <Block flex style={{ paddingLeft: 7, paddingRight: 14 }}>
        <ScrollView
          contentContainerStyle={[{
            paddingTop: insets.top * 0.4,
            paddingLeft: drawerPosition === "left" ? insets.left : 0,
            paddingRight: drawerPosition === "right" ? insets.right : 0
          }]}
          showsVerticalScrollIndicator={false}
        >
          {screens.map((item, index) => (
            <DrawerCustomItem
              title={item}
              key={index}
              navigation={navigation}
              focused={state.index === index ? true : false}
            />
          ))}
        </ScrollView>
      </Block>
      <Block row flex={0.3} style={{ display: 'flex', justifyContent: "space-around" }}>
        <Text>Version: {appsettings.version}</Text>
      </Block>
    </Block>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'transparent',
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: 'center',
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    padding: 30
  },
  footer: {
    paddingHorizontal: 28,
    justifyContent: 'flex-end'
  },
  profile: {
    marginBottom: theme.SIZES.BASE / 2,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: 8,
    borderRadius: 4,
    height: 20,
    width: 50,
  },
  seller: {
    marginRight: 16,
  }
});
