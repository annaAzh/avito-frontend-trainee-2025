import { useMutation, useQuery } from '@tanstack/react-query';
import { getItems, getItemById, addNewItem, updateItemById, deleteItemById } from '../api';
import { ItemRequest } from '../types';

const getKey = (key: string, type: 'MUTATION' | 'QUERY') => `LIST_${key}_${type}`;

const KEYS = {
  getOne: getKey('GET_ONE', 'QUERY'),
  getAll: getKey('GET_ALL', 'QUERY'),
  add: getKey('ADD', 'MUTATION'),
  remove: getKey('REMOVE', 'MUTATION'),
  update: getKey('UPDATE', 'MUTATION'),
};

const useItems = () => {
  return useQuery({
    queryKey: [KEYS.getAll],
    queryFn: getItems,
  });
};

const useItem = (id: string) => {
  return useQuery({
    queryKey: [KEYS.getOne, id],
    queryFn: () => getItemById(id),
  });
};

const useAddNewItem = () => {
  return useMutation({
    mutationKey: [KEYS.add],
    mutationFn: (data: ItemRequest) => addNewItem(data),
  });
};

const useUpdateItemById = () => {
  return useMutation({
    mutationKey: [KEYS.update],
    mutationFn: ({ id, data }: { id: string; data: ItemRequest }) => updateItemById(id, data),
  });
};

const useDeleteItemById = (id: string) => {
  return useMutation({
    mutationKey: [KEYS.remove],
    mutationFn: () => deleteItemById(id),
  });
};

export { useItems, useItem, useAddNewItem, useUpdateItemById, useDeleteItemById };
