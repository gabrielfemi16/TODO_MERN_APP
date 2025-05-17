import download from "/download.jpeg";
import "./navbar.css";
import { useAuth } from "../../context/AuthContext";

interface NavbarProps{
    toggleNavbar: () => void;
}

const Navbar = ({ toggleNavbar}: NavbarProps) => {
  const { user } = useAuth()
  return (
    <nav>
      <div className="Navbar white_text1">
        <div className="Navbar_left">
          <i className="fa-solid fa-bars" onClick={toggleNavbar}></i>
          <div className="Navbar_search darkBlue_bg">
            <input type="text" placeholder="search..." id="search" />
            <label htmlFor="search">
              <i className="fa-brands fa-searchengin"></i>
            </label>
          </div>
        </div>
        <div className="Navbar_right">
            <i className="fa-solid fa-moon"></i>
            <i className="fa-solid fa-gear"></i>
            <div className="Navbar_person">
            <img src={download} alt="avarta" />
            <p className="lightSalmon_text">{user?.email || "Guest"}</p>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
