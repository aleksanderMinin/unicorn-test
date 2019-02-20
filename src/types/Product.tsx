/**
 * Тип продукта
 *
 * @type ProductType
 * @property {number} id Ид продукта
 * @property {string} title заголовок
 * @property {number} price цена
 * @property {number} count кол-во
 * @property {number} category_id категория товара
 */
type ProductType = {
  id: number,
  title: string,
  price: number,
  count: number,
  category_id: number,
}