

import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity as Btn, TextInput as RnTextInput, View } from 'react-native';
import Icon from './Icon';

const TextInput = props => {
    const { onChangeText, keyboardType, onClear, onBlur, value, error, label, password } = props

    return (
        <View key={label} style={{ height: 60, width: "100%", marginBottom: 4 }}>
            <View style={[styles.textAreaStyles, styles.addressInputWrapper]} >
                <RnTextInput keyboardType={keyboardType} {...props} value={value} onBlur={onBlur} onChangeText={onChangeText} secureTextEntry={password} placeholder={label} style={styles.addressInput} />
                {(value !== null && value.length) ? <Btn onPress={() => { onClear() }}>
                    <Icon family='SimpleLineIcons' name="close" style={{ color: "grey", fontSize: 16 }} size={16} />
                </Btn> : null}
            </View>
            {error && <Text style={{ fontSize: 12, color: "red" }}>{error}</Text>}
        </View>
    )
}



export default (TextInput)

const styles = StyleSheet.create({
    activeTextStyle: {
        color: 'red'
    },
    backBtnStyle: {
        alignSelf: "flex-start",
        width: 30, height: 30
    },
    addressResultsItem: {
        height: 56, borderBottomColor: "rgba(0,0,0,0.09)",
        borderBottomWidth: 0.5, flexDirection: "row",
        alignItems: "center",
    },
    addressInputWrapper: {
        height: 42, flex: 0,
        backgroundColor: "#fff",
        borderRadius: 2, paddingVertical: 0
    },
    addressInput: {
        flex: 1,
        fontSize: 14, height: "100%",
        textAlignVertical: "center"
    },
    textAreaStyles: {
        borderRadius: 8, paddingVertical: 16, flexDirection: "row",
        backgroundColor: "rgba(0,0,0,0.035)",
        alignItems: "center", borderWidth: 2, borderColor: "#f9f9f9",
        paddingHorizontal: 16
    },
    container: {
        flex: 1,
        paddingTop: 42, flexDirection: "row",
        backgroundColor: "#FEFEFE",
        paddingHorizontal: 24,
        paddingVertical: 36,
        alignItems: "center"
    },
    btnStyle: {
        width: 250, height: 86,
        backgroundColor: "#fff", alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        paddingHorizontal: 24
    },
    tabStyle: { backgroundColor: 'white' }

})

