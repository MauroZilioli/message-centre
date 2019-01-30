import React from 'react';
import PropTypes from 'prop-types';

import * as SH from './../../sh/src/elements';

import './QuickAccess.scss';

class QuickAccess extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedType: null,
            isOpen: false,
        };
    }

    render() {
        const {
            isOpen,
        } = this.state;

        const {
            user,
        } = this.props;

        return (
            <div className="quickaccess">
                <SH.Button icon="add" onClick={() => this.setState({ isOpen: true })} className="quickaccess-button">Add New</SH.Button>
                <SH.Modal
                    className="quickaccess-modal"
                    isOpen={isOpen}
                    onClose={() => this.setState({ isOpen: false })}
                    closeable
                >
                    <SH.Dialog className="quickaccess-dialog">
                        <SH.Header>
                            <h2>Add New</h2>
                        </SH.Header>
                        <SH.Content className="quickaccess-list">
                            <SH.UserGuard user={user} role="*">
                                <SH.Link
                                    to="/conversations/create"
                                    className="quickaccess-list-item"
                                    data-value="country"
                                    onClick={() => this.setState({ isOpen: false })}
                                >
                                    Conversation
                                </SH.Link>
                            </SH.UserGuard>
                        </SH.Content>
                    </SH.Dialog>
                </SH.Modal>
            </div>
        );
    }
}

QuickAccess.defaultProps = {
    user: null,
};

QuickAccess.propTypes = {
    user: PropTypes.object,
};

export default QuickAccess;
