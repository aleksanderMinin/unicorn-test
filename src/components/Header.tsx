import * as React from 'react';
import { connect } from 'react-redux';
import Basket from './Basket';
import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

interface Props {
  categories?: Array<CategoryType>,
  dispatchHeader?: Function,
  products?: Array<ProductType>,
  category?: CategoryType,
  breadcrumbs?: Array<Breadcrumb>,
}

class Header extends React.Component<Props> {
  static get propTypes() {
    return {
      title: PropTypes.string,
      breadcrumbs: PropTypes.array,
    };
  }

  render() {
    let { breadcrumbs } = this.props;

    return (
      <header >
        <div className="nav-bar">
            <NavLink to={`/`}>
              Home
            </NavLink >
            {breadcrumbs && breadcrumbs.map((crumb, index) =>{
              return (<div key={index}>/{index !== breadcrumbs.length - 1 ?
                <NavLink to={`/${crumb.link}`} >
                  {crumb.title}
                </NavLink>
                : crumb.title}
              </div>)
            })}
        </div>
        <Basket />
      </header>
    )
  }
}

const mapStateToProps = (state: GlobalState) => {
  return {
    title: state.header.title,
    breadcrumbs: state.header.breadcrumbs,
  }
}

export default connect(
  mapStateToProps
)(Header);