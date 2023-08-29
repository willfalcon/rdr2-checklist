import { Link, useLoaderData, useParams } from 'react-router-dom';
import ListItem from './ListItem';

export default function List() {
  const { items, category } = useLoaderData();

  return (
    <>
      <Link to="/">Back</Link>
      <h1 className="text-2xl font-medium mb-3">{category.name}</h1>

      {items.map(item => {
        // const isTracking = tracking.includes(satchel.id);

        return <ListItem key={item._id} {...item} />;
      })}
    </>
  );
}
