import * as React from 'react';
import { connect } from 'react-redux';
import * as loremIpsum from 'lorem-ipsum';
import * as Redux from 'redux';

interface Props {
  product?: ProductType,
  dispatchHeader?: Function,
  breadcrumbs?: Array<Breadcrumb>,
  dispatchBuy?: Function,
}

interface State {
  count: number,
}

class Product extends React.Component<Props, State> {
  description: string

  constructor(props: Props) {
    super(props);

    this.changeCount = this.changeCount.bind(this);
    this.clickBuy = this.clickBuy.bind(this);
    this.state = {
      count: 1
    }
  }

  /**
   * Добавление товара в корзину
   */
  clickBuy() {
    this.props.dispatchBuy({
      product: this.props.product,
      count: this.state.count
    })
  }

  componentDidMount() {
    this.props.dispatchHeader({
      title: this.props.product.title,
      breadcrumbs: this.props.breadcrumbs
    });

    this.description = loremIpsum({ count: 1, units: 'paragraphs' });
  }

  /**
   * Изменение кол-ва товара
   * @param {React.FormEvent<HTMLInputElement>} input контрол кол-ва товара
   */
  changeCount(input: React.FormEvent<HTMLInputElement>) {
    this.setState({ count: Number(input.currentTarget.value) });
  }

  render() {
    const { title, price } = this.props.product;
    const { count } = this.state;

    return (
    <div className="Product">
      <div className="Product-Header">
        <img className="Product-HeaderImg" src="https://purr.objects-us-east-1.dream.io/i/image-1.jpeg"></img>
        <div className="Product-HeaderControls">
          <input className="Product-HeaderControlsCount" type="number" min="0" value={count} onChange={this.changeCount}>
          </input>
          <button className="Product-HeaderControlsBuy" onClick={this.clickBuy}>
            Купить
          </button>
        </div>
      </div>
      <h3>{title} - {price}$</h3>
      <p>{this.description}</p>
    </div>);
  }
}

const mapStateToProps = (state: GlobalState, ownProps: any): Props => {
  const product = state.products.find(item => item.id === Number(ownProps.match.params.id));
  const category = state.categories.find(category => category.id === Number(product.category_id));
  const breadcrumbs = [
    {
      title: category.title,
      link: `categories/${category.id}`
    },
    {
      title: product.title,
      link: `products/${product.id}`
    }
  ] as Breadcrumb[]

  return {
    product: product,
    breadcrumbs: breadcrumbs
  };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<HeaderAction | BasketAction>) => {
  return {
    dispatchHeader: (data: HeaderPayload) => {
      dispatch({type: 'SET_HEADER', payload: data});
    },
    dispatchBuy: (data: BasketPayload) => {
      dispatch({ type: 'ADD_PRODUCT', payload : data})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
