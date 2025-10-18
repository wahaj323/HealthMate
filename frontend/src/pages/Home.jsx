// frontend/src/pages/Home.jsx
import { Link } from "react-router-dom";
import { Activity, FileText, Brain, Shield, Clock, Users } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Personal{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Health Companion
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Upload medical reports, get AI-powered insights in English & Urdu, and manage your health data effortlessly.
            </p>
            <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto italic">
              "Apni sehat ka khyal rakhein, reports ko samjhein - AI ki madad se!"
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Illustration */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-6 w-6 text-blue-600" />
                    <span className="font-semibold">Medical Report Analysis</span>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    AI Powered
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose HealthMate?
            </h2>
            <p className="text-xl text-gray-600">
              Aapki sehat ka digital saathi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-8 w-8 text-blue-600" />}
              title="AI-Powered Analysis"
              description="Get instant insights from your medical reports using Google Gemini AI"
              urdu="Apni reports ko AI se samjhein"
            />
            <FeatureCard
              icon={<FileText className="h-8 w-8 text-purple-600" />}
              title="Bilingual Support"
              description="Understand reports in both English and Roman Urdu"
              urdu="English aur Roman Urdu mein"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-green-600" />}
              title="Secure & Private"
              description="Your health data is encrypted and completely secure"
              urdu="Aapka data bilkul secure hai"
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8 text-red-600" />}
              title="Track Vitals"
              description="Monitor blood pressure, sugar levels, and more over time"
              urdu="BP, Sugar track karein"
            />
            <FeatureCard
              icon={<Activity className="h-8 w-8 text-indigo-600" />}
              title="Timeline View"
              description="See all your health records in one organized timeline"
              urdu="Sab reports ek jagah"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-pink-600" />}
              title="Family Friendly"
              description="Manage health records for your entire family"
              urdu="Poore ghar ki sehat"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users managing their health digitally
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition shadow-lg hover:shadow-xl font-semibold"
          >
            Start Your Journey Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Activity className="h-6 w-6" />
            <span className="text-xl font-bold">HealthMate</span>
          </div>
          <p className="text-gray-400">
            Made with ❤️ for better health management
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © 2025 HealthMate. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, urdu }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-sm text-blue-600 italic">{urdu}</p>
    </div>
  );
};

export default Home;