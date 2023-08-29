import classNames from 'classnames';
import { IoAddOutline } from 'react-icons/io5';
import { Form, useFetcher } from 'react-router-dom';

export default function ListItem({ _id, name, materials, tracking = false }) {
  const fetcher = useFetcher();
  return (
    <div className="border-b grid grid-cols-2">
      <h3 className="text-lg font-medium">{name}</h3>
      <fetcher.Form method="post" action="/tracking">
        <input type="hidden" name="item" value={_id} />
        <button type="submit" className="flex items-center">
          <IoAddOutline
            className={classNames('border rounded-full mr-1', {
              'bg-slate-800': tracking,
              'text-white': tracking,
            })}
          />{' '}
          {tracking ? 'Stop Tracking' : 'Track'}
        </button>
      </fetcher.Form>
      <ul className="mb-3">
        {materials.map(({ material, quantity, count }) => (
          <li key={material._id}>
            <Form method="post">
              <input type="hidden" name="material" value={material._id} />
              <input type="hidden" name="item" value={_id} />
              <button
                className={classNames('mr-2', {
                  'line-through': count >= material.quantity,
                })}
                type="submit"
              >
                {material.name} {material.type} ({count} / {quantity})
              </button>
            </Form>
          </li>
        ))}
      </ul>
    </div>
  );
}
