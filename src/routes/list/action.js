import { incrementMaterial } from '../../slices/listsSlice';

export const action = async ({ request }, store) => {
  let formData = await request.formData();
  const item = formData.get('item');
  const material = formData.get('material');
  store.dispatch(incrementMaterial({ item, material }));
  return {};
};
