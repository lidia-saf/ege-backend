import { getTests } from './providers/TestsDataProvider';

export const getTestsByName = async (q: string) => {
    if (q.length < 3) {
        return {
            type: 'PostsCollection',
            features: []
        };
    }

    return await getTests(q);
}
