import { Link, useLoaderData } from 'react-router-dom';
import ListItem from '@/components/ListItem';
import Back from '@/components/Back';
import Title from '@/components/Title';
import classNames from 'classnames';

export default function Tracking() {
  const { items, materials } = useLoaderData();

  return (
    <>
      <Back />
      <Title>Tracking</Title>

      <h2 className="text-xl font-medium mb-1">All Materials</h2>
      <ul className="border-b">
        {materials.map(({ id, name, type, quantity, count }) => {
          return (
            <li key={id} className={classNames({ 'line-through': count >= quantity })}>
              {name} {type} ({count}/{quantity})
            </li>
          );
        })}
      </ul>
      <h2 className="text-xl font-medium mb-1">Satchels</h2>
      <ul>
        {items.map(item => {
          return <ListItem key={item._id} {...item} />;
        })}
      </ul>
    </>
  );
}
