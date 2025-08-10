import React, { useState } from "react";
import toast from "react-hot-toast";  

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setTimeout(() => {
      toast.success("Thank you for contacting support! We will get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="contact-support-container max-w-3xl mx-auto p-6  mt-12 rounded-2xl text-white" style={{
        background:
          "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 40%, rgba(0,0,0,0.95) 60%)",
      }}>
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">Contact Support</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Your full name"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Your email address"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Subject of your message"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full border rounded px-3 py-2"
            placeholder="Write your message here..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn-secondary text-white  transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactSupport;
