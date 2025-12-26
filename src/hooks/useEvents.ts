import { mockEvents, getEventById } from '../api/mockEvents';

export const useEvents = () => {
    return { data: mockEvents };
};

export const useEvent = (id: string) => {
    return { data: getEventById(id) };
};
