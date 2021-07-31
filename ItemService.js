import { db } from './configFirebase';

export const addItem =  (item) => {
    db.ref('/items').push({
        name: item
    });
}