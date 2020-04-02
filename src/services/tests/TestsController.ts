import { getAllTests,
    getTestById, 
    postTestToDatabase,
    putTestToDatabase
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

export const putTest = async (payload: Partial<ITests>, id: string) => {
    return await putTestToDatabase(payload, id);
}