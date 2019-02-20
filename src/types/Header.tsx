/**
 * Состояние заголовка
 *
 * @type Header
 * @property {string} title текст заголовка
 * @property {Array<Breadcrumb>} breadcrumbs хлебные крошки
 */
type Header = {
  title: string,
  breadcrumbs: Array<Breadcrumb>,
}

/**
 * Хлебная крошка
 *
 * @type Breadcrumb
 * @property {string} title заголовок
 * @property {string} link ссылка
 */
type Breadcrumb = {
  title: string,
  link: string,
}