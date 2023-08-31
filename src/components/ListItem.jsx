import { useState } from 'react';
import classNames from 'classnames';
import { IoAddOutline } from 'react-icons/io5';
import { Form, useFetcher } from 'react-router-dom';
import { AiFillCaretRight } from 'react-icons/ai';

export default function ListItem({ _id, name, materials, tracking = false }) {
  const fetcher = useFetcher();
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b grid grid-cols-[1fr_auto]">
      <h3 className="text-lg font-medium flex items-center" onClick={() => setExpanded(!expanded)}>
        {name} <AiFillCaretRight className={classNames('transition', { 'rotate-90': expanded })} />
      </h3>
      <fetcher.Form method="post" action="/tracking" className="justify-self-end">
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
      <ul className={classNames('mb-3', { hidden: !expanded })}>
        {materials.map(({ material, quantity, count }) => {
          return (
            <li key={material._id}>
              <fetcher.Form method="post" action="/increment">
                <input type="hidden" name="material" value={material._id} />
                <input type="hidden" name="item" value={_id} />
                <button
                  className={classNames('mr-2', {
                    'line-through': count >= quantity,
                  })}
                  type="submit"
                >
                  {material.name} {material.type} ({count} / {quantity})
                </button>
              </fetcher.Form>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
