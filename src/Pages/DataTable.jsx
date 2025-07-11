import { useEffect, useState } from "react";
import { instance } from "../axiosConfig";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

function DataTable() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState({
    type: "",
    messageString: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await instance.get("/details/get");
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(idToDelete) {
    try {
      const response = await instance.delete("/details/delete/" + idToDelete);
      if (response) {
        setMessage({
          type: "success",
          messageString: response.data,
        });
      }
      fetchData();
    } catch (error) {
      console.log(error);
      setMessage({
        type: "error",
        messageString: error.response?.data || "Delete failed",
      });
    }
  }

  return (
    <div className="p-6">
      {message?.type && (
        <div
          className={`mb-4 text-center font-medium px-4 py-2 rounded-md ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.messageString}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Saved Data
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-5 text-left">S.No.</th>
              <th className="py-3 px-5 text-left">Name</th>
              <th className="py-3 px-5 text-left">Email</th>
              <th className="py-3 px-5 text-left">Phone</th>
              <th className="py-3 px-5 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((obj, index) => (
                <tr key={obj._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-5">{index + 1}</td>
                  <td className="py-2 px-5">{obj.name}</td>
                  <td className="py-2 px-5">{obj.email}</td>
                  <td className="py-2 px-5">{obj.phone}</td>
                  <td className="py-2 px-5">
                    <div className="flex items-center gap-4">
                      <MdDelete
                        onClick={() => handleDelete(obj._id)}
                        className="cursor-pointer text-red-600 hover:text-red-800 text-xl"
                        title="Delete"
                      />
                      <Link to={`/edit/${obj._id}`}>
                        <MdEdit
                          className="cursor-pointer text-blue-600 hover:text-blue-800 text-xl"
                          title="Edit"
                        />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
