"use client";

export default function NewsletterSection() {
  return (
    <section className="py-20 bg-[#efe7dc]">
      <div className="max-w-4xl mx-auto text-center px-6">
        
        <h2 className="text-4xl md:text-5xl font-semibold mb-6">
          Be The First To Know
        </h2>

        <p className="text-gray-600 mb-10 text-lg">
          Receive exclusive updates on new arrivals, bridal collections,
          and special offers curated just for you.
        </p>

        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:w-[350px] px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b76e79]"
          />

          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-[#B9AA52]  hover:bg-[#B9AA52] transition duration-300"
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  );
}
