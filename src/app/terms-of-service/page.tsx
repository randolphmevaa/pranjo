// app/terms-of-service/page.tsx

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TermsOfService() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-6 sm:px-10 py-16 bg-gradient-to-tl from-[#FFFFFF] to-[#E5E6E1] text-gray-900">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-header font-bold text-[#6B8F3D] mb-4">Terms of Service</h1>
          <p className="text-lg font-body text-gray-700">
            These terms govern your use of <strong>Pranjo</strong> and ensure fairness and transparency for all.
          </p>
        </div>
        <section className="space-y-10">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-header font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="font-body text-gray-700 leading-relaxed">
              Welcome to <strong>Pranjo</strong>. By using this site, you agree to these terms. Please read them carefully.
            </p>
          </div>

          <div className="bg-[#E1FEA2] p-8 rounded-2xl shadow-md">
            <h2 className="text-3xl font-header font-semibold text-gray-900 mb-4">Prohibited Activities</h2>
            <p className="font-body text-gray-700 leading-relaxed">
              Users may not engage in activities that disrupt our website’s functionality, violate laws, or harm others.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-header font-semibold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="font-body text-gray-700 leading-relaxed">
              Pranjo reserves the right to update these terms as needed. Notifications of significant changes will be posted.
            </p>
          </div>

          <div className="bg-[#E1FEA2] p-8 rounded-2xl shadow-md">
            <h2 className="text-3xl font-header font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="font-body text-gray-700">
              Have questions? Email us at{" "}
              <a
                href="mailto:terms@pranjo.com"
                className="text-[#6B8F3D] underline hover:text-[#4F6B2A]"
              >
                terms@pranjo.com
              </a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
