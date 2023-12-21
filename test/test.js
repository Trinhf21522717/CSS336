
function removeAccents(str) {
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .replace(/ /g, "");
}
console.log(removeAccents("Vẫn-24k.Right, Hipz, Huỳnh Tú"))