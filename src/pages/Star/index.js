/* eslint-disable react/prop-types */
import React from 'react';
import { WebView } from 'react-native-webview';

export default function Star({ route }) {
  return (
    <WebView source={{ uri: route.params.item.html_url }} style={{ flex: 1 }} />
  );
}
