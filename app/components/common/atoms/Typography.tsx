import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { EQUINOR_GREEN } from '../../../stylesheets/colors';

/** 
 * The new design for this app only has 3 different textvariants: Big headers, small headers, and paragraphs.
 * I have therefore only made 3 variants 
 **/ 
const Typography = (props:{variant:'h1' | 'h2' | 'p', children:any, style?:StyleSheet}) => {
    let color, size, weight;
    if (props.variant.startsWith('h')) {
        color = EQUINOR_GREEN
        if (props.variant === 'h1') {
            size=28
            weight='300'
        } else {
            size=18;
            weight='400'
        }
    } else {
        color = "#000000";
        size=18;
        weight='300';
    }

    return <Text style={{fontSize:size, fontWeight:weight, color, ...props.style}}>{props.children}</Text>
}

export default Typography;