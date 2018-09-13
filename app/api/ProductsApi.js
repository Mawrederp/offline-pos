import PouchApi from './PouchApi';
import { storage } from '../storage';
import { TELLER_ID } from '../config/teller';

const productsDB = storage.products.db;
const idKey = '_id';
const revKey = '_rev';

class ProductsApi extends PouchApi {
  static async getProduct(productId) {
    try {
      const product = await productsDB.get(productId);
      return product;
    } catch (error) {
      if (error.name === 'not_found') {
        return {};
      }
      throw error;
    }
  }

  static async getAllProducts() {
    try {
      const docs = await productsDB.allDocs({ include_docs: true, binary: true });
      return docs.rows.map((product) => product.doc).reduce((acc, product) => ({ ...acc, [product[idKey]]: product }), {});
    } catch (error) {
      if (error.name === 'not_found') {
        return [];
      }
      throw error;
    }
  }

  static async removeProduct(product) {
    try {
      const resp = await productsDB.remove(product[idKey], product[revKey]);
      return resp;
    } catch (error) {
      throw error;
    }
  }
  readUploadedFileAsText(inputFile) {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsText(inputFile);
    });
  }
  static async setProduct(product) {
    // if product has rev it will update otherwise it will create a new product
    // products ids will take the shape PRODUCT_${product.name) => hence name will be unique
    const prodObj = {
      lastUpdate: Date.now(),
      // _attachments: {
      //   [product.img.name]: {
      //     content_type: product.img.type,
      //     data: product.img,
      //   },
      // },
    };
    if (!product[idKey]) {
      prodObj[idKey] = `PRODUCT_${product.name}`;
      prodObj.createdAt = Date.now();
    }
    try {
      const resp = await productsDB.put({ ...product, ...prodObj });
      return resp;
    } catch (error) {
      if (error.name === 'conflict') {
        const exp = { message: ' موجود مسبقا', name: 'PRODUCT_EXISTS_CONFLICT' };
        throw (exp);
      }
    }
    return prodObj;
  }

}

export default ProductsApi;
