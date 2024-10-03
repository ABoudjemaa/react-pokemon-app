import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='w-full bg-slate-700 text-white p-4'>
      <ul className='flex justify-center gap-10'>
        <li><NavLink to="/category/fire">Feu</NavLink></li>
        <li><NavLink to="/category/water">Eau</NavLink></li>
        <li><NavLink to="/category/ground">Terre</NavLink></li>
        <li><NavLink to="/category/flying">Air</NavLink></li>
        <li><NavLink to="/category/grass">Plante</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
