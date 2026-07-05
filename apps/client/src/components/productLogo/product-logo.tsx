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
  const roundedRating = Math.round(averageRating);

  return (
    <article className={styles.productCard}>
      <img
        className={styles.productImage}
        src={imageUrl}
        alt={name}
        loading="lazy"
      />
      <div className={styles.productDetails}>
        <h3 className={styles.productName}>{name}</h3>
        <div className={styles.productMeta}>
          <div className={styles.rating}>
            <span className={styles.stars}>{roundedRating}</span>
            <span className={styles.ratingCount}>({ratings.length})</span>
          </div>
          <div className={styles.price}>{price} ש"ח</div>
        </div>
      </div>
    </article>
  );
}
