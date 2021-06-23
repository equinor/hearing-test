import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { EQUINOR_GREEN } from '../../../stylesheets/colors';

/** 
 * The new design for this app only has 3 different textvariants: Big headers, small headers, and paragraphs.
 * I have therefore only made 3 variants 
 **/ 
const Typography = (props:{variant:'h1' | 'h2' | 'p', children:any, style?:StyleSheet}) => {
    let color, size, weight,fontFamily;
    if (props.variant.startsWith('h')) {
        color = EQUINOR_GREEN
        fontFamily= "Equinor-Regular";
        if (props.variant === 'h1') {
            size=28
            weight='400'
        } else {
            size=18;
            weight='500'
        }
    } else {
        fontFamily="Equinor-Light"
        color = "#000000";
        size=18;
        weight='400';
    }

    return <Text style={{fontSize:size, fontWeight:weight, color, fontFamily, ...props.style}}>{props.children}</Text>
}

export default Typography;