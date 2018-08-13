import * as React from 'react';
import { StyleSheet, Text, View, Platform, AlertIOS , Alert} from 'react-native';

export class Websites extends React.Component {
    static navigationOptions = {
        title: 'Websites',
    };

    render() {
        return(
            <View>
                <Text>List of Websites</Text>
            </View>
        );
    }
}