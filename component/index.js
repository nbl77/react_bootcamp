import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import App from './App';
import ReducerContext from './context/Reducer';

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <ReducerContext>
      <App />
    </ReducerContext>
  </ApplicationProvider>
);
