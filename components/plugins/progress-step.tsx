import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

import { ProgressIndicator } from '~/components/nativewindui/ProgressIndicator';
import { cn } from '~/lib/cn';

interface StepperProps {
  steps: number;
  currentStep: number;
}

interface ProgressIndicatorProps {
  step: number;
  percentage: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  const [progress, setProgress] = React.useState<ProgressIndicatorProps>({
    step: 1,
    percentage: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      setProgress({ step: currentStep, percentage: 0 });
    }, 1000);
  }, [currentStep, steps]);

  return (
    <View className="w-full flex-row items-center px-1">
      {Array.from({ length: steps }).map((_, index) => {
        const isCurrentStep = index + 1 === currentStep;
        const prevStep = index < currentStep;

        return (
          <React.Fragment key={index}>
            <View className="flex-1 items-center justify-center">
              <View
                className={cn(
                  'size-10 items-center justify-center rounded-full border-2 border-primary',
                  isCurrentStep ? 'bg-primary' : 'bg-background',
                  prevStep ? 'bg-primary' : 'bg-background'
                )}>
                <Text
                  className={cn(
                    'text-center text-base font-semibold text-foreground',
                    isCurrentStep ? 'text-background' : 'text-primary',
                    prevStep ? 'text-background' : 'text-primary'
                  )}>
                  {index + 1}
                </Text>
              </View>
            </View>
            {index !== steps - 1 && (
              <ProgressIndicator
                className={cn('flex-1', index + 1 < currentStep ? 'bg-primary' : 'bg-gray-300')}
                value={
                  index + 1 < currentStep
                    ? 100
                    : index + 1 === currentStep
                      ? progress.percentage
                      : 0
                }
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default Stepper;
