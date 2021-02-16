import React, { useState } from "react";
import { TextInput, ScrollView, StyleSheet, Dimensions } from "react-native";
import { theme } from 'galio-framework';

import { ArButton as Button } from '../../components';
import { signInWithEmailAndPassword } from '../../api/authApi'
import { materialTheme } from "../../constants";

const { width } = Dimensions.get('screen');

export default function EmailSignIn(props) {
  const [user, setUser] = useState({});

  return (
    <ScrollView contentContainerStyle={{ padding: 22 }}>
      <TextInput
        keyboardType="phone-pad"
        placeholder={"+234..."}
        onChangeText={value => setUser({ ...user, phoneNumber: value })}
        value={user.phoneNumber}
      />
      <TextInput
        placeholder='Email'
        style={styles.textInput}
        onChangeText={value => setUser({ ...user, email: value })}
        value={user.email}
      />
      <TextInput
        placeholder='Password'
        style={styles.textInput}
        onChangeText={value => setUser({ ...user, password: value })}
        value={user.password}
      />
      <Button
        textStyle={{ fontSize: 12 }}
        style={styles.button}
        onPress={() => signInWithEmailAndPassword(user, props.navigation)}
      > Submit
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 7,
  },
  verificationCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15
  },
  verificationCode: {
    color: 'orange',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  textInput: {
    marginBottom: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
    color: materialTheme.COLORS.PRIMARY
  }
})