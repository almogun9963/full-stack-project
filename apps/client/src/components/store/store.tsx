import Footer from "../footer/footer";
import Header from "../header/header";
import { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import type { ProductType } from "@repo/common-types";
import ProductLogo from "../productLogo/product-logo";

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
  const { loading, error, data } = useQuery<{ products: ProductType[] }>(
    PRODUCTS_QUERY,
    {
      variables: { language: "english" },
    },
  );
  const [products, setProducts] = useState<ProductType[]>([]);

  const handleSignUp = async (e: { preventDefault: () => void }) => {
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
      <div>
        {products?.map((product: ProductType) => (
          <ProductLogo key={product.id} product={product}></ProductLogo>
        ))}

        <button onClick={handleSignUp}>CLICK ME</button>
      </div>
      <Footer />
    </>
  );
}
