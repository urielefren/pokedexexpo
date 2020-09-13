import 'react-native';
import React from 'react';
import App from '../App.tsx';
import renderer from 'react-test-renderer';

jest.mock('../common/pokegrid', () => 'Pokegrid');

it('renders correctly', () => {
  renderer.create(<App />);
});
