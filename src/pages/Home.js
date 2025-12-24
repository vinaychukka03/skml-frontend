import { Link } from "react-router-dom";
import './Home.css'
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export default function Home() {
  // navbar 
  const closeNavbar = () => {
    const navbar = document.getElementById("navbarNav");
    if (navbar && navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };
  // service related variables and methods 
  const Services = [
    { image: 'https://res.cloudinary.com/dxp68oquk/image/upload/v1766151964/Photo-Feb-16-2024-1-46-36-PM-1-scaled_mhm98k.jpg', sname: 'Metal Gates', txt: 'Custom fabrication and installation of durable metal gates.' },
    { image: 'https://res.cloudinary.com/dxp68oquk/image/upload/v1766152320/polished-modern-stainless-steel-swing-gate-for-home-th20230908044628_ddqg59.jpg', sname: 'Stainless Steel Gates', txt: 'High-quality stainless steel gates for modern aesthetics and security.' },
    { image: 'https://res.cloudinary.com/dxp68oquk/image/upload/v1766152548/IMG_6277-scaled-1_haqjtq.jpg', sname: 'Railing & Grills', txt: 'Stylish and secure railings and grills for balconies and windows.' },
    { image: 'https://res.cloudinary.com/dxp68oquk/image/upload/v1766384379/601cb3a586364_yeiwh2.jpg', sname: 'Staircase', txt: 'Design and installation of custom metal staircases.' },
    { image: 'https://res.cloudinary.com/dxp68oquk/image/upload/v1766152805/product-jpeg_pxyq3i.jpg', sname: 'Sheds', txt: 'Durable and custom-built sheds for various purposes.' },
    { image: 'https://res.cloudinary.com/dxp68oquk/image/upload/v1766384606/2305120-HERO-01_pdzrdq.jpg', sname: 'Garden Pergolas', txt: 'Beautiful garden pergolas to enhance your outdoor space.' },
    { image: 'https://res.cloudinary.com/dxp68oquk/image/upload/v1766152870/wrought-iron-fence-scaled_uoykek.jpg', sname: 'Fencing', txt: 'Secure and durable metal fencing solutions for various properties.' },
    { image: 'https://res.cloudinary.com/dxp68oquk/image/upload/v1766152920/0d54d702d2d7c55c9a714ae1d45963e1_os7wj9.jpg', sname: 'Entrance Gates', txt: 'Custom Entrance gates for enhanced security and aesthetics.' },
    { image: 'https://res.cloudinary.com/dxp68oquk/image/upload/v1766153036/Tulip-Iron-Grill-Design-Flat-Top-Double-Wrougt-Iron-Front-Door-Right-in-Swing-Glass-Window_sgazvj.webp', sname: 'Metal Grills', txt: 'Durable and stylish metal Window grills.' },
    { image: 'https://res.cloudinary.com/dxp68oquk/image/upload/v1766153331/IMG-20220814-170708_chpn8g.jpg', sname: 'Sports Box', txt: 'Sport boxes like: Cricket, volleyball etc..' },
    { image: 'https://res.cloudinary.com/dxp68oquk/image/upload/v1766153400/RSG5000-commercial-galvanised-shutter_xdu7gi.jpg', sname: 'Shutters', txt: 'Shutter for shops, malls etc..' },
    { image: 'https://res.cloudinary.com/dxp68oquk/image/upload/v1766153485/MF-Studio-7-Piece-Outdoor-Patio-Dining-Set-with-Stackable-Chairs-6-Person-Table-Modern-Metal-Steel-Patio-Furniture-Black_31d3a452-7a03-4fac-871e-1238c938ece6.544af27fb6cfb000763cf680208c5cc9_krapmi.jpg', sname: 'Metal/Steel Furniture', txt: 'Metal Racks, Benches, Chairs, Advertisement Banner.' }
  ];


  // contact 
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  let changeData = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://skmlbackend.onrender.com/leads/save", data,);
      console.log(response.data);
      toast.success("saved")
      setData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    }
    catch (error) {
      console.log(error);
      toast.error("Fail to send data")
    } finally {
      setLoading(false); // HIDE LOADER
    }
  };

  // Footer Related variables 
  const aStyle = { textDecoration: 'none', color: 'white' };
  const phoneNumber = "919010779225";
  const message = "Hello 👋 I want more details about your service";
  const email = "srikanakamahalakshmifabricatio@gmail.com";
  const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}`;
  const mailSubject = encodeURIComponent("Regarding Enquiry");
  const mailBody = encodeURIComponent("Hi,\nI need more information.");

  return (
    <>
      {/* Navigation code */}
      <nav className="navbar navbar-expand-lg " style={{ backgroundColor: '#3CBBB1', position: 'sticky', top: '0px' }}  >
        <div className="container-fluid" >
          <a className="navbar-brand fw-bold company-name fs-4" href="#">
            <h2 className="navbar-brand" id='shopName' style={{color:'white'}}>Sri Kanaka Mahalakshmi<span> Fabrications</span></h2>
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" ></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav" style={{ justifyContent: 'flex-end', backgroundColor: '#3CBBB1' }}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-a active" href="#"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    closeNavbar();
                  }}
                >Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-a " href="#service"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    closeNavbar();
                  }}
                >Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-a " href="#contacts"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    closeNavbar();
                  }}
                >Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-a" href="#location"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    closeNavbar();
                  }}
                >Location</a>
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-a " to="/admin"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    closeNavbar();
                  }}
                >Admin</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Slidder */}
      <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div className="carousel-item active" data-bs-interval="5000">
            <div className='sliderstyle' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30vh', gap: '2rem' }}>
              <img src='https://res.cloudinary.com/dxp68oquk/image/upload/v1766594774/hs_zvluh6.png' />
              <div>
                <h4>NO VISITING CHARGE</h4>
                <p>Free visit for inspection & measurement.</p>
              </div>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <div className='sliderstyle' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30vh', gap: '2rem' }}>
              <img src='https://res.cloudinary.com/dxp68oquk/image/upload/v1766594774/time_b6nk5t.png' />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <h4>24/7 SERVICES</h4>
                <p>We are 24/7 available to serve you.</p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className='sliderstyle' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30vh', gap: '2rem' }}>
              <img src='https://res.cloudinary.com/dxp68oquk/image/upload/v1766594774/image_qollfo.png' />
              <div>
                <h4>HIGH QUALITY WORK</h4>
                <p>High quality services and products.</p>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev" >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Service section */}
      <div id='service' style={{ height: '3rem' }}></div>
      <section style={{ marginTop: '3rem' }}>
        <div className='text-center'>
          <h4>Our Services</h4>
        </div>
        <div className="our-services">
          {Services.map((service, index) => (
            <div key={index}>
              <img src={service.image} />
              <h4>{service.sname}</h4>
              <p>{service.txt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <div id="contacts" style={{ height: '3rem' }}></div>
      <div id="contact" style={{ marginTop: '3rem' }} >
        <h4>Contact </h4>
        <form className="contact-form" method="POST" id="form" onSubmit={handleSubmit} >
          <input type="text" name="name" placeholder="Enter your name *" required value={data.name}
              onChange={changeData} />
          <input type="email" name="email" placeholder="Email"  onChange={changeData}
              value={data.email}/>
          <input type="tel" name="phone" placeholder="Phone number *" required pattern="[0-9]{10}"
              value={data.phone}
              onChange={changeData}/>
          < textarea placeholder="Enter your message" name="message"required value={data.message}
              onChange={changeData}>
          </textarea>
          <div className="text-center">
            <button className="btn btn-primary" disabled={loading}> {loading ? "Please wait..." : "Submit"}</button>
          </div>
        </form>
      </div>
      {/* Map & Location */}
      <div id='location' style={{ height: '3rem' }}></div>
      <section className='text-center' style={{ marginTop: '3rem' }}>
        <div className='text-center' style={{ marginBottom: '1.5rem' }}>
          <h4>Find Us On The Map</h4>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7583.467563774115!2d83.406629!3d18.130081!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3bef0017fae095%3A0x3030d08764446925!2sSri%20Kanaka%20Mahalakshmi%20Welding%20Shop!5e0!3m2!1sen!2sin!4v1766492273015!5m2!1sen!2sin" width="600" height="450" style={{ border: '0' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>

      {/* footer coded */}
      <footer className="bg-black text-white py-2">
        <div className="container text-center">
          <div className="row">
            <div className="col-12 col-md-6 mb-3 mb-md-0 ">
              <h5>Contact</h5>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
                <div>
                  <a
                    href={whatsappURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={aStyle}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                    </svg>
                    <p style={{ display: 'inline' }}> Message</p>
                  </a>
                </div>
                <div>
                  <a href={`tel:+${phoneNumber}`} style={aStyle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                    </svg>
                    <p style={{ display: 'inline' }}>Phone</p>
                  </a>
                </div>
                <div>
                  <a
                    href={`mailto:${email}?subject=${mailSubject}&body=${mailBody}`} style={aStyle}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                    </svg>
                    <p style={{ display: 'inline' }}> Mail us</p>
                  </a>
                </div>

              </div>

            </div>
            <div className="col-12 col-md-6">
              <h5>Address</h5>
              <p>Sri Kanaka Mahalakshmi Welding <br />Shop,
                Mythri Nagar-2, Sai Colony,<br />
                Gajularega, Vizianagaram,<br />
                Andhra Pradesh, 535001<br />
              </p>
            </div>
          </div>
        </div><hr />
        <div className="text-center">
          © Sri Kanaka Mahalakshmi Welding Shop
        </div>
      </footer>
    </>
  )
}
