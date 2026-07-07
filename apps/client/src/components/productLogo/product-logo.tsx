import type { ProductType } from "@repo/common-types";
import styles from "./product-logo.module.scss";
import { useNavigate } from "react-router-dom";

interface ProductLogoProps {
  product: ProductType;
}

export default function ProductLogo(props: ProductLogoProps) {
  const { id, name, price, ratings, imageUrl } = props.product;
  const navigate = useNavigate();

  const averageRating =
    ratings.reduce((sum, rating) => sum + rating) / ratings.length;

  return (
    <div className={styles.productCard}>
      <button
        className={styles.buttonCart}
        onClick={() => {
          navigate("/cart");
        }}
      >
        GO TO CART
      </button>

      <button
        className={styles.buttonCart}
        onClick={() => {
          navigate("/product/" + id);
        }}
      >
        GO TO PRODUCT
      </button>

      <img className={styles.productImage} src={imageUrl} alt={name} />
      <div className={styles.productDetails}>
        <h3 className={styles.productName}>{name}</h3>
        <div className={styles.productMeta}>
          <div className={styles.rating}>
            <div>{averageRating.toFixed(1)}</div>
            <div className={styles.ratingCount}>({ratings.length})</div>
          </div>
          <div className={styles.price}>{price} ש"ח</div>
        </div>
      </div>
    </div>
  );
}
