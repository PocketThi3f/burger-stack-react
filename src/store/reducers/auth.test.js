import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

// Test showing that the initialState written in the reducers/auth file is equal to test
describe('auth reducer', () => {
    it('getting initialState', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        });
    });

    it('it should store the token needed for authentication on login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some token',
            userId: 'some-user-id'
        })).toEqual({
            token: 'some token',
            userId: 'some-user-id',
            error: null,
            loading: false,
            authRedirect: '/'
        });
    });
});