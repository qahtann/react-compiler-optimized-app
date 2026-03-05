import { useState, useEffect } from 'react';
import { COMPILER_ENABLED } from '@/lib/constants';

export function useCompilerToggle() {
  const [isEnabled, setIsEnabled] = useState(COMPILER_ENABLED);
  const [isRuntimeToggle, setIsRuntimeToggle] = useState(false);

  useEffect(() => {
    // Note: React Compiler is compile-time, so runtime toggle is informational only
    // In a real scenario, you'd need to rebuild with different env vars
    setIsRuntimeToggle(isEnabled);
  }, [isEnabled]);

  return {
    isEnabled: isEnabled || isRuntimeToggle,
    isRuntimeToggle,
    setIsEnabled,
    // This is informational - actual compiler state comes from build-time config
    actualCompilerEnabled: COMPILER_ENABLED,
  };
}
