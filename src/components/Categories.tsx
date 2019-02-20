import * as React from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import * as PropTypes from 'prop-types'
import * as Redux from 'redux';

interface Props {
  categories: Array<CategoryType>,
  dispatchHeader: Function,
}

class Categories extends React.Component<Props> {
  static get propTypes() {
    return {
      categories: PropTypes.array,
      dispatchHeader: PropTypes.func,
    };
  }

  componentDidMount() {
    this.props.dispatchHeader({
      title: 'Каталог категорий',
      breadcrumbs: []
    });
  }

  render() {
    const { categories } = this.props

    return (
    <div>
        {categories && categories.map((category, index) => {
          return <Card key={index} value={category} categoryType={"categories"} />
        })}
    </div>);
  }
}

const mapTitle = (state: GlobalState) => ({
  categories: state.categories,
})

const mapDispatchToProps = (dispatch: Redux.Dispatch<HeaderAction>) => {
  return {
    dispatchHeader: (data: HeaderPayload) => {
      dispatch({type: 'SET_HEADER', payload: data});
    }
  }
}

export default connect(
  mapTitle,
  mapDispatchToProps
)(Categories);
