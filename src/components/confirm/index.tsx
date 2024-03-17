import React from 'react';
import {Alert} from "react-native";

export default function Confirm(message: string): Promise<boolean> {
    return new Promise(resolve => {
        Alert.alert(
            'Confirmação',
            message,
            [
                {
                    text: 'Não',
                    style: 'cancel',
                    onPress: () => resolve(false),
                },
                {
                    text: 'Sim',
                    onPress: () => resolve(true),
                },
            ],
            { cancelable: false }
        );
    });
}