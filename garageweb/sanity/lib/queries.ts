import { defineQuery } from "next-sanity";

export const CARS_QUERY = defineQuery(`*[_type == "car" && (!defined($brandSlug) || brand == *[_type == "brand" && slug.current == $brandSlug][0].name)] | order(_createdAt desc) {
  "id": _id,
  "slug": slug.current,
  brand,
  model,
  year,
  price,
  originalPrice,
  currency,
  mileage,
  transmission,
  category,
  "coverImage": coverImage[0].asset->url,
  "thumbnailImage": thumbnailImage[0].asset->url,
  "gallery": gallery[].asset->url,
  description,
  features,
  isOffer
}`);

export const FEATURED_CARS_QUERY = defineQuery(`*[_type == "car" && isFeatured == true] | order(_createdAt desc) {
  "id": _id,
  "slug": slug.current,
  brand,
  model,
  year,
  price,
  originalPrice,
  currency,
  mileage,
  transmission,
  category,
  "coverImage": coverImage[0].asset->url,
  "thumbnailImage": thumbnailImage[0].asset->url,
  "gallery": gallery[].asset->url,
  description,
  features,
  isFeatured,
  isOffer
}`);

export const OFFER_CARS_QUERY = defineQuery(`*[_type == "car" && isOffer == true] | order(_createdAt desc)[0...9] {
  "id": _id,
  "slug": slug.current,
  brand,
  model,
  year,
  price,
  originalPrice,
  currency,
  mileage,
  transmission,
  category,
  "coverImage": coverImage[0].asset->url,
  "thumbnailImage": thumbnailImage[0].asset->url,
  "gallery": gallery[].asset->url,
  description,
  features,
  isOffer
}`);

export const OFFERS_QUERY = defineQuery(`*[_type == "car" && (isOffer == true || discount > 0)] | order(_createdAt desc) {
  "id": _id,
  "slug": slug.current,
  brand,
  model,
  year,
  price,
  originalPrice,
  currency,
  mileage,
  transmission,
  category,
  "coverImage": coverImage[0].asset->url,
  "thumbnailImage": thumbnailImage[0].asset->url,
  "gallery": gallery[].asset->url,
  description,
  features,
  isOffer,
  discount
}`);

export const ALL_OFFERS_QUERY = defineQuery(`*[_type == "car" && isOffer == true] | order(_createdAt desc) {
  "id": _id,
  "slug": slug.current,
  brand,
  model,
  year,
  price,
  originalPrice,
  currency,
  mileage,
  transmission,
  category,
  "coverImage": coverImage[0].asset->url,
  "thumbnailImage": thumbnailImage[0].asset->url,
  "gallery": gallery[].asset->url,
  description,
  features,
  isOffer,
  discount
}`);

export const CAR_BY_SLUG_QUERY = defineQuery(`*[_type == "car" && slug.current == $slug][0] {
  "id": _id,
  "slug": slug.current,
  brand,
  model,
  year,
  price,
  originalPrice,
  currency,
  mileage,
  transmission,
  category,
  "coverImage": coverImage[0].asset->url,
  "thumbnailImage": thumbnailImage[0].asset->url,
  "gallery": gallery[].asset->url,
  description,
  features,
  isOffer
}`);

export const BRANDS_QUERY = defineQuery(`*[_type == "brand"] | order(name asc) {
  "id": _id,
  name,
  "slug": slug.current,
  "logo": logo.asset->url
}`);

export const STOCK_BRANDS_QUERY = defineQuery(`*[_type == "brand" && count(*[_type == "car" && brand == ^.name]) > 0] | order(name asc) {
  "id": _id,
  name,
  "slug": slug.current,
  "logo": logo.asset->url
}`);

export const AVAILABLE_BRANDS_QUERY = defineQuery(`array::unique(*[_type == "car"].brand)`);

// Catalog-specific queries for filter data
export const CATALOG_BRANDS_QUERY = defineQuery(`array::unique(*[_type == "car"].brand) | order(@)`);

export const CATALOG_CATEGORIES_QUERY = defineQuery(`array::unique(*[_type == "car" && defined(category)].category) | order(@)`);

