/*
  Warnings:

  - A unique constraint covering the columns `[customerId,productId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cart_customerId_productId_key" ON "Cart"("customerId", "productId");
