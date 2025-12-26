import React from 'react';
import { TouchableOpacity, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Image } from 'expo-image';
import { UnsplashPhoto } from '../types';
import { useTheme } from '../utils/ThemeContext';

interface PhotoGridItemProps {
    photo: UnsplashPhoto;
    onPress: () => void;
    index: number;
}

export const PhotoGridItem: React.FC<PhotoGridItemProps> = ({ photo, onPress, index }) => {
    const { width } = useWindowDimensions();
    const theme = useTheme();

    const columnCount = 2;
    const itemWidth = (width - theme.spacing.m * 3) / columnCount;
    const height = itemWidth * 1.5;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.container, { width: itemWidth, height, backgroundColor: theme.colors.card }]}
        >
            <Image
                style={styles.image}
                source={{ uri: photo.urls.small }}
                placeholder={photo.urls.thumb}
                contentFit="cover"
                transition={500}
                cachePolicy="memory-disk"
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});
