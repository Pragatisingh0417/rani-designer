"use client";

export default function TermsAndConditions() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-black">
          Terms & Conditions
        </h1>

        <div className="space-y-10 text-gray-800 leading-relaxed text-sm md:text-base">

          {/* Intro */}
          <div>
            <p>
              Welcome to <strong>Rani Designer</strong>. By accessing our website and purchasing from us, you agree to comply with the following terms and conditions. Please read them carefully before placing an order.
            </p>
          </div>

          {/* Orders */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              1. Orders & Acceptance
            </h2>
            <p>
              All orders are subject to availability and confirmation. We reserve the right to refuse or cancel any order at our discretion.
            </p>
          </div>

          {/* Pricing */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              2. Pricing & Payments
            </h2>
            <p>
              All prices are listed in applicable currency and are subject to change without prior notice. Payments must be completed at checkout through our secure payment partners.
            </p>
          </div>

          {/* Product Accuracy */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              3. Product Representation
            </h2>
            <p>
              We strive to display our products as accurately as possible. However, slight variations in color may occur due to lighting, screen resolution, or photography.
            </p>
          </div>

          {/* YOUR POLICY (IMPORTANT) */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              4. No Exchange / No Refund Policy
            </h2>

            <ul className="list-disc pl-6 space-y-3">
              <li>
                We have a <strong>strict NO EXCHANGE and NO REFUND policy</strong> as we ensure that all products are carefully checked and delivered in perfect condition.
              </li>
              <li>
                Products are made and presented exactly as shown in images. Minor color differences may occur due to lighting or screen variations.
              </li>
              <li>
                <strong>An unboxing video is mandatory</strong> to claim any issue or damage.
              </li>
              <li>
                Claims without proper unboxing video evidence will <strong>not be accepted</strong>.
              </li>
              <li>
                Any doubts regarding product color, size, or details must be clarified <strong>before placing the order</strong>.
              </li>
            </ul>
          </div>

          {/* Shipping */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              5. Shipping
            </h2>
            <p>
              We aim to deliver products within the estimated time frame. However, delays may occur due to unforeseen circumstances, and we are not liable for such delays.
            </p>
          </div>

          {/* Liability */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              6. Limitation of Liability
            </h2>
            <p>
              Rani Designer shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our products or website.
            </p>
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              7. Intellectual Property
            </h2>
            <p>
              All content, including images, designs, and text on this website, is the property of Rani Designer and may not be used without permission.
            </p>
          </div>

          {/* Changes */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              8. Changes to Terms
            </h2>
            <p>
              We reserve the right to update or modify these terms at any time without prior notice. Continued use of the website constitutes acceptance of these changes.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              9. Contact Us
            </h2>
            <p>
              For any questions regarding these Terms & Conditions, please contact us:
            </p>
            <p className="mt-2">
              📧 info@ranidesigner.com <br />
              📍 London, UK
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}