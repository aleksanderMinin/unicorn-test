/**
 * Состояние заголовка
 *
 * @interface HeaderPayload
 * @property {string} title текст заголовка
 * @property {Array<Breadcrumb>} breadcrumbs хлебные крошки
 */
interface HeaderPayload {
  title: string,
  breadcrumbs: Array<Breadcrumb>,
}

/**
 * @interface HeaderAction
 * @property {HeaderPayload} payload
 */
interface HeaderAction extends Action {
  payload: HeaderPayload,
}

/**
 * Хлебная крошка
 *
 * @interface Breadcrumb
 * @property {string} title заголовок
 * @property {string} link ссылка
 */
interface Breadcrumb {
  title: string,
  link: string,
}