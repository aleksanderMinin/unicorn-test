import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as Redux from 'redux';

interface Props {
  children?: object,
  dispatchCloseModal?: Function,
  payment?: PaymentState,
  dispatchConfirmPayment?: Function,
}

interface State {
  steps: number,
  count: number,
}

class Modal  extends React.Component<Props, State> {

  modal: HTMLElement

  constructor(props: Props) {
    super(props);

    this.state = {
      steps: 3,
      count: 0,
    }

    this.closeModal = this.closeModal.bind(this);
  }

  render() {
    return (<noscript></noscript>);
  }

  componentDidMount() {
    this.rendermodal();
    this.props.dispatchConfirmPayment();
  }

  componentDidUpdate() {
    this.rendermodal();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modal);
    document.body.removeChild(this.modal);
  }

  closeModal() {
    this.props.dispatchCloseModal({
      show: false,
    })
  }

  rendermodal() {
    if (!this.modal) {
      this.modal = document.createElement("div");
      document.body.appendChild(this.modal);
    }

    const { progress, success } = this.props.payment;
    const progressStyle = {
      width: `${progress}%`
    }

    ReactDOM.render(
      <div className="Modal">
        <div className="Modal-Container">
          <div className="Modal-ContainerHeader">
            <div className="Modal-ContainerHeaderTitle">Процесс оплаты</div>
            <div className="Modal-ContainerHeaderClose" onClick={this.closeModal}>X</div>
          </div>
          <div className="Modal-ContainerContent">
            {!success ?
              <div className="loader" >
                <div className="progress" style={progressStyle} />
              </div>
              : this.props.children
            }
          </div>
        </div>
      </div>,
      this.modal
    );
  }
}

const mapStateToProps = (state: GlobalState): Props => {
  return {
    payment: state.payment,
  }
}

const steps = 3;

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>) => {
  return {
    dispatchCloseModal: (data: any) => {
      dispatch({ type: 'SHOW_MODAL', payload : data})
    },
    dispatchConfirmPayment: () => {
      let progress = 0;
      dispatch({ type: 'PAYMENT_PROGRESS_UPDATE', payload: progress });
      let countDown = setInterval(() => {
        if (progress < steps) {
          progress++;
          dispatch({ type: 'PAYMENT_PROGRESS_UPDATE', payload: progress / steps });
        } else {
          dispatch({ type: 'PAYMENT_CONFIRMED' })
          clearTimeout(countDown);
        }
      }, 1000);
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
