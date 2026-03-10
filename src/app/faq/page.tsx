"use client";



export default function Faq() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-3xl font-semibold text-center mb-12 text-black">
          FAQ (Frequently Asked Questions)
        </h1>

        <div className="space-y-10 text-gray-800 leading-relaxed">

          {/* FAQ 1 */}
          <div>
            <h2 className="text-lg font-semibold mb-3">
              1. What are the return or Exchange Policy?
            </h2>
            <p>
              We offer a hassle-free return and exchange policy within 2 days of
              receiving your order. Items must be in their original condition
              and packaging. Please contact our customer service team to
              initiate a return or exchange or call us at <b>+91 ******</b>.
            </p>

            {/* <p className="mt-2">
              Refund Policy:{" "}
              <a
                href="https://Ranijewels.in/policies/refund-policy"
                className="text-blue-600 underline"
                target="_blank"
              >
                https://Ranijewels.in/policies/refund-policy
              </a>
            </p> */}
          </div>

          {/* FAQ 2 */}
          <div>
            <h2 className="text-lg font-semibold mb-3 mt-3">
              2. Do I need to send the order back if I want to return or exchange it?
            </h2>
            <p>
              No, you don’t need to send the order back yourself. If you wish to
              return or exchange an item, simply inform us within 2 days of
              receiving your order, and our representative will come to collect
              it from you. Please ensure that the item is in its original
              condition and packaging.
            </p>
          </div>

          {/* FAQ 3 */}
          <div>
            <h2 className="text-lg font-semibold mb-3 mt-3">
              3. Do you offer open delivery?
            </h2>
            <p>
              Unfortunately, we do not provide open delivery at this time. To
              ensure the integrity and quality of our products, all packages are
              securely sealed before shipping. If you encounter any issues with
              your order, please contact our customer service team for
              assistance or call us at <b>+91 *******</b>.
            </p>
          </div>

          {/* FAQ 4 */}
          <div>
            <h2 className="text-lg font-semibold mb-3 mt-3">
              4. How can I trust Rani Designer with so many fraudulent activities happening online?
            </h2>

            <p className="mb-4">
              We understand that online shopping can sometimes be risky, but at
              Rani  Designer, we are committed to providing a safe and secure
              shopping experience.
            </p>

            <ul className="list-disc pl-6 space-y-2">
              {/* <li>
                Reviews on TrustPilot:{" "}
                <a
                  href="https://www.trustpilot.com/review/www.Ranijewels.in"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  https://www.trustpilot.com/review/www.Ranijewels.in
                </a>
              </li> */}

              <li>
                Verified Business with a strong reputation in the industry.
              </li>

              <li>
                Secure payment gateways with encrypted data protection.
              </li>

              <li>
                Transparent return, exchange, and refund policies.
              </li>

              <li>
                Direct support available via phone, email, or social media.
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}