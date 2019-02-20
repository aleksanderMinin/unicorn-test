import * as React from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import * as Redux from 'redux';

interface Props {
  categories: Array<CategoryType>,
  dispatchHeader: Function,
  products: Array<ProductType>,
  category: CategoryType,
  breadcrumbs: Array<Breadcrumb>,
}

class Category extends React.Component<Props> {

  componentDidMount() {
    this.props.dispatchHeader({
      title: this.props.category.title,
      breadcrumbs: this.props.breadcrumbs
    });
  }

  render() {
    const { products } = this.props;

    return <div>
      {products && products.map((product, index) => {
        return <Card key={index} value={product} categoryType={"products"}/>
      })}
    </div>;
  }
}

const mapStateToProps = (state: GlobalState, ownProps: any) => {
  const category = state.categories.find(category => category.id === Number(ownProps.match.params.id));
  let breadcrumbs = [
    {
      title: category.title,
      link: `categories/${category.id}`
    }
  ]

  return {
    category: category,
    products: state.products.filter(product => product.category_id === Number(ownProps.match.params.id)),
    breadcrumbs: breadcrumbs,
  }
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<HeaderAction>) => {
  return {
    dispatchHeader: (data: HeaderPayload) => {
      dispatch({type: 'SET_HEADER', payload: data});
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
