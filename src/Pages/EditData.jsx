import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { instance } from "../axiosConfig";

function EditData() {
  const { id } = useParams();

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState({
    type: "",
    messageString: "",
  });

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  async function fetchData(id) {
    try {
      const response = await instance.get("/details/get/" + id);
      setData({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await instance.put("details/update/" + id, data);
      if (response.status === 200) {
        setMessage({
          type: "success",
          messageString: response.data,
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        messageString: error.message,
      });
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      {message?.type && (
        <div
          className={`mb-4 px-4 py-2 rounded text-center font-medium ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.messageString}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Edit Details
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow-md"
      >
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={data.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <Link
          to="/Data"
          className="text-blue-600 hover:underline hover:text-blue-800"
        >
          View All Data
        </Link>
      </div>
    </div>
  );
}

export default EditData;
