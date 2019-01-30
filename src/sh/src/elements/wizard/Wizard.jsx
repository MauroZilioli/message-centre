import React from 'react';
import PropTypes from 'prop-types';

import Button from './../button/Button';

import { join, slot } from './../../utils/element';

import './Wizard.scss';
import './Wizard.Modal.scss';

class Wizard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStepIndex: 0,
      isPrevAllowed: true,
      isNextAllowed: true,
      isFirstStep: false,
      isLastStep: false,
    };
  }

  onButtonCancelClick() {
    const onCancel = this.props.onCancel;
    if (onCancel) {
      onCancel();
    }
  }

  onButtonNextClick() {
    const currentStepIndex = this.state.currentStepIndex;

    if (currentStepIndex < (this.props.steps || this.props.children).length - 1) {
      // Prevent moving forward if current step is not valid
      if (this.props.steps) {
        if (this.stepComponentRef.isValid && !this.stepComponentRef.isValid()) {
          return;
        }
      } else if (this.props.children[currentStepIndex].props.isValid) {
        if (!this.props.children[currentStepIndex].props.isValid()) {
          return;
        }
      }

      this.setState({
        currentStepIndex: currentStepIndex + 1,
      });
    }
  }

  onButtonPrevClick() {
    const currentStepIndex = this.state.currentStepIndex;
    if (currentStepIndex > 0) {
      this.setState({
        currentStepIndex: currentStepIndex - 1,
      });
    }
  }

  onButtonFinishClick() {
    const onFinish = this.props.onFinish;
    if (onFinish) {
      onFinish();
    }
  }

  render() {
    const {
      children,
      className,
      title,
    } = this.props;

    const {
      currentStepIndex,
    } = this.state;

    const steps = this.props.steps || children.map(child => ({
      name: child.props.name,
      component: child,
    }));
    const stepsHeader = steps.map((step, index) => (
      <div
        key={`wizardstep-${index}`}
        data-step-index={index + 1}
        className={join(
          'sh-wizard_header-step',
          index === currentStepIndex && 'sh-wizard_header-step--current',
          index < currentStepIndex && 'sh-wizard_header-step--completed',
        )}
        >
        { step.name }
      </div>
    ));

    let currentStepComponent = steps[currentStepIndex].component;
    if (this.props.steps) {
      // Rendering by cloning in order to get a ref to component
      currentStepComponent = React.cloneElement(steps[currentStepIndex].component, {
        ref: (shadowRef) => { this.stepComponentRef = shadowRef; },
      });
    }

    return (
      <div
        className={join('sh-wizard', className)}
        >
        <div className="sh-header sh-wizard_header">
          <h2>{ title }</h2>
        </div>
        <div className="sh-wizard_stepper">{ stepsHeader }</div>
        <div className="sh-content sh-wizard_content">
          { currentStepComponent }
        </div>
        <div className="sh-footer sh-wizard_footer">
          {currentStepIndex < 1
            ? <Button
              type="cancel"
              onClick={() => this.onButtonCancelClick()}
              >Cancel</Button>
            : <Button
              type="cancel"
              onClick={() => this.onButtonPrevClick()}
              >&lt; previous step</Button>
          }
          {currentStepIndex < steps.length - 1
            ? <Button
              onClick={() => this.onButtonNextClick()}
              >next step &gt;</Button>
            : <Button
              onClick={() => this.onButtonFinishClick()}
              >finish</Button>
          }
        </div>
      </div>
    );
  }
}

Wizard.defaultProps = {
  className: undefined,
  children: undefined,
  title: undefined,
  steps: undefined,
  onCancel: undefined,
  onFinish: undefined,
};

Wizard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string,
  steps: PropTypes.array,
  onCancel: PropTypes.func,
  onFinish: PropTypes.func,
};

export default Wizard;
