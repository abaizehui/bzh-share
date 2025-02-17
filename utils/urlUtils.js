const baseUrl = 'https://www.abaizh.com';

function appendBaseUrlToImages(dataArray) {
    if (!dataArray || dataArray.length === 0) {
        return [];
    }
  return dataArray.map(item => {
    item.imageUrl = baseUrl + item.imageUrl; // 拼接域名
    return item;
  });
}

function appendBaseUrlToImage(imageUrl) {
    return  baseUrl + imageUrl; // 拼接域名
}

module.exports = {
  appendBaseUrlToImages,
  appendBaseUrlToImage
};