import { createSlice } from '@reduxjs/toolkit';

import { satchels } from '../lists/satchels';

export const pearsonSlice = createSlice({
  name: 'pearson',
  initialState: {
    satchels,
  },
  reducers: {
    incrementMaterial(state, action) {
      const { satchels } = state;
      const { material, satchel } = action.payload;

      const satchelIndex = satchels.findIndex(s => s.id === satchel);
      const matIndex = satchels[satchelIndex].materials.findIndex(m => m.id === material);

      satchels[satchelIndex].materials[matIndex].count += 1;
    },
  },
});

export const { incrementMaterial } = pearsonSlice.actions;

export default pearsonSlice.reducer;
