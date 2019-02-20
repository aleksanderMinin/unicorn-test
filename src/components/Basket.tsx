import * as React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import * as Redux from 'redux';

interface Props {
  dispatchCountChange?: Function,
  dispatchBuy?: Function,
  basketListClass?: string,
  products?: Array<ProductType>,
  totalPrice?: number,
  totalCount?: number,
}

interface State {
  basketListClass: string,
}

class Basket extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.basketClick = this.basketClick.bind(this);
    this.onCountChange = this.onCountChange.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.hideBasketLIst = this.hideBasketLIst.bind(this);
    this.buyClick = this.buyClick.bind(this);
    this.state = {
      basketListClass: "Basket-List_hidden",
    }
  }

  /**
   * Открыть список товаров корзине
   *
   * @param {number} count кол-во товаров
   */
  basketClick(count: number) {
    if (count > 0) {
      const hidden = this.state.basketListClass.indexOf('hidden') > -1;
      this.setState({ basketListClass: classnames('Basket-List', { 'Basket-List_hidden': !hidden })});
    } else {
      this.setState({ basketListClass: classnames('Basket-List', { 'Basket-List_hidden': true })});
    }
  }

  /**
   * Изменение кол-ва товаров в корзине
   * @param {ProductType} product товар, кол-во которого меняется
   * @param {React.FormEvent<HTMLInputElement>} input контрол кол-ва товара
   */
  onCountChange(product: ProductType, input: React.FormEvent<HTMLInputElement>) {
    const count = Number(input.currentTarget.value)
    this.props.dispatchCountChange({
      product: product,
      count: count
    });
    this.hideBasketLIst(product.id, count);
  }

  /**
   * Удалить продукт из списка корзины
   * @param {ProductType} product товар
   */
  deleteProduct(product: ProductType) {
    this.props.dispatchCountChange({
      product: product,
      count: 0
    })
    this.hideBasketLIst(product.id, 0);
  }

  /**
   * Проверить при последний ли товар удалиется из корзины,
   * если да - скрыть список
   * @param {number} id Ид товара
   * @param {number} count Кол-во товара в корзине
   */
  hideBasketLIst(id: number, count: number) {
    const lastDeleted = count == 0 && this.props.products.length == 1 && this.props.products[0].id == id;
    if (lastDeleted) {
      this.basketClick(0);
    }
  }

  /**
   * Вызов процесса оплаты товара
   */
  buyClick() {
    this.props.dispatchBuy({
      show: true,
    })
  }

  /**
   * Перехват клика по списку корзины,
   * исключает открытие/закрытие списка при клике по нему
   * @param e
   */
  basketListClick(e: React.MouseEvent<HTMLInputElement>) {
    e.stopPropagation();
  }

  render() {
    const { products, totalPrice, totalCount } = this.props;
    const { basketListClass } = this.state;
    const productCaption = totalCount === 1 ? 'товар' : 'товара';

    return (
    <div className="Basket" onClick={this.basketClick.bind(this, totalCount)}>
      <div className="Basket-Card" >
        {totalCount == 0 ? <p>Корзина пуста</p> :
          (<p>Корзина
          <br/>{totalCount} {productCaption} на сумму {totalPrice} $</p>)
        }
      </div>
      <div className={basketListClass} onClick={this.basketListClick}>
        <div className="Basket-ListItems">
          {products && products.map((pr, index) => {
            return (
            <div key={index} className="Basket-ListItem">
              <div>{pr.title}</div>
              <input value={pr.count} type="number" min="0" onChange={this.onCountChange.bind(this, pr)} />
              <button title="Удалить" onClick={this.deleteProduct.bind(this, pr)}>Х</button>
            </div>)
          })}
        </div>
        <div className="Basket-ListFooter">
          <div>{totalCount} {productCaption} на сумму {totalPrice}</div>
          <button onClick={this.buyClick}>Оплатить</button>
        </div>
      </div>
    </div>);
  }
}

function mapStateToProps(state: GlobalState) {
  return {
    products: state.basket.products,
    totalPrice: state.basket.total.price,
    totalCount: state.basket.total.count,
  };
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<BasketAction>) => {
  return {
    dispatchCountChange: (data: BasketPayload) => {
      dispatch({type: 'EDIT_COUNT_PRODUCT', payload: data});
    },
    dispatchBuy: (data: BasketPayload) => {
      dispatch({type: 'SHOW_MODAL', payload: data});
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Basket);