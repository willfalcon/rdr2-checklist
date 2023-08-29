import { createSlice } from '@reduxjs/toolkit';

export const listsSlice = createSlice({
  name: 'lists',
  initialState: { items: [] },
  reducers: {
    incrementMaterial(state, action) {
      const { item, material } = action.payload;
      const itemIndex = state.items.findIndex(i => i.id === item);
      if (itemIndex < 0) {
        state.items.push({ id: item, materials: [{ id: material, count: 1 }] });
      } else {
        const matIndex = state.items[itemIndex].materials.findIndex(m => m.id === material);
        if (matIndex < 0) {
          state.items[itemIndex].materials.push({ id: material, count: 1 });
        } else {
          state.items[itemIndex].materials[matIndex].count += 1;
        }
      }
    },
  },
});

export default listsSlice.reducer;

export const { incrementMaterial } = listsSlice.actions;
