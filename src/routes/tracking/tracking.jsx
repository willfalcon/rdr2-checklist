import { Link, useLoaderData } from 'react-router-dom';

export default function Tracking() {
  const { items, materials } = useLoaderData();

  return (
    <>
      <Link to="/">Back</Link>
      <h1 className="text-2xl font-medium mb-3">Tracking</h1>

      <h2 className="text-xl font-medium mb-1">All Materials</h2>
      <ul className="border-b">
        {materials.map(({ id, name, type, quantity, count }) => {
          return (
            <li key={id}>
              {name} {type} ({count}/{quantity})
            </li>
          );
        })}
      </ul>
      <h2 className="text-xl font-medium mb-1">Satchels</h2>
      <ul>
        {items.map(item => {
          return (
            <li key={item._id}>
              <Link to={`/list/${item.category.slug}`}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
