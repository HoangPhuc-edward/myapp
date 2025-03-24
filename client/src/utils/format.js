const jsonToNameValueTuple = (json) => {
  const result = {
    name: "(",
    value: "(",
  };
  result.name += Object.keys(json).join(", ") + ")";
  result.value +=
    Object.values(json)
      .map((value) => (typeof value === "string" ? `"${value}"` : value))
      .join(", ") + ")";
  return result;
};

const formatProvince = ({ province, district, ward }) => {
  return `${province.DonVi} ${province.Ten}`;
};

const formatDistrict = ({ province, district, ward }) => {
  return `${district.DonVi} ${district.Ten}`;
};

const formatWard = ({ province, district, ward }) => {
  return `${ward.DonVi} ${ward.Ten}`;
};

const formatAddress = ({ province, district, ward }) => {
  return `${ward.DonVi} ${ward.Ten}, ${district.DonVi} ${district.Ten}, ${province.DonVi} ${province.Ten}`;
};

const formatFullAddress = ({ SoNha, TenDuong, province, district, ward }) => {
  return `${SoNha}, ${TenDuong}, ${ward.DonVi} ${ward.Ten}, ${district.DonVi} ${district.Ten}, ${province.DonVi} ${province.Ten}`;
};

const formatDateTime = (datetime) => {
  const result = datetime.split("T")[0];
  const result1 = result.split("-");
  return `${result1[2]}-${result1[1]}-${result1[0]}`;
};

export {
  jsonToNameValueTuple,
  formatAddress,
  formatProvince,
  formatDistrict,
  formatWard,
  formatDateTime,
  formatFullAddress,
};
