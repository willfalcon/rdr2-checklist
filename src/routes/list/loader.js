import { client } from '@/client';

export const loader = async ({ params }, store) => {
  const { items, category } = await client.fetch(
    `{
  "items": *[_type == "item" && category->slug.current == $slug] {
  _id,
  name,
  materials[] {
    material-> {
      _id,
      name,
      "type": type->name,
    },
    quantity
  }
},
  "category": *[_type == "category" && slug.current == $slug][0] {
    _id,
    name
  }
}`,
    { slug: params.slug }
  );
  const state = store.getState();

  const joinedItems = items.map(item => {
    const stateItem = state.lists.items.find(i => i.id === item._id);

    const materials = item.materials.map(material => {
      const mat = stateItem ? stateItem.materials.find(m => m.id === material.material._id) : false;

      const count = mat ? mat.count : 0;
      return { ...material, count };
    });

    const tracking = state.tracking.items.includes(item._id);

    return {
      ...item,
      materials,
      tracking,
    };
  });
  return { items: joinedItems, category };
};
