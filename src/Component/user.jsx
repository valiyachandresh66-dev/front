// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { BASE_URL } from "./Config/Api";

// const Home = () => {
//   const [products, setProducts] = useState([]);

//   const getProducts = async () => {
//     try {
//       const userid = localStorage.getItem("userid");

//       const res = await axios.get(
//         `${BASE_URL}/api/v1/product/get/${userid}`
//       );

//       console.log(res.data);

//       if (res.data.success) {
//         setProducts(res.data.product);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getProducts();
//   }, []);

//   return (
//     <div>
//       <h1>My Products</h1>

//       {products.map((item) => (
//         <div key={item._id}>
//           <h3>{item.pname}</h3>
//           <p>{item.qty}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Home;