'use strict';

import { assert } from 'chai';
import React, { Component, PropTypes } from 'react';
import TestUtils from 'react-addons-test-utils';
import { renderAndFind } from '/test/utils';

import load from '/src/decorator';
import * as status from '/src/status';

// Data
import { User } from '/test/models';

describe('@load: status props', () => {

  it('it injects status into this.props', () => {
    class Base extends Component {
      static propTypes = {
        status: PropTypes.object,
        user: User.instanceOf
      }

      render() {
        const { user } = this.props;
        // We inject a `status` prop which is an object containing loading
        // states for all props specified within @load
        if (this.props.status.user === status.PENDING) {
          return <p>Loading...</p>;
        }
        return <p>{ this.props.user.name }</p>
      }
    }

    const WrappedBase = load({
      user: User.getItem({ id: 1 })
    })(Base);
    const item = renderAndFind(<WrappedBase />, Base);

    assert.isDefined(item);
    assert.isObject(item.props.status);
    assert.equal(item.props.status.user, status.PENDING);
  });

});
