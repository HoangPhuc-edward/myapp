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

const formatDate = (datetime) => {
  const result = datetime.split("T")[0];
  const result1 = result.split("-");
  return `${result1[2]}-${result1[1]}-${result1[0]}T00:00`;
};

const getCurrentDateTime = () => {
  const now = new Date();
  return now
    .toLocaleString("en-CA", {
      timeZone: "Asia/Ho_Chi_Minh",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(",", "");
};

export {
  jsonToNameValueTuple,
  formatAddress,
  formatProvince,
  formatDistrict,
  formatWard,
  formatDateTime,
  formatFullAddress,
  formatDate,
  getCurrentDateTime,
};
