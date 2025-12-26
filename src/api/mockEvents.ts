import { Event } from '../types';

export const mockEvents: Event[] = [
    {
        id: '1',
        title: 'Bangalore Tech Summit 2025',
        date: '2025-05-15',
        location: 'Palace Grounds, Bengaluru',
        description: 'Asia’s largest technology event returning to the Silicon Valley of India. Featuring discussions on AI, Space Tech, and Biotech with industry leaders from Google, Infosys, and ISRO.',
        imageUrl: 'https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?auto=format&fit=crop&q=80&w=1000', // Tech/Abstract or BLR
        price: 2499,
        organizer: 'Govt. of Karnataka',
    },
    {
        id: '2',
        title: 'Sunburn Goa Festival',
        date: '2025-12-28',
        location: 'Vagator Beach, Goa',
        description: 'Experience the electric atmosphere at Asia\'s biggest electronic music festival. 3 days of non-stop music, sun, and sand with top international DJs.',
        imageUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1000', // Surf/Beach/Party
        price: 4999,
        organizer: 'Percept Live',
    },
    {
        id: '3',
        title: 'Jaipur Literature Festival',
        date: '2026-01-19',
        location: 'Diggi Palace, Jaipur',
        description: 'The "greatest literary show on Earth". Join authors, thinkers, and humanitarians for a celebration of literature, art, and culture in the Pink City.',
        imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1000', // Jaipur/Culture
        price: 0,
        organizer: 'Teamwork Arts',
    },
    {
        id: '4',
        title: 'IPL 2025 Final Screening',
        date: '2025-05-28',
        location: 'Wankhede Stadium, Mumbai',
        description: 'Watch the grand finale of the Indian Premier League live on the big screen. Cheering, food, and cricket fever at its peak!',
        imageUrl: 'https://images.unsplash.com/photo-1631194758628-71ec7c35137f?auto=format&fit=crop&q=80&w=1000', // Cricket
        price: 999,
        organizer: 'BCCI Events',
    },
    {
        id: '5',
        title: 'Hornbill Festival',
        date: '2025-12-01',
        location: 'Kisama Heritage Village, Nagaland',
        description: 'The "Festival of Festivals". Witness the rich tribal culture of Nagaland, traditional dances, warrior log drums, and exquisite local cuisine.',
        imageUrl: 'https://images.unsplash.com/photo-1623067425178-592f87ee8a6d?auto=format&fit=crop&q=80&w=1000', // Tribal/India
        price: 500,
        organizer: 'Tourism Dept, Nagaland',
    },
];

export const getEventById = (id: string): Event | undefined => {
    return mockEvents.find((event) => event.id === id);
};
