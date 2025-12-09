import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoadingProps {
  message?: string;
}

export function Loading({ message = 'Loading...' }: LoadingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="text-primary-500 mx-auto mb-4" size={48} />
        </motion.div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          {message}
        </p>
      </motion.div>
    </div>
  );
}
