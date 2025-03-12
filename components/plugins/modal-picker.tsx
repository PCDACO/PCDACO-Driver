import * as React from 'react';
import { Modal, ModalProps, TouchableOpacity, View, Animated, Dimensions } from 'react-native';

import { ModalContext } from '../context/modal-context';
import { Text } from '../nativewindui/Text';

import { cn } from '~/lib/cn';

interface ModalPickerProps extends ModalProps {
  className?: string;
  children?: React.ReactNode;
  contextInput?: string | React.ReactNode;
  icon?: React.ReactNode;
  visible?: boolean;
  onRequestClose?: () => boolean;
}

export const ModalClose: React.FC<{
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}> = ({ children, className, onPress }) => {
  const { close } = React.useContext(ModalContext);

  const handlePress = () => {
    close();
    onPress?.();
  };

  return (
    <TouchableOpacity onPress={handlePress} className={className}>
      {children}
    </TouchableOpacity>
  );
};

const ModalPicker: React.FC<ModalPickerProps> = ({
  children,
  contextInput,
  icon,
  className,
  visible,
  onRequestClose,
  ...props
}) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    setIsVisible(visible ?? false);
  }, [visible]);

  const handleClose = React.useCallback(async () => {
    setIsVisible(false);
    onRequestClose?.();

    console.log('request close', await onRequestClose);
  }, [onRequestClose, visible]);

  React.useEffect(() => {
    if (isVisible) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const contextValue = React.useMemo(
    () => ({
      close: handleClose,
    }),
    [handleClose]
  );

  return (
    <View>
      <TouchableOpacity onPress={() => setIsVisible(true)} className={cn(className)}>
        {icon && icon}
        {typeof contextInput === 'string' ? (
          <Text className="text-foreground">{contextInput}</Text>
        ) : (
          contextInput
        )}
      </TouchableOpacity>
      <Modal
        transparent
        animationType="none"
        visible={isVisible}
        onRequestClose={handleClose}
        {...props}>
        <ModalContext.Provider value={contextValue}>
          <View className="flex-1">
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleClose}
              className="flex-1 bg-black/50">
              <Animated.View
                style={{
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [Dimensions.get('window').height, 0],
                      }),
                    },
                  ],
                }}
                className="absolute bottom-0 w-full rounded-t-3xl bg-background">
                {/* <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}> */}
                <View className="p-4">{children}</View>
                {/* </TouchableOpacity> */}
              </Animated.View>
            </TouchableOpacity>
          </View>
        </ModalContext.Provider>
      </Modal>
    </View>
  );
};

export default ModalPicker;
