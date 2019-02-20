/**
 * State
 *
 * @interface GlobalState
 * @property {any | History} router роутер
 * @property {Array<CategoryType>} categories категории
 * @property {BasketState} basket корзина
 * @property {Array<ProductType>} products товары
 * @property {Header} header заголовок приложения
 * @property {LayoutState} layout обёртка компонентов
 * @property {PaymentState} payment состояние оплыт товаров
 */
interface GlobalState {
  router: any | History,
  categories: Array<CategoryType>,
  basket: BasketState,
  products: Array<ProductType>,
  header: HeaderPayload,
  layout: LayoutState,
  payment: PaymentState,
}

/**
 * Состояние обёртки компонентов
 *
 * @interface LayoutState
 * @property {boolean} отображать модальное окно
 */
interface LayoutState {
  show: boolean;
}

/**
 * Состояние оплаты
 *
 * @interface PaymentState
 * @property {number} progress прогресс
 * @property {boolean} success оплата завершена
 */
interface PaymentState {
  progress: number;
  success: boolean;
}
