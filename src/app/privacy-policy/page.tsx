"use client";

export default function PrivacyPolicy() {
  return (
    <section className="py-40 bg-white">
      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-black">
          Privacy Policy
        </h1>

        <div className="space-y-10 text-gray-800 leading-relaxed text-sm md:text-base">

          {/* Intro */}
          <div>
            <p>
              At <strong>Rani Designer</strong>, we value your privacy and are committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard your data when you visit or make a purchase from our website.
            </p>
          </div>

          {/* Info We Collect */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              1. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal details such as name, email address, phone number</li>
              <li>Shipping and billing address</li>
              <li>Payment information (processed securely via third-party providers)</li>
              <li>Browsing behavior and device information (cookies, analytics)</li>
            </ul>
          </div>

          {/* How We Use */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process and deliver your orders</li>
              <li>To communicate with you regarding purchases or support</li>
              <li>To improve our website and user experience</li>
              <li>To send promotional offers (only if you opt-in)</li>
            </ul>
          </div>

          {/* Sharing */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              3. Sharing Your Information
            </h2>
            <p>
              We do not sell your personal data. We may share your information with trusted third parties such as payment processors, shipping partners, and analytics providers to operate our business effectively.
            </p>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              4. Cookies & Tracking
            </h2>
            <p>
              We use cookies to enhance your browsing experience, analyze website traffic, and personalize content. You can choose to disable cookies through your browser settings.
            </p>
          </div>

          {/* Data Security */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              5. Data Security
            </h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no online transmission is 100% secure.
            </p>
          </div>

          {/* Rights */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              6. Your Rights
            </h2>
            <p>
              You have the right to access, update, or delete your personal information. To make such requests, please contact us.
            </p>
          </div>

          {/* Third Party */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              7. Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for their privacy practices.
            </p>
          </div>

          {/* Updates */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              9. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, you can contact us at:
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