import axios from 'axios';
import './GetInvoices.css'
import { useEffect, useState } from 'react'
import Loader from './Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function GetInvoices() {
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const [data, setData] = useState([])
  let token = localStorage.getItem("token");
  async function getInvoices() {
    setLoading(true);
    try {
      let res = await axios.get("https://skmlbackend.onrender.com/invoices", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      setData(res.data)

    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again");
        navigate("/admin");
      }
      toast.error("failed")
    }
    finally {
      setLoading(false); // HIDE LOADER
    }

  }
  useEffect(() => {
    getInvoices()
  }, [])
  return (


    <>{loading && <Loader />}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <div className='table-wrapper' >
          <table className="table table-bordered table-striped table-responsive">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Date</th>
                <th>View</th>
                <th>Download</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.customerName}</td>
                    <td>{item.customerPhone}</td>
                    <td>{item.dateCreated}</td>
                    <td>
                      <button
                        className="btn btn-view btn-primary" style={{ width: '100px', height: '40px' }}
                        onClick={() => window.open(item.pdfPath, "_blank")}
                      >
                        View PDF
                      </button>
                    </td>

                    <td>
                      <a
                        className="btn btn-success btn-download" style={{ width: '100px' }}
                        href={item.pdfPath.replace(
                          "/raw/upload/",
                          "/raw/upload/fl_attachment/"
                        )}
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}