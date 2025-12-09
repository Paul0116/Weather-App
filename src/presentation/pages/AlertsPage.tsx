import { useUIStore } from '../../application/store/uiStore';
import { useAlertsQuery } from '../../application/queries/useAlertsQuery';
import { AlertBanner } from '../components/AlertBanner';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function AlertsPage() {
  const { currentLocation } = useUIStore();
  const { data: alerts } = useAlertsQuery(currentLocation);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link 
            to="/"
            className="glass p-3 rounded-2xl hover:shadow-lg transition-all"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Weather Alerts
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {alerts?.[0]?.event || 'No active alerts'}
            </p>
          </div>
        </motion.div>        {alerts && alerts.length > 0 ? (
          <AlertBanner alerts={alerts} />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl p-12 text-center"
          >
            <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldAlert size={40} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Active Alerts
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              There are currently no weather alerts for {currentLocation}. 
              We'll notify you if any warnings are issued.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
