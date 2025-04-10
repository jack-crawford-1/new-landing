import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setLoading(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          to_name: 'Jack',
          from_email: form.email,
          to_email: 'chook0879@gmail.com',
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setLoading(false);
      alert('Your message was sent');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert('Failed to send message');
    }
  };

  return (
    <div className="h-screen bg-dark text-light flex flex-col items-center justify-center">
      <div className="w-full max-w-xl mx-auto p-8 ">
        <h3>Contact Me</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-red-500 p-8 rounded-2xl flex flex-col gap-4"
        >
          <label className="flex flex-col">
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="bg-gray-200 p-2 rounded-md"
            />
          </label>
          <br />
          <label className="flex flex-col">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-gray-200 p-2 rounded-md"
            />
          </label>
          <br />
          <label className="flex flex-col">
            <span>Your Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="bg-gray-200 p-2 rounded-md"
            />
          </label>
          <br />
          <button
            type="submit"
            disabled={loading}
            className="flex gap-2 bg-black py-3 px-4 w-[200px] rounded-md"
          >
            {loading ? 'Sending...' : 'Send Message'}
            <img
              src="/icons/next.png"
              alt="up arrow"
              style={{ width: '30px', marginLeft: '8px' }}
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
