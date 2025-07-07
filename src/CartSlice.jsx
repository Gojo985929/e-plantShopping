import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;

        const existingItem = state.items.find(item => item.name === name);
        if(existingItem) {
            existingItem.quantity++;
        } else {
            state.items.push({ name, image, cost, quantity: 1});
        }
    },
    removeItem: (state, action) => {
        let targetName;
        if (typeof action.payload === 'string') {
            targetName = action.payload;
        } else if (
            action.payload &&
            typeof action.payload.name === 'string'
        ) {
            targetName = action.payload.name;
        } else {
            console.error('❌ removeItem got invalid payload:', action.payload);
            return;
        }

        // now filter out by name
        state.items = state.items.filter((i) => i.name !== targetName);
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;

        const itemToUpdate = state.items.find(item => item.name === name)
        if(!itemToUpdate) return;

        if(quantity < 1)
            state.items = state.items.filter(item => item.name !== name)
        else
            itemToUpdate.quantity = quantity
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
