

const initialState: BasketState = {
  total: {
    count: 0,
    price: 0,
  },

  products: [],
}

function getTotalCount(products: Array<ProductType>) {
  let count = 0;
  products.forEach(pr => {
    count = count + pr.count;
  });
  return Number(count);
}

function getTotalPrice(products: Array<ProductType>) {
  let basketSumm = 0;
  products.forEach(pr => {
    basketSumm = basketSumm + pr.price * pr.count;
  });
  return Number(basketSumm.toFixed(2));
}

export default function basket(state = initialState, action: BasketAction) {

  switch (action.type) {
    case 'ADD_PRODUCT': {
      let products = [...state.products];
      let replicaIndex = products.findIndex(prod => prod.id === Number(action.payload.product.id));
      if (replicaIndex > -1) {
        products[replicaIndex].count = products[replicaIndex].count + Number(action.payload.count);
      } else {
        let product = action.payload.product;
        product.count = Number(action.payload.count);
        products.push(product);
      }

      return {
        total: {
          count: getTotalCount(products),
          price: getTotalPrice(products),
        },
        products: products
      };
    }
    case 'EDIT_COUNT_PRODUCT': {
      let products =[...state.products];
      const newCount = Number(action.payload.count);
      let replicaIndex = products.findIndex(prod => prod.id === Number(action.payload.product.id));
      if (newCount === 0) {
        products.splice(replicaIndex, 1);
      } else {
        products[replicaIndex].count = newCount;
      }

      return {
        total: {
          count: getTotalCount(products),
          price: getTotalPrice(products),
        },
        products: products
      };
    }
    default:
      break;
  }

  return state;
}