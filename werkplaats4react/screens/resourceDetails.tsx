import React, {useState} from 'react'
import {
    View, Text, StyleSheet, TouchableOpacity
} from 'react-native'

const resourceDetails = ({ route, navigation }) => {
    const { resource } = route.params;
    const [userRating, setUserRating] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    console.log('navigated there', resource);

}



export default resourceDetails;