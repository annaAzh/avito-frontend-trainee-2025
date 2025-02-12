import { ItemRequest, ItemResponse } from '@/shared/types/requestTypes';
import { apiRequest } from './apiRequest';

const getItems = async () => apiRequest<ItemResponse[] | []>('get', '/items');

const getItemById = async (id: string) => apiRequest<ItemResponse>('get', `/items/${id}`);

const addNewItem = async (data: ItemRequest) => apiRequest<ItemResponse>('post', '/items', { data });

const updateItemById = async (id: string, data: ItemRequest) =>
  apiRequest<ItemResponse>('put', `/items/${id}`, { data });

const deleteItemById = async (id: string) => apiRequest<null>('delete', `/items/${id}`);

export { getItems, getItemById, updateItemById, addNewItem, deleteItemById };
