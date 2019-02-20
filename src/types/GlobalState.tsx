/**
 * State
 *
 * @type GlobalState
 * @property {any | History} router роутер
 * @property {Array<CategoryType>} categories категории
 * @property {BasketState} basket корзина
 * @property {Array<ProductType>} products товары
 * @property {Header} header заголовок приложения
 * @property {LayoutState} layout обёртка компонентов
 * @property {PaymentState} payment состояние оплыт товаров
 */
type GlobalState = {
  router: any | History,
  categories: Array<CategoryType>,
  basket: BasketState,
  products: Array<ProductType>,
  header: Header,
  layout: LayoutState,
  payment: PaymentState,
}

/**
 * Состояние обёртки компонентов
 *
 * @type LayoutState
 * @property {boolean} отображать модальное окно
 */
type LayoutState = {
  show: boolean;
}

/**
 * Состояние оплаты
 *
 * @type PaymentState
 * @property {number} progress прогресс
 * @property {boolean} success оплата завершена
 */
type PaymentState = {
  progress: number;
  success: boolean;
}

/**
 * Состояние корзины
 *
 * @type BasketState
 * @property {object} total всего
 * @property {number} total.count сумма кол-ва товаров
 * @property {number} total.price сумма стоимости всех
 * @property {Array<ProductType>} products товары
 */
type BasketState = {
  total: {
    count: number,
    price: number,
  };
  products: Array<ProductType>
};

/**
 * Передача товара в корзину
 *
 * @type BasketItem
 * @property {ProductType} product товар
 * @property {number} count кол-во товара
 */
type BasketItem = {
  product: ProductType,
  count: number,
}