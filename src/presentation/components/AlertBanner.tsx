import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import type { Alert } from '../../domain/entities/Alert';
import { getTimeRemaining } from '../../utils/dateUtils';
import { useState } from 'react';

interface AlertBannerProps {
  alerts: Alert[];
}

function getSeverityColor(severity: string) {
  switch (severity.toLowerCase()) {
    case 'extreme':
      return 'from-red-500 to-red-600';
    case 'severe':
      return 'from-orange-500 to-orange-600';
    case 'moderate':
      return 'from-yellow-500 to-yellow-600';
    default:
      return 'from-blue-500 to-blue-600';
  }
}

export function AlertBanner({ alerts }: AlertBannerProps) {
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());

  if (alerts.length === 0) return null;

  const visibleAlerts = alerts.filter((_, index) => !dismissed.has(index));

  if (visibleAlerts.length === 0) return null;

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {visibleAlerts.map((alert) => {
          const originalIndex = alerts.indexOf(alert);
          return (
            <motion.div
              key={originalIndex}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`relative bg-gradient-to-r ${getSeverityColor(alert.severity)} 
                         rounded-3xl p-6 text-white shadow-2xl overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-16 -mb-16" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                      <AlertTriangle size={24} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-white/30 rounded-full text-xs font-bold uppercase backdrop-blur-sm">
                          {alert.severity}
                        </span>
                        <span className="text-sm opacity-90">
                          {alert.event}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">
                        {alert.headline}
                      </h3>
                      
                      <p className="text-white/90 text-sm mb-3 leading-relaxed">
                        {alert.description}
                      </p>
                      
                      {alert.instruction && (
                        <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm mb-3">
                          <p className="text-sm font-medium">
                            🛡️ {alert.instruction}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-4 text-sm opacity-90">
                        <div>
                          <span className="font-semibold">Areas:</span> {alert.areas}
                        </div>
                        <div>
                          <span className="font-semibold">Expires:</span> {getTimeRemaining(alert.expires)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setDismissed((prev) => new Set(prev).add(originalIndex))}
                    className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-colors backdrop-blur-sm"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
