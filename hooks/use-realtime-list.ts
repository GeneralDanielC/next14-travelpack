import { ItemWithCategory, ListComplete } from '@/types';
import { Category, Item, List } from '@prisma/client';
import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';

type ItemDataType = {
    action: string;
    item: ItemWithCategory;
}

type ListDataType = {
    action: string;
    list: List;
}

export const useRealtimeList = (completeList: ListComplete) => {
    const [list, setList] = useState(completeList);

    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
            forceTLS: true
        });

        const channel = pusher.subscribe(`list-${list.id}`);

        const updateList = (updateFn: (prevList: ListComplete) => ListComplete) => {
            setList(prevList => {
                const updatedList = updateFn(prevList);
                
                return {
                    ...updatedList,
                    items: updatedList.items.map(item => ({
                        ...item,
                        category: item.category
                    })),
                };
            });
        };

        const handleItemUpdated = (data: ItemDataType) => {
            updateList(prevList => ({
                ...prevList,
                items: prevList.items.map(item =>
                    item.id === data.item.id ? { ...item, ...data.item } : item
                )
            }));
        }

        const handleItemCreated = (data: ItemDataType) => {
            console.log("Data", data);
            
            updateList(prevList => ({
                ...prevList,
                items: [...prevList.items, data.item]
            }));
        };

        const handleItemDeleted = (data: ItemDataType) => {
            updateList(prevList => ({
                ...prevList,
                items: prevList.items.filter(item => item.id !== data.item.id)
            }));
        };

        const handleItemChecked = (data: ItemDataType) => {
            updateList(prevList => ({
                ...prevList,
                items: prevList.items.map(item =>
                    item.id === data.item.id ? { ...item, isChecked: data.item.isChecked } : item
                )
            }));
        };

        const handleAllItemsUnchecked = () => {
            updateList(prevList => ({
                ...prevList,
                items: prevList.items.map(item => ({
                    ...item,
                    isChecked: false
                }))
            }));
        };

        const handleListUpdated = (data: ListDataType) => {
            updateList(prevList => ({
                ...prevList,
                ...data.list
            }));
        };

        channel.bind('item-updated', handleItemUpdated);
        channel.bind('item-created', handleItemCreated);
        channel.bind('item-deleted', handleItemDeleted);
        channel.bind('item-checked', handleItemChecked);
        channel.bind('all-items-unchecked', handleAllItemsUnchecked);
        channel.bind('list-updated', handleListUpdated);

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [list.id]);

    return list;
};
