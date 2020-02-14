import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import './config/ReactotronConfig';

import Routes from './routes';

YellowBox.ignoreWarnings([
  'Warning: React.createElement',
  'Warning: User: type',
]);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </>
  );
}
