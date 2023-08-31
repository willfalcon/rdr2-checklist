import { useLoaderData } from 'react-router-dom';
import ListItem from '@/components/ListItem';
import Back from '@/components/Back';
import Title from '@/components/Title';

export default function List() {
  const { items, category } = useLoaderData();

  return (
    <>
      <Back />
      <Title>{category.name}</Title>

      {items.map(item => {
        // const isTracking = tracking.includes(satchel.id);

        return <ListItem key={item._id} {...item} />;
      })}
    </>
  );
}
