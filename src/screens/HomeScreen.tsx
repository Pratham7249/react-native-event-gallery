import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text, StatusBar, TextInput, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useEvents } from '../hooks/useEvents';
import { EventCard } from '../components/EventCard';
import { useTheme } from '../utils/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen = () => {
    const { data: events } = useEvents();
    const navigation = useNavigation<NavigationProp>();
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredEvents = useMemo(() => {
        if (!searchQuery) return events;
        return events.filter(event =>
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [events, searchQuery]);

    const handleSearch = (text: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSearchQuery(text);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} backgroundColor={theme.colors.background} />
            <View style={styles.header}>
                <View>
                    <Text style={[styles.greeting, { color: theme.colors.textSecondary }]}>Namaste! 🙏</Text>
                    <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Explore Events</Text>
                </View>
                <Ionicons name="notifications-outline" size={24} color={theme.colors.text} style={[styles.icon, { backgroundColor: theme.colors.card }]} />
            </View>

            <View style={styles.searchContainer}>
                <View style={[styles.searchBar, { backgroundColor: theme.colors.inputBackground, borderColor: theme.dark ? '#333' : '#eee' }]}>
                    <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={{ marginRight: 8 }} />
                    <TextInput
                        placeholder="Search events, cities..."
                        placeholderTextColor={theme.colors.textSecondary}
                        style={[styles.input, { color: theme.colors.text }]}
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                    {searchQuery.length > 0 && (
                        <Ionicons name="close-circle" size={20} color={theme.colors.textSecondary} onPress={() => handleSearch('')} />
                    )}
                </View>
            </View>

            <FlatList
                data={filteredEvents}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <EventCard
                        event={item}
                        index={index}
                        onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
                    />
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>No events found.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {
        fontSize: 14,
        marginBottom: 4,
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    icon: {
        padding: 8,
        borderRadius: 50,
        overflow: 'hidden',
    },
    searchContainer: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12, // slightly taller
        borderRadius: 12,
        borderWidth: 1,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    listContent: {
        paddingBottom: 32,
    },
    emptyContainer: {
        padding: 32,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        fontStyle: 'italic',
    }
});
