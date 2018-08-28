import * as React from 'react';
import * as Constants from '../../common/constants';

interface Props {
  readonly total: number;
  readonly goal: number;
}

interface State {}

export class Donation extends React.Component<Props, State> {
  render () {

    return (
      <div className="logo__header__donate">
        <div className="layout">
          <div className="logo__header__donatejustify">
            <p className="logo__header__donatetext">
              Get Involved:
            </p>
            <div className="logo__header__donatebutton">
              <a href={`${Constants.WRITER_APPLY_URL}`} target="_blank">Apply</a>
              <p>Research and Write Topics</p>
            </div>
            <div className="logo__header__donatebutton">
              <a href={`${Constants.CODE_PROJECT_URL}`} target="_blank">Projects</a>
              <p>Contribute Design or Code</p>
            </div>
            <div className="logo__header__donatebutton">
              <a href={`${Constants.DONATE_URL}?amount=25`} target="_blank">$10</a>
              <p>Donate to Support 5 Calls</p>
            </div>
            {/* <div className="logo__header__donatebutton">
              <a href={`${Constants.DONATE_URL}?amount=100`} target="_blank">$100</a>
              <p>Keeps the server running for a month</p>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
