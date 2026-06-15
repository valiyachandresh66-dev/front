import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "./Config/Api";

const Home = () => {

  const [pname, setPname] = useState("");
  const [qty, setqty] = useState("");
  const [edit, setEdit] = useState("");
  const [products, setProducts] = useState([]);

  // Fetch Products
  const handleuser = async () => {
    const userid = localStorage.getItem("userid");
    if (!userid) return;

    try {

      const res = await axios.get(
        `${BASE_URL}/api/v1/product/get/${userid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {

        setProducts(res.data.product);

      }

    } catch (error) {

      toast.error("Failed To Fetch");

    }

  };

  const edituser = (product) => {
    setEdit(product._id);
    setPname(product.pname);
    setqty(product.qty);

  };


  const handledituser = async (id) => {
    try {

      const res = await axios.put(
        `${BASE_URL}/api/v1/product/update/${id}`,
        {
          pname,
          qty,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }

      );

      if (res.data.success) {
        toast.success("Product Updated");
        handleuser();
        setPname("");
        setqty("");
        setEdit("");
      }
    } catch (error) {
      toast.error("Failed To Update");
    }
  };

  useEffect(() => {
    handleuser();
  }, []);

  return (
    <div>
      <ToastContainer />
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Enter Name"
        value={pname}
        onChange={(e) => setPname(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Qty"
        value={qty}
        onChange={(e) => setqty(e.target.value)}
      />
      <button onClick={() => handledituser(edit)}>
        Save
      </button>
      <table border="2">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.pname}</td>
                  <td>{product.qty}</td>
                  <td>
                    <button
                      onClick={() => edituser(product)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  Product Not Found
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
  
};

export default Home;