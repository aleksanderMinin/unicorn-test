import * as React from 'react';
import { NavLink  } from 'react-router-dom';
import { connect } from 'react-redux';

interface Props {
  value: ProductType | CategoryType,
  categoryType: string,
  location: string,
}

class Card extends React.Component<Props> {

  render() {
    const title = this.props.value.title;
    const toId = this.props.value.id;
    const toCategory = this.props.categoryType;
    const location = this.props.location == '/' ? '' : this.props.location;

    return <div className="card">
      <NavLink to={`${location}/${toCategory}/${toId}`} className="card-link">
        <div>{title}</div>
      </NavLink >
    </div>;
  }
}

function mapStateToProps(state: GlobalState) {
  return {
    location: state.router.location.pathname
  };
}

export default connect(
  mapStateToProps
)(Card);
