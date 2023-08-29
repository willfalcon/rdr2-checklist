import { trackItem } from '../../slices/trackingSlice';

export const action = async ({ request }, store) => {
  let formData = await request.formData();
  const item = formData.get('item');
  store.dispatch(trackItem(item));
  return {};
};
