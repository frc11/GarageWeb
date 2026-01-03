import { defineQuery } from "next-sanity";

export const CARS_QUERY = defineQuery(`*[_type == "car"] | order(_createdAt desc) {
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
  fuelType,
  status,
  "images": images[].asset->url,
  description,
  features,
  isOffer
}`);

export const FEATURED_CARS_QUERY = defineQuery(`*[_type == "car" && isFeatured == true] | order(_createdAt desc)[0...6] {
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
  fuelType,
  status,
  "images": images[].asset->url,
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
  fuelType,
  status,
  "images": images[].asset->url,
  description,
  features,
  isOffer
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
  fuelType,
  status,
  "images": images[].asset->url,
  description,
  features,
  isOffer
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
  fuelType,
  status,
  "images": images[].asset->url,
  description,
  features,
  isOffer
}`);
