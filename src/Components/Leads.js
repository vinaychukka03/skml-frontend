import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Leads() {
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  let token = localStorage.getItem("token");
  const [data, setData] = useState({
    name: "",
    phone: "",
    message: ""
  });
  useEffect(() => {
    getLeads()
  }, [])

  async function getLeads() {
    setLoading(true)
    try {
      let response = await axios.get("https://skmlbackend.onrender.com/leads/getall", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setData(response.data)

    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again");
        localStorage.removeItem("token")
        navigate("/admin");
      }
      toast.error("Fails to Get Leads")
    } finally {
      setLoading(false)
    }
  }
  return (
    <>{loading && <Loader />}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <div className='table-wrapper'>
          <table className="table table-bordered table-striped table-reponsive">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Message</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.message}</td>

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

export default Leads