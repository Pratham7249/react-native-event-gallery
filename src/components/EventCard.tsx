import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Image } from 'expo-image';
import { Event } from '../types';
import { useTheme } from '../utils/ThemeContext';

interface EventCardProps {
    event: Event;
    onPress: () => void;
    index?: number;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onPress, index = 0 }) => {
    const theme = useTheme();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                delay: index * 100, // Stagger effect
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 500,
                delay: index * 100,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY }] }}>
            <TouchableOpacity
                style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.dark ? '#333' : 'rgba(0,0,0,0.05)' }]}
                onPress={onPress}
                activeOpacity={0.9}
            >
                <Image
                    source={{ uri: event.imageUrl }}
                    style={styles.image}
                    contentFit="cover"
                    transition={500}
                    cachePolicy="memory-disk"
                />
                <View style={styles.overlay}>
                    <View style={[styles.priceTag, { backgroundColor: 'rgba(255, 255, 255, 0.95)' }]}>
                        <Text style={[styles.priceText, { color: theme.colors.priceText }]}>
                            {event.price === 0 ? 'Free' : `₹${event.price}`}
                        </Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={[styles.badge, { backgroundColor: theme.dark ? '#333' : '#F0F9FF', borderColor: theme.dark ? '#444' : '#E0F2FE' }]}>
                            <Text style={[styles.badgeText, { color: theme.colors.accent }]}>{new Date(event.date).toLocaleDateString('en-IN')}</Text>
                        </View>
                        <Text style={[styles.organizer, { color: theme.colors.textSecondary }]}>{event.organizer}</Text>
                    </View>
                    <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={2}>{event.title}</Text>
                    <Text style={[styles.location, { color: theme.colors.textSecondary }]}>{event.location}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 24, // Rounded logic
        marginVertical: 8,
        marginHorizontal: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
        borderWidth: 1,
    },
    image: {
        height: 200,
        width: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    priceTag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 2,
    },
    priceText: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    content: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    organizer: {
        fontSize: 12,
        fontStyle: 'italic',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
        lineHeight: 28,
    },
    location: {
        fontSize: 14,
    },
});
