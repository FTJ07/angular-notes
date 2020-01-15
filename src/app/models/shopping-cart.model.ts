export class ShoppingCartModel {
 items: any;

 get totalItemsCount() {
  let count = 0;
  for (let productId in this.items) {
   count += this.items[productId].quantity;
  }
  return count;
 }
 
}