import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Share, Alert, StatusBar } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { RootStackParamList } from '../types';
import { useEvent } from '../hooks/useEvents';
import { useTheme } from '../utils/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

type EventDetailRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const EventDetailScreen = () => {
    const route = useRoute<EventDetailRouteProp>();
    const navigation = useNavigation<NavigationProp>();
    const { eventId } = route.params;
    const { data: event } = useEvent(eventId);
    const [booking, setBooking] = useState(false);
    const theme = useTheme();

    if (!event) return null;

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out ${event.title} at ${event.location}! Price: ₹${event.price}`,
                title: event.title,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleBook = () => {
        setBooking(true);
        setTimeout(() => {
            setBooking(false);
            Alert.alert("Success! 🎉", "Your ticket has been booked. See you there!");
        }, 1500);
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={{ paddingBottom: 100 }}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: event.imageUrl }}
                        style={styles.image}
                        contentFit="cover"
                        transition={500}
                        cachePolicy="memory-disk"
                    />
                    <View style={[styles.imageOverlay, { backgroundColor: theme.dark ? 'rgba(0,0,0,0.3)' : 'transparent' }]} />
                    <View style={styles.headerButtons}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
                            <Ionicons name="share-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.content, { backgroundColor: theme.colors.background }]}>
                    <View style={styles.metaRow}>
                        <View style={[styles.pill, { backgroundColor: theme.colors.border }]}>
                            <Text style={[styles.pillText, { color: theme.colors.textSecondary }]}>{new Date(event.date).toLocaleDateString('en-IN')}</Text>
                        </View>
                        <View style={[styles.pill, { backgroundColor: theme.colors.priceTag }]}>
                            <Text style={[styles.priceText, { color: theme.colors.priceText }]}>
                                {event.price === 0 ? 'Free Entry' : `₹${event.price}`}
                            </Text>
                        </View>
                    </View>

                    <Text style={[styles.title, { color: theme.colors.text }]}>{event.title}</Text>
                    <Text style={[styles.organizer, { color: theme.colors.primary }]}>by {event.organizer}</Text>

                    <View style={styles.locationContainer}>
                        <Ionicons name="location-outline" size={20} color={theme.colors.primary} />
                        <Text style={[styles.location, { color: theme.colors.textSecondary }]}>{event.location}</Text>
                    </View>

                    <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

                    <Text style={[styles.descriptionHeader, { color: theme.colors.text }]}>About</Text>
                    <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{event.description}</Text>

                    <TouchableOpacity
                        style={[styles.galleryButton, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
                        onPress={() => navigation.navigate('Gallery')}
                    >
                        <View style={[styles.galleryIconWrapper, { backgroundColor: theme.dark ? '#333' : '#F0F9FF' }]}>
                            <Ionicons name="images" size={20} color={theme.colors.primary} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.galleryButtonText, { color: theme.colors.text }]}>Event Gallery</Text>
                            <Text style={[styles.gallerySubText, { color: theme.colors.textSecondary }]}>See 300+ photos</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Fixed Bottom Booking Bar */}
            <View style={[styles.footer, { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border }]}>
                <View>
                    <Text style={[styles.footerPriceLabel, { color: theme.colors.textSecondary }]}>Total Price</Text>
                    <Text style={[styles.footerPrice, { color: theme.colors.text }]}>
                        {event.price === 0 ? 'Free' : `₹${event.price}`}
                    </Text>
                </View>
                <TouchableOpacity style={[styles.bookButton, { backgroundColor: theme.colors.primary }]} onPress={handleBook} disabled={booking}>
                    <Text style={styles.bookButtonText}>
                        {booking ? 'Processing...' : 'Book Now'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        position: 'relative',
        height: 350,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    headerButtons: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconButton: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 10,
        borderRadius: 25,
        // backdropFilter not supported in RN proper without hacks, relying on opacity
    },
    content: {
        padding: 24,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -40,
        minHeight: 500,
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    pill: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    pillText: {
        fontWeight: '600',
        fontSize: 13,
    },
    priceText: {
        fontWeight: 'bold',
        fontSize: 13,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    organizer: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 16,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    location: {
        fontWeight: '600',
        marginLeft: 6,
        fontSize: 16,
    },
    divider: {
        height: 1,
        marginVertical: 16,
    },
    descriptionHeader: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 32,
    },
    galleryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 20,
    },
    galleryIconWrapper: {
        padding: 10,
        borderRadius: 12,
        marginRight: 16,
    },
    galleryButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    gallerySubText: {
        fontSize: 12,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingBottom: 30, // For iPhone X+
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerPriceLabel: {
        fontSize: 12,
    },
    footerPrice: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    bookButton: {
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 16,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    bookButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
