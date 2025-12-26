import { useColorScheme } from 'react-native';

const palette = {
    primary: '#6C63FF',
    accent: '#00CEC9',
    error: '#FF7675',
    white: '#FFFFFF',
    offWhite: '#F8F9FA',
    black: '#2D3436',
    darkGray: '#1A1A1A',
    gray: '#636E72',
    lightGray: '#DFE6E9',
    orange: '#E65100',
    lightOrange: '#FFF5EB',
};

export const lightTheme = {
    dark: false,
    colors: {
        primary: palette.primary,
        background: palette.offWhite,
        card: palette.white,
        text: palette.black,
        textSecondary: palette.gray,
        accent: palette.accent,
        error: palette.error,
        border: palette.lightGray,
        notification: palette.primary,
        priceTag: palette.lightOrange,
        priceText: palette.orange,
        inputBackground: palette.white,
    },
    spacing: {
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
    },
    borderRadius: {
        s: 8,
        m: 12,
        l: 20,
    },
    typography: {
        title: {
            fontSize: 24,
            fontWeight: 'bold' as const,
            color: palette.black,
        },
        subtitle: {
            fontSize: 18,
            fontWeight: '600' as const,
            color: palette.black,
        },
        body: {
            fontSize: 16,
            color: palette.gray,
            lineHeight: 24,
        },
        caption: {
            fontSize: 12,
            color: palette.gray,
        },
    },
};

export const darkTheme = {
    ...lightTheme,
    dark: true,
    colors: {
        ...lightTheme.colors,
        background: '#121212',
        card: '#1E1E1E',
        text: '#ECEDEE', // Light text for dark mode
        textSecondary: '#B0B3B8',
        border: '#2C2C2C',
        inputBackground: '#2C2C2C',
        // Keep accents or adjust if needed
        priceTag: 'rgba(230, 81, 0, 0.2)', // Darker translucent orange
        priceText: '#FFCC80', // Lighter orange text
    },
    typography: {
        ...lightTheme.typography,
        title: { ...lightTheme.typography.title, color: '#ECEDEE' },
        subtitle: { ...lightTheme.typography.subtitle, color: '#ECEDEE' },
        body: { ...lightTheme.typography.body, color: '#B0B3B8' },
        caption: { ...lightTheme.typography.caption, color: '#636E72' }, // Keep dim
    },
};

// Custom hook to get current theme
export const useTheme = () => {
    const scheme = useColorScheme();
    return scheme === 'dark' ? darkTheme : lightTheme;
};
