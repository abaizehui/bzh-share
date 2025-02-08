const baseUrl = 'https://www.abaizh.com';

function appendBaseUrlToImages(dataArray) {
  return dataArray.data.map(item => {
    item.imageUrl = baseUrl + item.imageUrl; // 拼接域名
    return item;
  });
}

module.exports = {
  appendBaseUrlToImages
};