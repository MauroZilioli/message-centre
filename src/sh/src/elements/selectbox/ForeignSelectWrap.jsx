import React from 'react';
import ForeignSelect from 'react-select';
import ForeignSelectTether from './ForeignSelectTether';

export default class ForeignSelectWrap extends ForeignSelect {
  constructor() {
    super();
    this.renderOuter = this.renderOuter.bind(this);
  }

  componentDidMount() {
    this.dropdownFieldNode = this.wrapper;
  }

  renderOuter() {
    const menu = super.renderOuter.apply(this, arguments);

    const tetherOptions = {
      attachment: 'top left',
      targetAttachment: 'bottom left',
      offset: '-1px 0',
      constraints: [
        {
          to: 'window',
          attachment: 'together',
        },
      ],
    };

    return (
      <ForeignSelectTether
        target={this.dropdownFieldNode}
        options={tetherOptions}
        matchWidth
        >
        {/* Apply position:static to our menu so that it's parent will
          get the correct dimensions and we can tether the parent */}
        {React.cloneElement(menu, { style: { position: 'static' } })}
      </ForeignSelectTether>
    );
  }
}
