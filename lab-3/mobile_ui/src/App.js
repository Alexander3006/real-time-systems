import { index } from 'mathjs';
import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { Factorization } from './components/Factorization';
import { Genetics } from './components/Geneticts';
import {Calculator} from './screens/Calculator';

const App = () => {

  const [index, setIndex] = useState(0);

  const routes = [
    {
      key: 'fermat',
      title: 'Fermat',
    },
    {
      key: 'ai',
      title: 'AI',
    },
    {
      key: 'genetics',
      title: 'Genetics',
    }
  ]

  const renderScene = BottomNavigation.SceneMap({
    fermat: Factorization,
    ai: Factorization,
    genetics: Genetics,
  });

  return <BottomNavigation
            navigationState={{index, routes}}
            onIndexChange={setIndex}
            renderScene={renderScene}
            barStyle={{
              backgroundColor: 'black',
            }}
        />
};

export default App;
