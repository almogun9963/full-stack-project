import Footer from "../footer/footer";
import Header from "../header/header";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import type { ProductType } from "@repo/common-types";
import ProductLogo from "../productLogo/product-logo";
import styles from "./store.module.scss";

const PRODUCTS_QUERY_WITH_FILTERS = gql`
  query GetProducts($filters: FiltersProductInput!) {
    products(filters: $filters) {
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
  const [tags, setTags] = useState<string[]>([]);
  const [company, setCompany] = useState("");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(3000);

  const { loading, error, data } = useQuery<{ products: ProductType[] }>(
    PRODUCTS_QUERY_WITH_FILTERS,
    {
      variables: {
        filters: {
          price: { from: fromPrice, to: toPrice },
          ...(tags.length > 0 ? { tags } : {}),
          ...(company ? { company } : {}),
        },
      },
    },
  );

  const [products, setProducts] = useState<ProductType[]>([]);

  const handleTagsCheckbox = (e, tagName: string) => {
    if (e.target.checked) {
      setTags([...tags, tagName]);
    } else {
      setTags(tags.filter((item) => item !== tagName));
    }
  };

  const handleCompanyCheckbox = (e, companyName: string) => {
    if (e.target.checked) {
      setCompany(companyName);
    } else {
      setCompany("");
    }
  };

  useEffect(() => {
    setProducts(data?.products);
  }, [data]);

  return (
    <>
      <Header />
      <div className={styles.store}>
        <div className={styles.filtersArea}>
          <span>תגיות</span>
          <form>
            <div>
              <input
                type="checkbox"
                name="Budget"
                id=""
                onClick={(e) => {
                  handleTagsCheckbox(e, "Budget");
                }}
              />
              <span>Budget</span>

              <input
                type="checkbox"
                name="Pro"
                id=""
                onClick={(e) => {
                  handleTagsCheckbox(e, "Pro");
                }}
              />
              <span>Pro</span>

              <input
                type="checkbox"
                name="RGB"
                id=""
                onClick={(e) => {
                  handleTagsCheckbox(e, "RGB");
                }}
              />

              <input
                type="checkbox"
                name="Computer"
                id=""
                onClick={(e) => {
                  handleTagsCheckbox(e, "Computer");
                }}
              />
              <span>Computer</span>

              <input
                type="checkbox"
                name="Laptop"
                id=""
                onClick={(e) => {
                  handleTagsCheckbox(e, "Laptop");
                }}
              />
              <span>Laptop</span>

              <input
                type="checkbox"
                name="Ultra HD"
                id=""
                onClick={(e) => {
                  handleTagsCheckbox(e, "UltraHD");
                }}
              />
              <span>Ultra HD</span>

              <input
                type="checkbox"
                name="Wireless"
                id=""
                onClick={(e) => {
                  handleTagsCheckbox(e, "Wireless");
                }}
              />
              <span>Wireless</span>

              <input
                type="checkbox"
                name="Performance"
                id=""
                onClick={(e) => {
                  handleTagsCheckbox(e, "Performance");
                }}
              />
              <span>Performance</span>

              <input
                type="checkbox"
                name="4K"
                id=""
                onClick={(e) => {
                  handleTagsCheckbox(e, "FourK");
                }}
              />
              <span>4K</span>

              <input
                type="checkbox"
                name="Fast"
                id=""
                onClick={(e) => {
                  handleTagsCheckbox(e, "Fast");
                }}
              />
              <span>Fast</span>

              <input
                type="checkbox"
                name="Gaming"
                id=""
                onClick={(e) => {
                  handleTagsCheckbox(e, "Gaming");
                }}
              />
              <span>Gaming</span>

              <input
                type="checkbox"
                name="Compact"
                id=""
                onClick={(e) => {
                  handleTagsCheckbox(e, "Compact");
                }}
              />
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
                  onChange={(e) => setFromPrice(Number(e.target.value))}
                />
                <input
                  type="range"
                  value={toPrice}
                  min={fromPrice + 1}
                  max={3000}
                  name=""
                  id=""
                  onChange={(e) => {
                    setToPrice(Number(e.target.value));
                  }}
                />
              </div>
            </div>

            <span>{toPrice}</span>
            <div>
              <span>מחיר</span>
              <input
                type="number"
                value={fromPrice}
                onChange={(e) => setFromPrice(Number(e.target.value))}
              ></input>

              <input
                type="number"
                value={toPrice}
                onChange={(e) => {
                  setToPrice(Number(e.target.value));
                }}
              ></input>
            </div>
            <span>חברות</span>
            <div>
              <input
                type="checkbox"
                name="Corsair"
                id=""
                onClick={(e) => {
                  handleCompanyCheckbox(e, "Corsair");
                }}
              />
              <span>Corsair</span>

              <input
                type="checkbox"
                name="HP"
                id=""
                onClick={(e) => {
                  handleCompanyCheckbox(e, "HP");
                }}
              />
              <span>HP</span>

              <input
                type="checkbox"
                name="Razer"
                id=""
                onClick={(e) => {
                  handleCompanyCheckbox(e, "Razer");
                }}
              />
              <span>Razer</span>

              <input
                type="checkbox"
                name="Intel"
                id=""
                onClick={(e) => {
                  handleCompanyCheckbox(e, "Intel");
                }}
              />
              <span>Intel</span>

              <input
                type="checkbox"
                name="Gigabyte"
                id=""
                onClick={(e) => {
                  handleCompanyCheckbox(e, "Gigabyte");
                }}
              />
              <span>Gigabyte</span>

              <input
                type="checkbox"
                name="Logitech"
                id=""
                onClick={(e) => {
                  handleCompanyCheckbox(e, "Logitech");
                }}
              />
              <span>Logitech</span>

              <input
                type="checkbox"
                name="LG"
                id=""
                onClick={(e) => {
                  handleCompanyCheckbox(e, "LG");
                }}
              />
              <span>LG</span>

              <input
                type="checkbox"
                name="MSI"
                id=""
                onClick={(e) => {
                  handleCompanyCheckbox(e, "MSI");
                }}
              />
              <span>MSI</span>

              <input
                type="checkbox"
                name="Samsung"
                id=""
                onClick={(e) => {
                  handleCompanyCheckbox(e, "Samsung");
                }}
              />
              <span>Samsung</span>

              <input
                type="checkbox"
                name="Canon"
                id=""
                onClick={(e) => {
                  handleCompanyCheckbox(e, "Canon");
                }}
              />
              <span>Canon</span>

              <input
                type="checkbox"
                name="AMD"
                id=""
                onClick={(e) => {
                  handleCompanyCheckbox(e, "AMD");
                }}
              />
              <span>AMD</span>
            </div>
          </form>
        </div>

        <div className={styles.productsBox}>
          {products?.map((product: ProductType) => (
            <ProductLogo key={product.id} product={product}></ProductLogo>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
