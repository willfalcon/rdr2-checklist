import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Title from '../../components/Title';

export default function Lists() {
  const { vendors } = useLoaderData();

  return (
    <>
      <Title>Checklists</Title>
      <div>
        <nav>
          <Link className="text-2xl font-medium block mb-3 border-b" to="/tracking">
            Tracking
          </Link>
          {vendors.map(vendor => {
            return (
              <React.Fragment key={vendor._id}>
                <h3 className="text-2xl font-medium">{vendor.name}</h3>
                <ul className="grid grid-cols-1 divide-y gap-1 mb-3">
                  {vendor.lists.map(list => {
                    return (
                      <li className="" key={list._id}>
                        <Link className="block" to={`/list/${list.slug}`}>
                          {list.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </React.Fragment>
            );
          })}
          <Link className="text-2xl font-medium block mb-3 border-b" to="/all">
            All Materials
          </Link>
        </nav>
      </div>
    </>
  );
}
