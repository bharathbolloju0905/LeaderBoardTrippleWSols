import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
export default function UserForm({ setIsFormOpen ,fetchData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert(`Submitted:\nName: ${formData.name}\nEmail: ${formData.email}`);

    const newUser = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setFormData({ name: "", email: "" });
    setIsFormOpen(false);
    fetchData();
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100 absolute top-[10%]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">User Form</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer">
          Submit
        </button>
         <span className='absolute top-1 right-1 font-extrabold'><RxCross1 className='cursor-pointer' onClick={() =>setIsFormOpen(false) } /></span>
      </form>
    </div>
  );
}
