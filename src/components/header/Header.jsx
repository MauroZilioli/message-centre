import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import * as SH from './../../sh/src/elements';

import './Header.scss';

import QuickAccess from './../quickaccess/QuickAccess';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        const {
            user,
        } = this.props;

        return (
            <SH.Sitemenu>
                <SH.Sitemenugroup>
                    <SH.UserGuard user={user} role="*">
                        <SH.Sitemenuitem>
                            <QuickAccess user={user} />
                        </SH.Sitemenuitem>
                    </SH.UserGuard>
                </SH.Sitemenugroup>
            </SH.Sitemenu>
        );
    }

}

Header.defaultProps = {
    user: null,
};

Header.propTypes = {
    user: PropTypes.object,
    // onLogout: PropTypes.func.isRequired,
};

export default Header;
