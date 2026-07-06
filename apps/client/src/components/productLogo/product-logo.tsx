import type { ProductType } from "@repo/common-types";
import styles from "./product-logo.module.scss";

interface ProductLogoProps {
  product: ProductType;
}

export default function ProductLogo(props: ProductLogoProps) {
  const { name, price, ratings, imageUrl } = props.product;

  const averageRating = ratings?.length
    ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
    : 0;

  return (
    <div className={styles.productCard}>
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
