import { useState } from "react";
import {instance} from "../axiosConfig"

const Home = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  function handlechange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();

    const response = await instance.post("/detials/add", data);
    console.log(response);
  }

  return (
    <>
      <h1>Add Detials</h1>

      <form action="" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={data.name}
            onChange={handlechange}
          /> <br />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={handlechange}
          /> <br />
          <input
            type="text"
            placeholder="phone"
            name="phone"
            value={data.number}
            onChange={handlechange}
          />
        </div>

        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </>
  );
};

export default Home;