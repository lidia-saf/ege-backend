import { getAllTests,
    getTestById, 
    postTestToDatabase
} from './providers/TestsDataProvider';
import { ITests } from './providers/types';

export const getTests = async (q: string) => {
    return await getAllTests(q);
}

export const getTest = async (id: string) => {
    return await getTestById(id);
}

export const postTest = async (payload: ITests): Promise<any> => {
    return await postTestToDatabase(payload);
}