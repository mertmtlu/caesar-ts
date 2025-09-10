import React, { useState, useEffect } from 'react';

interface MaintenanceModeProps {
  message?: string;
  onAdminBypass: () => void;
}

const MaintenanceMode: React.FC<MaintenanceModeProps> = ({ 
  message = "We are currently performing scheduled maintenance. Please check back shortly.",
  onAdminBypass 
}) => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [bypassKey, setBypassKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAdminBypass = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const adminKey = import.meta.env.VITE_ADMIN_BYPASS_KEY;
    
    if (bypassKey === adminKey) {
      onAdminBypass();
    } else {
      setError('Invalid bypass key');
      setBypassKey('');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-500/5 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-32 h-32 bg-blue-500/5 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-purple-500/5 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className={`max-w-lg w-full mx-4 transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {/* Main content card */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="mb-8">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 8.172V5L8 4z" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Under Maintenance
            </h1>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md mx-auto">
              {message}
            </p>

            {/* Progress indicator */}
            <div className="mb-8">
              <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full animate-pulse" style={{width: '65%'}}></div>
              </div>
              <p className="text-gray-400 text-sm mt-2">System maintenance in progress...</p>
            </div>
          </div>

          {/* Admin access section - Morphing container */}
          <div className="text-center">
            <div 
              className={`
                group relative overflow-hidden transition-all duration-500 ease-in-out border rounded-lg
                ${!showAdminLogin 
                  ? 'px-6 py-3 text-sm text-gray-400 hover:text-white border-gray-600/50 hover:border-gray-500 hover:bg-white/5 cursor-pointer' 
                  : 'bg-gray-800/50 backdrop-blur-sm p-6 border-gray-600/30 rounded-xl'
                }
              `}
              onClick={!showAdminLogin ? () => setShowAdminLogin(true) : undefined}
            >
              {/* Button state content */}
              <div className={`transition-all duration-500 ${!showAdminLogin ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'}`}>
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Admin Access
                </span>
              </div>

              {/* Expanded form content */}
              <div className={`transition-all duration-200 ${showAdminLogin ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h2 className="text-white text-lg font-semibold">Administrator Access</h2>
                </div>
                
                <form onSubmit={handleAdminBypass}>
                  <div className="mb-6 text-left">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Bypass Key
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your access key"
                        value={bypassKey}
                        onChange={(e) => {
                          setBypassKey(e.target.value);
                          setError('');
                        }}
                        className="w-full px-4 py-3 pr-12 bg-gray-700/50 text-white rounded-lg border border-gray-600/50 focus:border-blue-500 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        autoFocus={showAdminLogin}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300 transition-colors"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L8.464 8.464m5.656 5.656l1.415 1.415m-1.415-1.415l-1.414-1.414m1.414 1.414L18.95 15.95" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-left">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-red-400 text-sm font-medium">{error}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-medium transition-all duration-100 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Verifying...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Access System
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAdminLogin(false);
                        setBypassKey('');
                        setError('');
                        setShowPassword(false);
                      }}
                      disabled={isLoading}
                      className="flex-1 bg-gray-600/50 hover:bg-gray-600/70 text-gray-300 hover:text-white py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © 2024 Caesar. We'll be back online shortly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceMode;