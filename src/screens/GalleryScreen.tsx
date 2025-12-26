import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ActivityIndicator, SafeAreaView, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import ImageViewing from 'react-native-image-viewing';
import { usePhotos } from '../hooks/usePhotos';
import { PhotoGridItem } from '../components/PhotoGridItem';
import { Loading } from '../components/Loading';
import { ErrorView } from '../components/ErrorView';
import { useTheme } from '../utils/ThemeContext';
import { UnsplashPhoto } from '../types';

export const GalleryScreen = () => {
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch
    } = usePhotos();

    const [viewerVisible, setViewerVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const theme = useTheme();

    const photos = useMemo(() => {
        return data?.pages.flatMap(page => page) || [];
    }, [data]);

    const imageUrls = useMemo(() => {
        return photos.map(photo => ({ uri: photo.urls.regular }));
    }, [photos]);

    const handlePhotoPress = (index: number) => {
        setCurrentImageIndex(index);
        setViewerVisible(true);
    };

    if (isLoading) return <Loading />;
    if (isError) return <ErrorView onRetry={refetch} message="Failed to load gallery. Check your internet or API key." />;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.header, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
                <Text style={[styles.title, { color: theme.colors.text }]}>Event Gallery</Text>
            </View>

            <FlashList<UnsplashPhoto>
                data={photos}
                renderItem={({ item, index }) => (
                    <PhotoGridItem
                        photo={item}
                        index={index}
                        onPress={() => handlePhotoPress(index)}
                    />
                )}
                // @ts-ignore
                estimatedItemSize={200}
                numColumns={2}
                onEndReached={() => {
                    if (hasNextPage) fetchNextPage();
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() =>
                    isFetchingNextPage ? <ActivityIndicator style={{ margin: 20 }} color={theme.colors.primary} /> : null
                }
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={{ height: theme.spacing.s }} />}
            />

            <ImageViewing
                images={imageUrls}
                imageIndex={currentImageIndex}
                visible={viewerVisible}
                onRequestClose={() => setViewerVisible(false)}
                swipeToCloseEnabled={true}
                doubleTapToZoomEnabled={true}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    listContent: {
        padding: 16,
    },
});
