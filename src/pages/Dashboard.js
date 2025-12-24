import './Home.css'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const closeNavbar = () => {
    const navbar = document.getElementById("navbarNav");
    if (navbar && navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/");
      toast.success("Logout successfully", { draggable: true })
    }
  };
  return (
    <div>
       <nav className="navbar navbar-expand-lg " style={{backgroundColor:'brown'}}  >
        <div className="container-fluid" >
          <a className="navbar-brand fw-bold company-name fs-4" href="#">
            <h2 className="navbar-brand text-warning" id='shopName'>Dashboard</h2>
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav" style={{ justifyContent: 'flex-end',backgroundColor:'brown' }}>
            <ul className="navbar-nav">
              
              <li className="nav-item">
                <Link className="nav-a text-warning" to="createinvoices"
                  onClick={() => {                     
                    closeNavbar();
                  }}
                >create Invoices</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-a text-warning" to="getinvoices"
                  onClick={() => {
                     
                    closeNavbar();
                  }}
                >Get Invoices</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-a text-warning" to="leads"
                  onClick={() => {
                     
                    closeNavbar();
                  }}
                >View Leads</Link>
              </li>
              <li className="nav-item ms-3 text-warning" >
                <span onClick={handleLogout}>Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet/>
    </div>
  )
}
