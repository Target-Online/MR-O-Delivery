import React from 'react';
import { StyleSheet, Switch, FlatList, Platform, TouchableOpacity, View } from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";

import materialTheme from '../../constants/Theme';

export default class Settings extends React.Component {
  state = {};

  toggleSwitch = switchNumber => this.setState({ [switchNumber]: !this.state[switchNumber] });

  renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;

    switch (item.type) {
      case 'switch':
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text size={14}>{item.title}</Text>
            <Switch
              onValueChange={() => this.toggleSwitch(item.id)}
              ios_backgroundColor={materialTheme.COLORS.SWITCH_OFF}
              thumbColor={Platform.OS === 'android' ? materialTheme.COLORS.SWITCH_OFF : null}
              trackColor={{ false: materialTheme.COLORS.SWITCH_OFF, true: materialTheme.COLORS.PRIMARY }}
              value={this.state[item.id]}
            />
          </Block>
        );
      case 'button':
        return (
          <Block style={styles.rows}>
            <TouchableOpacity onPress={() => navigate(item.title)}>
              <Block row middle space="between" style={{ paddingTop: 7 }}>
                <Text size={14}>{item.title}</Text>
                <Icon name="angle-right" family="font-awesome" style={{ paddingRight: 5 }} />
              </Block>
            </TouchableOpacity>
          </Block>);
      default:
        break;
    }
  }

  render() {
    const privacy = [
      { title: "Terms & Conditions", id: "Agreement", type: "button" },
      { title: "Privacy Policy", id: "Privacy", type: "button" },
      { title: "About", id: "About", type: "button" },
    ];

    return (
      <View
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.settings}>

        <Block style={styles.title}>
          <Text bold center size={theme.SIZES.BASE} style={{ paddingBottom: 5 }}>
            Privacy Settings
          </Text>
          <Text center muted size={12}>
            Important privacy settings
          </Text>
        </Block>
        <FlatList
          data={privacy}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  settings: {
    paddingVertical: theme.SIZES.BASE / 3,
  },
  title: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2,
  }
});
