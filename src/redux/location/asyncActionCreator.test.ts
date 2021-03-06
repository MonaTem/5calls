import thunk from 'redux-thunk';
import * as moxios from 'moxios';
import configureStore from 'redux-mock-store';

import { ApplicationState } from './../root';
import { ApiData, Issue, LocationUiState, LocationFetchType } from './../../common/model';
import { setAddress, LocationActionType } from './index';
import * as Constants from '../../common/constants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

test('Expect setAddress() action creator to dispatch correctly', () => {
  const address = 'New Gloucester, ME';
  const mockIssue = new Issue(); const apiData: ApiData = {
    splitDistrict: false,
    invalidAddress: false,
    normalizedLocation: address,
    divisions: [],
    issues: [mockIssue]
  };
  moxios.stubRequest(`${Constants.ISSUES_API_URL}${encodeURIComponent(address)}`,
                     { response: apiData });
  const initialState = {} as ApplicationState;
  const locationState = {
    address: '',
    cachedCity: '',
    useGeolocation: false,
    splitDistrict: false,
    invalidAddress: false,
    uiState: LocationUiState.FETCHING_LOCATION,
    locationFetchType: LocationFetchType.CACHED_ADDRESS
  };
  initialState.locationState = locationState;
  const store = mockStore(initialState);
  // tslint:disable-next-line:no-any
  store.dispatch<any>(setAddress(address))
  .then(() => {
    const actions = store.getActions();
    // console.log('Actions', actions);
    expect(actions[0].type).toEqual(LocationActionType.CACHE_CITY);
    expect(actions[0].payload).toEqual(address);
    expect(actions[5].type).toEqual(LocationActionType.LOCATION_SET);
    expect(actions[5].payload).toEqual(address);
  });

});
