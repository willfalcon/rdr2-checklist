import { client } from '@/client';

export const loader = async store => {
  const { lists, tracking } = store.getState();

  // const trackedSatchels = pearson.satchels.filter(s => tracking.satchels.includes(s.id));

  const items = await client.fetch(
    `*[_id in $items] {
        _id,
        name,
        category-> {
          _id,
          "slug": slug.current,
          name
        },
        materials[] {
          quantity,
          material->{
            _id,
            name,
            "type": type->name
          }
        }
      }
    `,
    { items: tracking.items }
  );

  let obtainedMaterials = [];
  lists.items.forEach(item => {
    item.materials.forEach(({ id, count }) => {
      const index = obtainedMaterials.findIndex(m => m.id === id);
      if (index < 0) {
        obtainedMaterials.push({ id, count });
      } else {
        obtainedMaterials[index].count += count;
      }
    });
  });

  let materialsList = [];

  items.forEach(item => {
    item.materials.forEach(material => {
      const index = materialsList.findIndex(m => m.id === material.material._id);
      const obtained = obtainedMaterials.findIndex(m => m.id === material.material._id);
      const count = obtained < 0 ? 0 : obtainedMaterials[obtained].count;

      if (index < 0) {
        materialsList.push({ ...material.material, id: material.material._id, quantity: material.quantity, count });
      } else {
        materialsList[index].quantity += material.quantity;
      }
    });
  });

  return { items, materials: materialsList };
};
