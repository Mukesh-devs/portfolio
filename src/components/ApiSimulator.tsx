import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Server, Database, User, CheckCircle, XCircle, Clock, Zap } from 'lucide-react';

interface ApiStep {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

const apiSteps: ApiStep[] = [
  { id: 'user', label: 'User Request', icon: User, color: 'text-blue-500' },
  { id: 'api', label: 'API Gateway', icon: Server, color: 'text-purple-500' },
  { id: 'backend', label: 'Backend Service', icon: Zap, color: 'text-orange-500' },
  { id: 'database', label: 'Database Query', icon: Database, color: 'text-green-500' },
];

const ApiSimulator: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('/api/users');
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [responseTime, setResponseTime] = useState(0);

  const simulateApiCall = async () => {
    setIsSimulating(true);
    setCurrentStep(-1);
    setStatus(null);
    setResponseTime(0);

    const stepDuration = 800;
    const startTime = Date.now();

    for (let i = 0; i < apiSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, stepDuration));
    }

    // Simulate response
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const endTime = Date.now();
    setResponseTime(endTime - startTime);
    
    // Randomly simulate success or error (80% success rate)
    const isSuccess = Math.random() > 0.2;
    setStatus(isSuccess ? 'success' : 'error');
    
    setIsSimulating(false);
    setCurrentStep(-1);
  };

  const getStatusInfo = () => {
    if (status === 'success') {
      return {
        code: method === 'POST' ? 201 : 200,
        message: method === 'POST' ? 'Created' : 'OK',
        color: 'text-green-500',
        icon: CheckCircle
      };
    } else if (status === 'error') {
      return {
        code: 500,
        message: 'Internal Server Error',
        color: 'text-red-500',
        icon: XCircle
      };
    }
    return null;
  };

  const statusInfo = getStatusInfo();

  return (
    <section id="api-simulator" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            API Request Simulator
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Watch how API requests flow through different layers of a system
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* API Configuration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Configure Request
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Method
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  disabled={isSimulating}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Endpoint
                </label>
                <input
                  type="text"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  disabled={isSimulating}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={simulateApiCall}
              disabled={isSimulating}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play size={20} />
              {isSimulating ? 'Simulating...' : 'Simulate Request'}
            </motion.button>
          </motion.div>

          {/* API Flow Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Request Flow
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
              {apiSteps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <motion.div
                    animate={{
                      scale: currentStep === index ? 1.1 : 1,
                      opacity: currentStep >= index || !isSimulating ? 1 : 0.3,
                    }}
                    className="flex flex-col items-center space-y-2"
                  >
                    <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center ${
                      currentStep === index 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-gray-300 dark:border-slate-600'
                    }`}>
                      <step.icon 
                        size={24} 
                        className={currentStep === index ? step.color : 'text-gray-400 dark:text-gray-500'} 
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                      {step.label}
                    </span>
                    {currentStep === index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      />
                    )}
                  </motion.div>
                  
                  {index < apiSteps.length - 1 && (
                    <motion.div
                      animate={{
                        opacity: currentStep > index || !isSimulating ? 1 : 0.3,
                      }}
                      className="hidden md:block w-12 h-0.5 bg-gray-300 dark:bg-slate-600"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* Response Display */}
          <AnimatePresence>
            {(status || isSimulating) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Response
                </h3>
                
                {isSimulating ? (
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <Clock size={20} className="text-blue-500" />
                    </motion.div>
                    <span className="text-gray-600 dark:text-gray-300">
                      Processing request...
                    </span>
                  </div>
                ) : statusInfo ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <statusInfo.icon size={20} className={statusInfo.color} />
                      <span className={`font-semibold ${statusInfo.color}`}>
                        {statusInfo.code} {statusInfo.message}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Response Time:</strong> {responseTime}ms
                    </div>
                    
                    <div className="bg-gray-900 dark:bg-slate-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{status === 'success' ? `{
  "status": "success",
  "data": {
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
      }
    ]
  },
  "timestamp": "${new Date().toISOString()}"
}` : `{
  "status": "error",
  "error": {
    "code": 500,
    "message": "Internal Server Error",
    "details": "Database connection failed"
  },
  "timestamp": "${new Date().toISOString()}"
}`}
                      </pre>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ApiSimulator;