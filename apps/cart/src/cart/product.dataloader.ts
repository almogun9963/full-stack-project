// import DataLoader from "dataloader";
// import { Injectable, Scope } from "@nestjs/common";
// import { ProductType } from "@repo/common-types";
// import { ProductsService } from "../../../product/src/products/products.service";

// @Injectable({ scope: Scope.REQUEST })
// export class ProductDataLoader {
//   constructor(private productService: ProductsService) {}

//   createLoader() {
//     return new DataLoader<string, ProductType>(
//       async (productIds: readonly string[]) => {
//         const products = await Promise.all(
//           productIds.map((id) => this.productService.getProductById(id)),
//         );

//         return products;
//       },
//     );
//   }
// }
