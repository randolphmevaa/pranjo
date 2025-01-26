// app/shipping-policy/page.tsx

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ShippingPolicy() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-6 sm:px-10 py-16 bg-[#E5E6E1] text-gray-900">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-header font-bold text-[#6B8F3D] mb-4">Shipping Policy</h1>
          <p className="text-lg font-body text-gray-700">
            At <strong>Pranjo</strong>, delivering your yoga essentials with care and speed is our priority. Every shipment is an opportunity to deliver peace of mind.
          </p>
        </div>
        <section className="bg-white shadow-xl rounded-2xl p-10 space-y-12">
          <div className="relative bg-[#E1FEA2] p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-header font-semibold text-gray-900 mb-4">Processing Times</h2>
            <p className="font-body text-gray-700 leading-relaxed">
              Orders are processed within <strong>1-2 business days</strong>. Orders placed on weekends or holidays will be processed the following business day.
            </p>
            <div className="absolute top-4 right-4 text-[#6B8F3D] opacity-50">
              🌿
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-header font-semibold text-[#6B8F3D]">Shipping Rates & Delivery Estimates</h2>
            <p className="font-body text-gray-700 leading-relaxed">
              Below are estimated delivery times for our shipping methods:
            </p>
            <ul className="font-body text-gray-700 pl-5 space-y-4">
              <li className="relative pl-6">
                <span className="absolute left-0 text-[#6B8F3D]">🌿</span>
                <strong>Standard Shipping:</strong> 5-7 business days.
              </li>
              <li className="relative pl-6">
                <span className="absolute left-0 text-[#6B8F3D]">🌿</span>
                <strong>Express Shipping:</strong> 2-3 business days.
              </li>
              <li className="relative pl-6">
                <span className="absolute left-0 text-[#6B8F3D]">🌿</span>
                <strong>Overnight Shipping:</strong> 1 business day.
              </li>
            </ul>
          </div>

          <div className="border-l-4 border-[#6B8F3D] pl-6">
            <h2 className="text-3xl font-header font-semibold text-gray-900 mb-4">International Shipping</h2>
            <p className="font-body text-gray-700 leading-relaxed">
              We ship to select international destinations. Delivery times and rates vary by location. Customs fees and duties may apply.
            </p>
          </div>

          <div className="p-8 bg-gradient-to-br from-[#FFFFFF] to-[#E1FEA2] rounded-lg shadow-lg">
            <h2 className="text-3xl font-header font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="font-body text-gray-700">
              Questions? Email us at{" "}
              <a
                href="mailto:shipping@pranjo.com"
                className="text-[#6B8F3D] underline hover:text-[#4F6B2A]"
              >
                shipping@pranjo.com
              </a>, and we’ll be happy to assist you.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
