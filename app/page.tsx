'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { username, password });
    // Temporary: navigate to dashboard after submit
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with red blood cells pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-800 to-red-900">
        {/* Red blood cells pattern using CSS */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-600 rounded-full blur-sm"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-red-500 rounded-full blur-sm"></div>
          <div className="absolute top-60 left-1/4 w-28 h-28 bg-red-700 rounded-full blur-sm"></div>
          <div className="absolute bottom-32 right-1/3 w-36 h-36 bg-red-600 rounded-full blur-sm"></div>
          <div className="absolute bottom-20 left-1/2 w-20 h-20 bg-red-500 rounded-full blur-sm"></div>
          <div className="absolute top-1/3 right-1/4 w-30 h-30 bg-red-700 rounded-full blur-sm"></div>
          <div className="absolute bottom-1/3 left-1/3 w-26 h-26 bg-red-600 rounded-full blur-sm"></div>
        </div>
      </div>

      {/* Login Form Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-3">
                <div className="w-6 h-6 bg-red-500 rounded-sm"></div>
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-red-600">Medtech.</h1>
                <p className="text-xs text-white bg-black px-2 py-1 rounded">Disruptive Healthcare Technologies</p>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-blue-900 mb-2">Anemia Screening</h2>
            <p className="text-gray-600 text-sm">Enter your username & password to login</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <div className="flex items-center mb-2">
                <svg className="w-4 h-4 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
              </div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center mb-2">
                <svg className="w-4 h-4 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
