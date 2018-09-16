class ProductUtils {
  static populateProducts(productSpec, cart) {
    const { product, variantPropId } = productSpec;
    const variantProp = product.variantsProps[variantPropId];
    const products = cart.get('products');
    let indexIfExists = null;
    let finalProduct = {};

    if (products.size) {
      const exists = products.filter((value, index) => {
        if (value.product.name === product.name && value.variantPropId === variantPropId) {
          indexIfExists = index;
          return true;
        }
        return false;
      }
      );
      console.log(exists);
      if (exists.size) {
        console.log('quantity is ', exists.get(0).quantity);
        finalProduct.quantity = exists.get(0).quantity + 1;
      } else {
        finalProduct.quantity = 1;
      }
    } else {
      finalProduct.quantity = 1;
    }

    finalProduct = {
      ...finalProduct,
      price: (variantProp && variantProp.price) ? variantProp.price : product.price,
      discount: (variantProp && variantProp.discount) ? variantProp.discount : product.discount || 0,
      tax: (variantProp && variantProp.tax) ? variantProp.tax : product.tax || 0,
    };

    const finalObject = { product, variantPropId, ...finalProduct };

    if (!(indexIfExists === null)) {
      return products.set(indexIfExists, finalObject);
    }
    return products.push(finalObject);
  }

  static evaluate(cart) {
    const products = cart.get('products');
    return cart
      .set('subTotal', products.reduce((acc, product) => (acc + (parseFloat(product.price) * parseFloat(product.quantity))), 0))
      .set('tax', products.map((product) => (product.tax || 0)).toSet().toList())
      .set('discount', products.map((product) => (product.discount || 0)).toSet().toList())
      .set('total', products.reduce((acc, product) => {
        const total = parseFloat(product.price);
        const discount = parseFloat(product.discount || 0);
        const tax = parseFloat(product.tax || 0);
        let newDiscount = 0;
        let newTax = 0;
        if (discount < 1 && discount > 0) {
          newDiscount = total * discount;
        } else {
          newDiscount = total * (discount / 100);
        }

        if (tax < 1 && tax > 0) {
          newTax = total * tax;
        } else {
          newTax = total * (tax / 100);
        }

        return (acc + ((total - newDiscount) + newTax));
      }, 0));
  }
}


export default ProductUtils;
