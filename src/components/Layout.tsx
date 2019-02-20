import * as React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Modal from './Modal';

interface Props {
  children?: object,
  modalVisible?: boolean,
  products?: Array<ProductType>,
  totalPrice?: number,
  totalCount?: number,
}

class Layout extends React.Component<Props, GlobalState> {

  render() {
    const { modalVisible, totalPrice, totalCount, products } = this.props;
    const countCaption = totalCount == 1 ? 'товар' : 'товара' ;

    return (
      <div className="layout">
        <Header />
        <main className="flex-container">
          {this.props.children}
        </main>
        {modalVisible ?
          <Modal>
            {products && products.map((pr, index) => {
              return (
                <div key={index} className="Modal-ContainerContentItem">
                  <div>{pr.title} - {pr.count} шт.</div>
                  <div>{pr.price}$</div>
                </div>)
            })}
            <div className="Modal-ContainerContentTotal">
              Вы приобрели {totalCount} {countCaption} на сумму {totalPrice}$.
            </div>
          </Modal>
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state: GlobalState, ownProps: Props): Props => {
  return {
    children: ownProps.children,
    modalVisible: state.layout.show,
    products: state.basket.products,
    totalPrice: state.basket.total.price,
    totalCount: state.basket.total.count,
  }
}

export default connect(
  mapStateToProps
)(Layout);