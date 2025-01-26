// app/privacy-policy/page.tsx

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-6 sm:px-10 py-16 bg-[#E5E6E1] text-gray-900">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-header font-bold text-[#6B8F3D] mb-4">Privacy Policy</h1>
          <p className="text-lg font-body text-gray-700">
            Your privacy is our priority at Pranjo. Here’s how we handle and protect your data.
          </p>
        </div>
        <section className="space-y-10">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-header font-semibold text-gray-900 mb-4">What We Collect</h2>
            <p className="font-body text-gray-700 leading-relaxed">
              We collect personal information, such as your name, email address, and payment information, to provide a seamless experience.
            </p>
          </div>

          <div className="bg-[#E1FEA2] p-8 rounded-2xl shadow-md">
            <h2 className="text-3xl font-header font-semibold text-gray-900 mb-4">How We Use It</h2>
            <p className="font-body text-gray-700 leading-relaxed">
              Your data is used to process orders, improve customer support, and personalize your experience.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-header font-semibold text-gray-900 mb-4">Your Rights</h2>
            <p className="font-body text-gray-700 leading-relaxed">
              You have the right to access, update, or delete your data. For assistance, please email us.
            </p>
          </div>

          <div className="bg-[#E1FEA2] p-8 rounded-2xl shadow-md">
            <h2 className="text-3xl font-header font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="font-body text-gray-700">
              Have questions about privacy? Contact us at{" "}
              <a
                href="mailto:privacy@pranjo.com"
                className="text-[#6B8F3D] underline hover:text-[#4F6B2A]"
              >
                privacy@pranjo.com
              </a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
