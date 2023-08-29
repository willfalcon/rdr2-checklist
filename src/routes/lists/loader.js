import { client } from '@/client';

export const loader = async store => {
  const vendors = await client.fetch(`*[_type == "vendor"][] {
    name,
    _id,
    "lists": *[_type == "category" && vendor._ref == ^._id] {
      name,
      "slug": slug.current,
      _id
    }
  }`);
  return { vendors };
};
