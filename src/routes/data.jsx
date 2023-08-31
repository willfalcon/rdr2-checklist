import { useEffect } from 'react';
import { client } from '@/client';

export default function Data() {
  useEffect(() => {
    async function doStuff() {
      const slug = 'hats';
      const records = await client.fetch(`*[_type == "item" && category->slug.current == $slug]`, { slug });
      records.forEach(record => {
        client.patch(record._id).unset(['category']).commit();
      });
      console.log(records);
    }
    doStuff();
  }, []);
  return <div></div>;
}
