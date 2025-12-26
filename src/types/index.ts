export interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
    imageUrl: string;
    price: number;
    organizer: string;
}

export interface UnsplashPhoto {
    id: string;
    urls: {
        regular: string;
        small: string;
        thumb: string;
        full: string;
    };
    alt_description: string;
    user: {
        name: string;
    };
}

export type RootStackParamList = {
    Home: undefined;
    EventDetail: { eventId: string };
    Gallery: undefined;
};
