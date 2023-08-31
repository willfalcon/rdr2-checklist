import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

export default function Back() {
  return (
    <Link to="/" className="flex items-center mb-3">
      <IoIosArrowBack /> Back
    </Link>
  );
}
