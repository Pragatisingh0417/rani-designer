export function BridalSection() {
return (
    <section>
         {/* ================= HERO SECTION ================= */}
      <div className="relative py-40 border-b border-[#B9AA52]/30 overflow-hidden">

  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/images/bridal.webp" 
      alt="About Background"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-6">
    <div className="max-w-2xl text-left">

      <h1 className="text-4xl md:text-7xl font-bold text-[#B9AA52] mb-6 tracking-wide">
         Rani Desinger Bridal Sets
      </h1>

      <p className="text-lg text-gray-300 leading-relaxed">
        A legacy of purity, craftsmanship, and timeless elegance.
        We create jewellery that reflects royalty, tradition,
        and unforgettable celebrations.
      </p>

      {/* Optional Gold Accent Line */}
  <div className="  mt-10 gap-4">

              <a
                href="/products"
                className="bg-[#B9AA52] text-white px-6 py-3 font-medium hover:bg-[#a29345] transition"
              >
                Shop Now
              </a>

             

            </div>
    </div>
  </div>
</div>
    </section>
)
}