import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <div id="container" className="py-3 px-5">
        <Outlet />
      </div>
    </>
  );
}
