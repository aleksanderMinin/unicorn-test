/**
 * Передача товара в корзину
 *
 * @interface BasketPayload
 * @property {ProductType} product товар
 * @property {number} count кол-во товара
 */
interface BasketPayload {
  product: ProductType,
  count: number,
}

/**
 * Состояние корзины
 *
 * @interface BasketState
 * @property {object} total всего
 * @property {number} total.count сумма кол-ва товаров
 * @property {number} total.price сумма стоимости всех
 * @property {Array<ProductType>} products товары
 */
interface BasketState {
  total: {
    count: number,
    price: number,
  };
  products: Array<ProductType>
};

/**
 * @interface BasketAction
 * @property {BasketPayload} payload
 */
interface BasketAction extends Action {
  payload: BasketPayload,
}