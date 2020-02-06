// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure as rtlConfigure } from '@testing-library/dom';
import 'regenerator-runtime/runtime';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Change getByTestId to use 'data-e2e' prop instead of 'data-testid'
rtlConfigure({ testIdAttribute: 'data-e2e' });
