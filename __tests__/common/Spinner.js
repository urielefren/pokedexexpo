import 'react-native';
import React from 'react';
import Spinner from '../../common/spinner.tsx';
import renderer from 'react-test-renderer';

describe('Spinner', () => {
    it('should Show Spinner when Prop is true ', () => {
        const component = renderer.create(<Spinner shouldShow={true}/>);
        const testInstance = component.root;
        expect(testInstance.props.shouldShow).toBe(true);
    });

    it('should not Show Spinner when Prop is false ', () => {
        const component = renderer.create( < Spinner shouldShow = {false}/>);
        const testInstance = component.root; expect(testInstance.props.shouldShow).toBe(false);
    });
});
