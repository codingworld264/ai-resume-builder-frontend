import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/features/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedIn, user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar px-4">
      <div className="container-fluid">

        <Link className="navbar-brand fw-bold" to="/">
          ResumeBuilder
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-center">

            {loggedIn ? (
              <>
                <li className="nav-item me-3">
                  <Link className="nav-link" to="/resume/create">
                    Create Resume
                  </Link>
                </li>

                {/* Profile Dropdown */}
                <li className="nav-item dropdown">
                  <a
                    href="/#"
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    id="profileDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      src={
                        user?.image ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="profile"
                      className="profile-img"
                    />
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end custom-dropdown">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/change-password">
                        Change Password
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="btn btn-primary ms-3" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;