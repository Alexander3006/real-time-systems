'use strict';

import * as React from 'react';
import {View} from 'react-native';
import {Factorization} from '../components/Factorization';

export const Calculator = () => {
  return (
    <View
      style={{
        padding: 10,
      }}>
      <Factorization />
    </View>
  );
};
