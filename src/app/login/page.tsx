// app/login/page.tsx

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
  return (
    <>
      <Header />
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#E5E6E1] to-[#FFFFFF] relative px-6">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-96 h-96 bg-[#E1FEA2] rounded-full blur-3xl opacity-30 mix-blend-multiply animate-slow-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#E5E6E1] rounded-full blur-3xl opacity-40 mix-blend-multiply animate-slow-pulse"></div>
        </div>

        {/* Login Card */}
        <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Left Section: Welcome Message */}
          <div className="hidden md:flex flex-col justify-center items-center bg-[#E1FEA2] text-white p-10 md:w-1/2 relative">
            {/* Subtle Yoga Pattern */}
            <div className="absolute inset-0 bg-yoga-pattern opacity-20"></div>
            <h2 className="text-4xl font-header font-bold mb-4 relative z-10">
              Welcome to Pranjo
            </h2>
            <p className="text-lg font-body text-white/90 mb-8 text-center leading-relaxed relative z-10">
              “Yoga is the journey of the self, through the self, to the self.”
              Let us help you bring this philosophy to life.
            </p>
            {/* <img
              src="/yoga-illustration.svg"
              alt="Yoga Illustration"
              className="w-64 h-auto relative z-10"
            /> */}
          </div>

          {/* Right Section: Login Form */}
          <div className="flex flex-col justify-center items-center p-10 md:w-1/2">
            <h1 className="text-4xl font-header font-bold text-[#E1FEA2] mb-6">
              Welcome Back
            </h1>
            <p className="text-center text-gray-600 font-body mb-10">
              Log in to your account and continue your journey with Pranjo.
            </p>

            <form className="w-full space-y-6">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-body font-medium mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="yourname@example.com"
                  className="w-full bg-[#E5E6E1] border border-gray-300 rounded-xl py-3 px-4 font-body text-gray-700 focus:outline-none focus:ring-4 focus:ring-[#E1FEA2] focus:border-transparent transition"
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-body font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="Enter your password"
                  className="w-full bg-[#E5E6E1] border border-gray-300 rounded-xl py-3 px-4 font-body text-gray-700 focus:outline-none focus:ring-4 focus:ring-[#E1FEA2] focus:border-transparent transition"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#E1FEA2] hover:bg-opacity-80 text-white font-header text-lg font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Log In
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8 w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative text-center">
                <span className="bg-white px-4 text-gray-600 font-body">
                  or
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-4 w-full">
              <button
                type="button"
                className="w-full flex items-center justify-center bg-[#E5E6E1] hover:bg-opacity-80 text-gray-800 font-header font-medium py-3 rounded-xl shadow-lg transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 mr-2"
                >
                  <path d="M21.805 10.022h-9.358v3.732h5.377a4.597 4.597 0 01-1.984 3.017v2.513h3.211c1.882-1.733 2.96-4.288 2.96-7.263 0-.643-.061-1.268-.206-1.999zM12.447 20.571c2.443 0 4.492-.808 5.986-2.197l-3.212-2.512c-.896.597-2.045.957-3.086.957-2.369 0-4.377-1.6-5.092-3.742H3.746v2.614c1.476 2.921 4.431 4.88 7.7 4.88zM7.355 12.286c-.141-.453-.223-.936-.223-1.429s.082-.976.223-1.429V6.814H3.746a9.089 9.089 0 000 9.372l3.609-2.519zM12.447 7.429c1.06 0 2.105.41 2.874 1.167l2.774-2.774c-1.554-1.462-3.602-2.365-5.648-2.365-3.27 0-6.224 1.959-7.7 4.88l3.609 2.613c.715-2.143 2.723-3.748 5.091-3.748z" />
                </svg>
                Log in with Google
              </button>
            </div>

            {/* Bottom Text */}
            <p className="text-center text-gray-600 font-body mt-6">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="text-[#E1FEA2] font-medium underline hover:text-opacity-80"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
