import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPhotos } from '../api/unsplash';
import { UnsplashPhoto } from '../types';

export const usePhotos = () => {
    return useInfiniteQuery({
        queryKey: ['photos'],
        queryFn: fetchPhotos,
        getNextPageParam: (lastPage, allPages) => {
            // Unsplash returns empty array if no more photos, or we can limit by length
            return lastPage.length > 0 ? allPages.length + 1 : undefined;
        },
        initialPageParam: 1,
    });
};
