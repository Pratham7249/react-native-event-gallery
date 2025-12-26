import { UnsplashPhoto } from '../types';

const BASE_URL = 'https://api.unsplash.com';

export const fetchPhotos = async ({ pageParam = 1 }): Promise<UnsplashPhoto[]> => {
    const apiKey = process.env.EXPO_PUBLIC_UNSPLASH_KEY;

    if (!apiKey) {
        throw new Error('Unsplash API Key is missing. Please check your .env file.');
    }

    // Changed to search for "India" to localize the gallery
    const response = await fetch(`${BASE_URL}/search/photos?page=${pageParam}&per_page=12&query=india&orientation=portrait`, {
        headers: {
            Authorization: `Client-ID ${apiKey}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Unsplash API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results; // For search endpoint, photos are in 'results' array
};
