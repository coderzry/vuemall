import { request } from "./request";

export function getCategory() {
  return request({
    url: "/category"
  });
}

// export function getCategoryInfo(maitKey) {
//   return request({
//     url: "/subcategory",
//     params: {
//       maitKey
//     }
//   });
// }

export function getSubcategory(maitKey) {
  return request({
    url: "/subcategory",
    params: {
      maitKey
    }
  }).catch(err => err);
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: "/subcategory/detail",
    params: {
      miniWallkey,
      type
    }
  }).catch(err => err);
}