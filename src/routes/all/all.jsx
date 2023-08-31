import { Link, useLoaderData } from 'react-router-dom';
import Title from '../../components/Title';

export default function All() {
  const { materials } = useLoaderData();
  return (
    <>
      <Link to="/">Back</Link>
      <Title>All Materials</Title>
      <ul>
        {materials.map(material => {
          // const isTracking = tracking.includes(satchel.id);

          return (
            <li key={material._id}>
              {material.name} {material.type} - {material.quantity}
            </li>
          );
        })}
      </ul>
    </>
  );
}
