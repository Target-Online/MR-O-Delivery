import React from "react";
import { Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Block } from 'galio-framework'
import { AntDesign } from '@expo/vector-icons';

import { materialTheme } from "../../constants";

const { width } = Dimensions.get('screen');

export default function ShoppingList({ 
    shoppingList, 
    setShoppingList 
}) {
    const onRemove = item => {
        item.quantity === 1
        ? setShoppingList(shoppingList.filter(i => i.id != item.id))
        : setShoppingList(shoppingList.map(i => i.id === item.id
              ? { ...i, quantity: i.quantity - 1}
              : i
          ))
    }

    const onAdd = item => setShoppingList(shoppingList.map(i => i.id === item.id
        ? { ...i, quantity: i.quantity + 1}
        : i
    ))

    return (
        <Block center style={{ marginTop: 20 }}>
            {shoppingList.length == 0
                ? <Text style={styles.cartEmptyText}> Cart Empty </Text>
                : shoppingList.map((item, index) => (
                    <Block
                        key={index}
                        style={styles.item}>
                        <Text style={{ color: materialTheme.COLORS.PRIMARY }}>{item.name}</Text>
                        <Block style={styles.itemQuantityEdit}>
                            <TouchableOpacity onPress={() => onRemove(item)}>
                               <AntDesign color={'red'} size={20} name='minus' />
                            </TouchableOpacity>
                            <Text style={{ color: 'black' }}>{item.quantity}</Text>
                            <TouchableOpacity onPress={() => onAdd(item)}>
                                <AntDesign color={'green'} size={20} name='plus' />
                            </TouchableOpacity>
                        </Block>
                    </Block>
                ))
            }
        </Block>
    );
}

const styles = StyleSheet.create({
    cartEmptyText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: materialTheme.COLORS.PRIMARY
    },
    item: {
        margin: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        paddingRight: 20,
        paddingLeft: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        width: width * 0.88,
        flexDirection: 'row'
    },
    itemQuantityEdit: { 
        flexDirection: 'row', 
        width: 100, 
        justifyContent: 'space-between'
    }
})

