import React from 'react';

interface ModalContextType {
  close: () => void;
}

export const ModalContext = React.createContext<ModalContextType>({
  close: () => {},
});

export const useModalContext = () => React.useContext(ModalContext);
