import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../utils/ThemeContext';

interface ErrorViewProps {
    message?: string;
    onRetry?: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ message = 'Something went wrong.', onRetry }) => {
    const theme = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.text, { color: theme.colors.textSecondary }]}>{message}</Text>
            {onRetry && (
                <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={onRetry}>
                    <Text style={styles.buttonText}>Retry</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    text: {
        fontSize: 16,
        marginBottom: 16,
        textAlign: 'center',
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 12,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
