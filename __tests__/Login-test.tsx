import 'react-native';
import React from 'react';
import Login from '../src/screens/LoginPage/Login';
import { render, fireEvent } from '@testing-library/react-native';

describe('Login', () => {
    it('renders correctly', () => {
        const { getByPlaceholderText } = render(<Login />);
        expect(getByPlaceholderText('Email')).toBeTruthy();
        expect(getByPlaceholderText('Password')).toBeTruthy();
    });


    it('should update state when typing in inputs', () => {
        const { getByPlaceholderText } = render(<Login/>);
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');

        fireEvent.changeText(emailInput, 'testuser@gmail.com');
        fireEvent.changeText(passwordInput, 'password123');

        expect(emailInput.props.value).toBe('testuser@gmail.com');
        expect(passwordInput.props.value).toBe('password123');
    })

});