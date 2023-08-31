import { client } from '@/client';
import { alphabetical } from '@/lib/utils';

export const loader = async () => {
  const items = await client.fetch(`
    *[_type == "item"][] {
      name,
      materials[] {
        material-> {
          name,
          _id,
          legendary,
          "type": type->name
        },
        quantity
      }
    }
  `);

  let materials = [];

  items.forEach(item => {
    item.materials.forEach(({ material, quantity }) => {
      const index = materials.findIndex(m => m._id === material._id);
      if (index < 0) {
        materials.push({ ...material, quantity });
      } else if (!material.legendary) {
        materials[index].quantity += quantity;
      }
    });
  });

  materials.sort(alphabetical);

  return { materials };
};
