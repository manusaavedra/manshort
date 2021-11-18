/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortURL]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Url_url_key" ON "Url"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortURL_key" ON "Url"("shortURL");
