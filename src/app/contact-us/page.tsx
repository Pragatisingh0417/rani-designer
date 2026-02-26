"use client";

export default function Contact() {
  return (
    <section className=" text-black">

      {/* ================= HERO ================= */}
      <div className="py-20 text-center bg-black border-b border-[#B9AA52]/30">
        <h1 className="text-4xl md:text-5xl font-bold text-[#B9AA52] mb-4">
          Contact Us
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          We would love to assist you. Visit our showroom or reach out to us
          for exclusive jewellery collections and custom designs.
        </p>
      </div>

      {/* ================= CONTACT SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">

        {/* Left Info Section */}
        <div>
          <h2 className="text-3xl font-bold text-[#B9AA52] mb-8">
            Get In Touch
          </h2>

          <div className="space-y-6 text-gray-700">
            <div>
              <h4 className="font-semibold text-black">📍 Address</h4>
              <p>xyz street </p>
            </div>

            <div>
              <h4 className="font-semibold text-black">📞 Phone</h4>
              <p>07405769411</p>
            </div>

            <div>
              <h4 className="font-semibold text-black">✉ Email</h4>
              <p>info@ranijewellers.com</p>
            </div>

            <div>
              <h4 className="font-semibold text-black">🕒 Store Hours</h4>
              <p>Mon – Sun : 10:00 AM – 8:00 PM</p>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="bg-white rounded-2xl shadow-xl p-10 border border-[#B9AA52]/20">

          <h3 className="text-2xl font-semibold text-[#B9AA52] mb-6">
            Send Us a Message
          </h3>

          <form className="space-y-6">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 focus:border-[#B9AA52] focus:ring-0 rounded-lg px-4 py-3 outline-none"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 focus:border-[#B9AA52] focus:ring-0 rounded-lg px-4 py-3 outline-none"
            />

            <textarea
              rows={4}
              placeholder="Your Message"
              className="w-full border border-gray-300 focus:border-[#B9AA52] focus:ring-0 rounded-lg px-4 py-3 outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-[#B9AA52] text-black font-semibold py-3 rounded-lg hover:bg-black hover:text-white transition duration-300"
            >
              Send Message
            </button>

          </form>
        </div>

      </div>

      {/* ================= MAP SECTION ================= */}
      <div className="bg-black py-16 text-center">
        <h2 className="text-3xl font-bold text-[#B9AA52] mb-6">
          Visit Our Showroom
        </h2>

        <div className="max-w-5xl mx-auto px-6">
          <div className="h-80 bg-gray-800 rounded-2xl flex items-center justify-center text-[#B9AA52]">
            Google Map Placeholder
          </div>
        </div>
      </div>

    </section>
  );
}