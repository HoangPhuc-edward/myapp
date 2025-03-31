import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import font from "../assets/font";
import {
  faIdCard,
  faLock,
  faMailBulk,
} from "@fortawesome/free-solid-svg-icons";
import color from "../assets/color";

const OrgAboutPage = ({ org }) => {
  return (
    <div className="container">
      <h1
        className="title my-3"
        style={{ fontWeight: "bold", fontFamily: font.monsterrat }}
      >
        THÔNG TIN TỔ CHỨC
      </h1>
      <div className="row">
        <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
          <div
            style={{
              backgroundImage: `url(${org?.HinhAnh})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "4rem",
              height: "4rem",
              borderRadius: "50%",
            }}
          ></div>
          <h4
            className="mt-3"
            style={{
              fontWeight: "bold",
              fontFamily: font.monsterrat,
            }}
          >
            {org?.Ten}
          </h4>
          <h6>Chào mừng tổ chức</h6>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-8 border p-4" style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 30,
              right: 30,
            }}
          >
            <FontAwesomeIcon
              icon={faIdCard}
              style={{ fontSize: "2rem" }}
              color={color.primary}
            />
          </div>

          <h5 style={{ fontWeight: "bold" }}>Miêu tả</h5>
          <span>{org?.MieuTa}</span>

          <h5 className="mt-4" style={{ fontWeight: "bold" }}>
            Số điện thoại
          </h5>
          <span>{org?.SDT}</span>

          <h5 className="mt-4" style={{ fontWeight: "bold" }}>
            Địa chỉ
          </h5>
          <span>{org.DiaChi}</span>
        </div>
        <div className="col-md-4">
          <div className="border p-4" style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: 30,
                right: 30,
              }}
            >
              <FontAwesomeIcon
                icon={faMailBulk}
                style={{ fontSize: "2rem" }}
                color={color.primary}
              />
            </div>

            <h5 style={{ fontWeight: "bold" }}>Email</h5>
            <span>{org?.Email}</span>
          </div>

          <div
            className="border p-4"
            style={{
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 30,
                right: 30,
              }}
            >
              <FontAwesomeIcon
                icon={faLock}
                style={{ fontSize: "2rem" }}
                color={color.primary}
              />
            </div>

            <h5 style={{ fontWeight: "bold" }}>Mật khẩu</h5>
            <span>*******</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgAboutPage;
