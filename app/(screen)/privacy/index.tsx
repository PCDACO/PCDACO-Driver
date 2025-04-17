import React, { FunctionComponent } from 'react';
import WebView from 'react-native-webview';

const PrivacyScreen: FunctionComponent = () => {
  return (
    <WebView
      source={{
        uri: 'https://adminpcdaco.persiehomeserver.com/policy?fbclid=IwY2xjawJoRM9leHRuA2FlbQIxMAABHtDHJ59J_yroq3v56LGKkVe8Aa8_914syxEIDA7pTJMossXgxq48wrCULb9w_aem_saoE0dxfxVH6DV3oIfNBFA',
      }}
    />
  );
};

export default PrivacyScreen;
