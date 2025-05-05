import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">🐾 Vet Clinic</h1>
      <div className="space-x-4">
        <Link to="/" >Home</Link>
        <Link to="/appointments" >Appointments</Link>
        <Link to="/add-pet" >Add Pet</Link>
      </div>
    </nav>
  );
};

export default NavBar;
