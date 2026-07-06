import Footer from "../footer/footer";
import Header from "../header/header";
import { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import type { ProductType } from "@repo/common-types";
import ProductLogo from "../productLogo/product-logo";
import styles from "./store.module.scss";

const PRODUCTS_QUERY_WITH_FILTERS = gql`
  {
    products(filters: {}) {
      id
      name
      price
      company
      productType
      ratings
      description
      size
      tags
      imageUrl
      isAvailable
      category
    }
  }
`;

const PRODUCTS_QUERY = gql`
  {
    products {
      id
      name
      price
      company
      productType
      ratings
      description
      size
      tags
      imageUrl
      isAvailable
    }
  }
`;

export default function Store() {
  const navigate = useNavigate();
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(3000);

  const { loading, error, data } = useQuery<{ products: ProductType[] }>(
    PRODUCTS_QUERY,
  );
  const [products, setProducts] = useState<ProductType[]>([]);
  const handleFromPrice = (e) => {
    setFromPrice(Number(e.target.value));
  };

  const handleToPrice = (e) => {
    setToPrice(Number(e.target.value));
  };
  const loadData = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      while (loading) {}
      if (data?.products) {
        setProducts(data.products);
      }
    } catch (err) {
      alert("couldnt signUp, with error: " + err);
    }
  };
  return (
    <>
      <Header />
      <div className={styles.store}>
        <div className={styles.filtersArea}>
          <span>תגיות</span>
          <form>
            <div>
              <input type="checkbox" name="Budget" id="" />
              <span>Budget</span>

              <input type="checkbox" name="Pro" id="" />
              <span>Pro</span>

              <input type="checkbox" name="RGB" id="" />
              <span>RGB</span>

              <input type="checkbox" name="Computer" id="" />
              <span>Computer</span>

              <input type="checkbox" name="Laptop" id="" />
              <span>Laptop</span>

              <input type="checkbox" name="Ultra HD" id="" />
              <span>Ultra HD</span>

              <input type="checkbox" name="Wireless" id="" />
              <span>Wireless</span>

              <input type="checkbox" name="Performance" id="" />
              <span>Performance</span>

              <input type="checkbox" name="4K" id="" />
              <span>4K</span>

              <input type="checkbox" name="Fast" id="" />
              <span>Fast</span>

              <input type="checkbox" name="Gaming" id="" />
              <span>Gaming</span>

              <input type="checkbox" name="Compact" id="" />
              <span>Compact</span>
            </div>
            <span>{fromPrice}</span>
            <div className={styles.range_container}>
              <div className={styles.sliders_control}>
                <input
                  type="range"
                  value={fromPrice}
                  min={0}
                  max={toPrice - 1}
                  name=""
                  id=""
                  onChange={handleFromPrice}
                />
                <input
                  type="range"
                  value={toPrice}
                  min={fromPrice + 1}
                  max={3000}
                  name=""
                  id=""
                  onChange={handleToPrice}
                />
              </div>
            </div>

            <span>{toPrice}</span>
            <div>
              <span>מחיר</span>
              <input
                type="number"
                value={fromPrice}
                onChange={handleFromPrice}
              ></input>

              <input
                type="number"
                value={toPrice}
                onChange={handleToPrice}
              ></input>
            </div>
            <span>חברות</span>
            <div>
              <input type="checkbox" name="Corsair" id="" />
              <span>Corsair</span>

              <input type="checkbox" name="HP" id="" />
              <span>HP</span>

              <input type="checkbox" name="Razer" id="" />
              <span>Razer</span>

              <input type="checkbox" name="Intel" id="" />
              <span>Intel</span>

              <input type="checkbox" name="Gigabyte" id="" />
              <span>Gigabyte</span>

              <input type="checkbox" name="Logitech" id="" />
              <span>Logitech</span>

              <input type="checkbox" name="LG" id="" />
              <span>LG</span>

              <input type="checkbox" name="MSI" id="" />
              <span>MSI</span>

              <input type="checkbox" name="Samsung" id="" />
              <span>Samsung</span>

              <input type="checkbox" name="Canon" id="" />
              <span>Canon</span>

              <input type="checkbox" name="AMD" id="" />
              <span>AMD</span>
            </div>
          </form>
        </div>

        <div className={styles.productsBox}>
          {products?.map((product: ProductType) => (
            <ProductLogo key={product.id} product={product}></ProductLogo>
          ))}

          <button onClick={loadData}>CLICK ME</button>
        </div>
      </div>

      <Footer />
    </>
  );
}
