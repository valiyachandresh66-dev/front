import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from './Config/Api'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [pname, setPname] = useState("")
    const [qty, setqty] = useState("")
    const [products, setProducts] = useState([])
    const [editData, setEditData] = useState(null) // { _id, pname, qty }

    const userid = localStorage.getItem("userid")
    const navigate = useNavigate()

    const authHeader = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })

    const handleuser = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/product/get/${userid}`, authHeader())
            if (res.data.success) setProducts(res.data.product)
        } catch {
            toast.error("Failed To Fetch")
        }
    }

    const addproduct = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/product/add`, { pname, qty, userid }, authHeader())
            if (res.data.success) {
                toast.success("Added Successfully")
                handleuser()
                setPname("")
                setqty("")
            }
        } catch {
            toast.error("Failed to Add")
        }
    }

    const handleproduct = async () => {
        try {
            const res = await axios.put(
                `${BASE_URL}/api/v1/product/update/${editData._id}`,
                { pname: editData.pname, qty: editData.qty },
                authHeader()
            )
            if (res.data.success) {
                toast.success("Product updated")
                handleuser()
                setEditData(null)
            }
        } catch {
            toast.error("Failed to Edit")
        }
    }

    const deleteproduct = async (id) => {
        try {
            const res = await axios.delete(`${BASE_URL}/api/v1/product/delete/${id}`, authHeader())
            if (res.data.success) {
                toast.success("Product deleted")
                handleuser()
            }
        } catch {
            toast.error("Failed to Delete")
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userid")
        navigate("/")
    }

    useEffect(() => { handleuser() }, [])

    return (
        <div>
            <ToastContainer />
            <button onClick={logout}>Logout</button>
            <h1>Home</h1>

            <div>
                <input type="text" placeholder='Product Name' value={pname} onChange={(e) => setPname(e.target.value)} />
                <input type="text" placeholder='Quantity' value={qty} onChange={(e) => setqty(e.target.value)} />
                <button onClick={addproduct}>Add Product</button>
            </div>

            {editData && (
                <div>
                    <h3>Edit Product</h3>
                    <input type="text" placeholder='Product Name' value={editData.pname}
                        onChange={(e) => setEditData({ ...editData, pname: e.target.value })} />
                    <input type="text" placeholder='Quantity' value={editData.qty}
                        onChange={(e) => setEditData({ ...editData, qty: e.target.value })} />
                    <button onClick={handleproduct}>Save</button>
                    <button onClick={() => setEditData(null)}>Cancel</button>
                </div>
            )}

            <table border="2">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Qty</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? products.map((product, index) => (
                        <tr key={product._id}>
                            <td>{index + 1}</td>
                            <td>{product.pname}</td>
                            <td>{product.qty}</td>
                            <td>
                                <button onClick={() => setEditData(product)}>Edit</button>
                                <button onClick={() => deleteproduct(product._id)}>Delete</button>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan="4">No Products Found</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Home
