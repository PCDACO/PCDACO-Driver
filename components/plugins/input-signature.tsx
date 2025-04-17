import { Feather } from '@expo/vector-icons'; // Assuming you're using Expo, otherwise import your preferred icon library
import React, { FunctionComponent, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import SignatureScreen, { SignatureViewRef } from 'react-native-signature-canvas';

interface InputSignatureProps {
  title?: string;
  onSubmit?: () => void;
  onChange?: (signature: string) => void;
  onClear?: () => void;
}

const InputSignature: FunctionComponent<InputSignatureProps> = ({
  title = 'Your Signature',
  onSubmit,
  onChange,
  onClear,
}) => {
  const ref = React.useRef<SignatureViewRef>(null);
  const [isSigned, setIsSigned] = useState(false);

  const handleOK = (signature: string) => {
    setIsSigned(true);
    onChange?.(signature);
  };

  const handleEmpty = () => {
    setIsSigned(false);
  };

  const handleClear = () => {
    setIsSigned(false);
    onClear?.();
  };

  const handleEnd = () => {
    setIsSigned(true);
    ref.current?.readSignature(); // This will trigger onOK
    // ref.current?.getData(); // 🔵 Extract raw stroke data (as base64), useful for onChange
  };

  const handleChange = (data: string) => {
    onChange?.(data); // 🔵 Called after each stroke ends
  };

  const handleSubmit = () => {
    if (isSigned) {
      ref.current?.readSignature();
      onSubmit?.();
    }
  };

  const webStyle = `
    body {
      background-color: #f8f9fa;
    }
    
    .m-signature-pad {
      box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
      border-radius: 12px !important;
      overflow: hidden;
    }
    
    .m-signature-pad--body {
      border: none;
      border-radius: 12px !important;
      background-color: #ffffff;
    }
    
    .m-signature-pad--footer {
      background-color: #f8f9fa;
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
    }
    
    .button {
      font-family: 'Helvetica Neue', sans-serif;
      font-weight: 500;
      font-size: 14px;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
      outline: none;
    }
    
    .button:active {
      transform: scale(0.97);
    }
    
    #clear {
      background-color: #f1f3f5;
      color: #495057;
    }
    
    #clear:hover {
      background-color: #e9ecef;
    }
    
    #save {
      background-color: #4263eb;
      color: white;
    }
    
    #save:hover {
      background-color: #3b5bdb;
    }
    
    .m-signature-pad--footer .description {
      color: #495057;
      font-family: 'Helvetica Neue', sans-serif;
      font-size: 14px;
      font-weight: 400;
      text-align: center;
      margin-bottom: 10px;
    }
  `;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Vui lòng ký vào ô bên dưới</Text>
      </View>

      <View style={styles.signatureContainer}>
        <SignatureScreen
          ref={ref}
          onOK={handleOK}
          onEmpty={handleEmpty}
          onClear={handleClear}
          onEnd={handleEnd}
          onGetData={handleChange}
          autoClear={false}
          imageType="image/png"
          webStyle={webStyle}
          confirmText="Confirm"
          penColor="#000000"
          backgroundColor="#ffffff"
        />
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={() => ref.current?.clearSignature()}>
          <Feather name="x" size={18} color="#495057" />
          <Text style={styles.clearButtonText}>Xóa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.saveButton, !isSigned && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!isSigned}>
          <Feather name="check" size={18} color="white" />
          <Text style={styles.saveButtonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>

      {Platform.OS !== 'web' && (
        <Text style={styles.hint}>Vui lòng sử dụng ngón tay để ký vào ô bên trên</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    overflow: 'hidden',
    padding: 16,
  },
  headerContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
  },
  signatureContainer: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 120,
  },
  clearButton: {
    backgroundColor: '#f1f3f5',
  },
  clearButtonText: {
    color: '#495057',
    fontWeight: '500',
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: '#4263eb',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: '#adb5bd',
    opacity: 0.7,
  },
  hint: {
    textAlign: 'center',
    marginTop: 16,
    color: '#6c757d',
    fontSize: 12,
  },
});

export default InputSignature;
