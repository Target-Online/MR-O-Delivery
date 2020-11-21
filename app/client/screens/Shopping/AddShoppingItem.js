import React, { useState } from 'react';
import { TouchableOpacity, View, Modal, Text, TouchableHighlight, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Input, theme } from 'galio-framework';

import { materialTheme } from '../../constants';

const { height, width } = Dimensions.get('screen');

export default function AddShoppingItem({
    isVisible,
    setVisible,
    shoppingList,
    setShoppingList
}) {
    const [item, setItem] = useState({ })

    const onAdd = () => {
        if(item.name){
            setShoppingList(shoppingList.concat({
                ...item,
                id: shoppingList.length,
                quantity: 1
            }))
            setVisible(false);
            setItem({})
        }
    }

    return (
        <Modal transparent={true} visible={isVisible} animationType="fade">
            <ScrollView contentContainerStyle={styles.wrapper}>
                <View overflow="hidden" style={[styles.dialogContainer, { height: 250, marginBottom: 4, padding: 0, justifyContent: "flex-start" }]}>
                    <View style={styles.topBar}>
                        <TouchableHighlight
                            onPress={() => setVisible(false)}
                            style={styles.closeIcon}>
                            <AntDesign name="close" size={20} color="white" />
                        </TouchableHighlight>
                        <Text style={{ color: "white", marginLeft: 8 }}>Add Item</Text>
                    </View>
                    <View style={styles.itemDetails}>
                        <Input
                            right
                            placeholder="Item name"
                            value={item.name}
                            color={materialTheme.COLORS.PRIMARY}
                            onChangeText={value => setItem({ ...item, name: value })}
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                            iconContent={<Octicons size={16} color={theme.COLORS.ICON} name="package" />}
                        />
                        <Input
                            right
                            placeholder="Item description"
                            value={item.description}
                            color={materialTheme.COLORS.PRIMARY}
                            onChangeText={value => setItem({ ...item, description: value })}
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                            iconContent={<Octicons size={16} color={theme.COLORS.ICON} name="package" />}
                        />
                        <TouchableOpacity onPress={() => onAdd()} style={styles.addButton}>
                            <Text style={styles.continueText}>Add Item</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        minHeight: height * 1.5,
        paddingBottom: height / 2,
        backgroundColor: materialTheme.COLORS.overlayDark60,
        flex: 2,
        alignItems: "center",
        width: "100%",
        justifyContent: "center"
    },
    dialogContainer: {
        width: width * 0.9,
        height: 300,
        backgroundColor: "#fff",
        borderRadius: 6,
        padding: 16
    },
    itemDetails: {
        alignSelf: "center",
        alignItems: "center",
        padding: 12,
        height: 200,
        justifyContent: "space-around"
    },
    userText: {
        color: materialTheme.COLORS.overlayDark60,
        fontSize: 13
    },
    addButton: {
        width: "100%",
        height: 40,
        borderRadius: 4,
        backgroundColor: materialTheme.COLORS.PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        marginTop: 40,
        alignItems: 'center',
        borderRadius: 5
    },
    continueText: {
        fontSize: 13,
        color: "white",
        fontWeight: "600"
    },
    image: {
        borderRadius: 50,
        width: 80,
        height: 80
    },
    topBar: {
        backgroundColor: materialTheme.COLORS.PRIMARY,
        height: 42,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8
    },
    commentInput: {
        borderBottomColor:
            materialTheme.COLORS.overlayDark50,
        alignSelf: "center",
        borderBottomWidth: 1,
        width: "90%",
        height: 32
    },
    continueTouchableHighlight: {
        width: "90%",
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: materialTheme.COLORS.PRIMARY,
        borderRadius: 3,
        alignSelf: "center"
    },

    closeIcon: {
        width: 30,
        height: 30,
        justifyContent: "center"
    }
});
