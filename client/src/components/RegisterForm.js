import { Link } from "react-router-dom";
import color from "../assets/color";
export const RegisterForm = ({
  email,
  setEmail,
  password,
  setPassword,
  reEnterPassword,
  setReEnterPassword,
  accountType,
  setAccountType,
  handleSubmit,
  handleTypeChange,
}) => {
  return (
    <div className="row">
      <div className="col-md-12 p-5">
        <div>
          <h1
            style={{
              color: color.primary,
              fontSize: "3rem",
              fontWeight: "bold",
              textAlign: "center",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            KINDLINK
          </h1>
          <h5 className="text-center" style={{ fontWeight: "bold" }}>
            Chào mừng bạn đến với KINDLINK
          </h5>
        </div>
        <form onSubmit={handleSubmit}>
          <div className=" mb-3">
            <label className="mb-1">Email:</label>
            <input
              type="email"
              className="form-control"
              style={{
                borderRadius: "1rem",
                border: "1px solid #ccc",
                padding: "0.8rem",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength="50"
              required
            />
          </div>
          <div className=" mb-3">
            <label className="mb-1">Mật khẩu:</label>
            <input
              type="password"
              className="form-control"
              style={{
                borderRadius: "1rem",
                border: "1px solid #ccc",
                padding: "0.8rem",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength="20"
              required
            />
          </div>
          <div className=" mb-3">
            <label className="mb-1">Nhập lại mật khẩu:</label>
            <input
              type="password"
              className="form-control"
              style={{
                borderRadius: "1rem",
                border: "1px solid #ccc",
                padding: "0.8rem",
              }}
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)}
              maxLength="20"
              required
            />
          </div>
          <div className=" mb-3">
            <label className="mb-1">Chọn loại tài khoản</label>
            <select
              name="type"
              className="form-control"
              style={{
                borderRadius: "1rem",
                border: "1px solid #ccc",
                padding: "0.8rem",
              }}
              value={accountType}
              onChange={handleTypeChange}
            >
              <option value={1}>Tình nguyện viên</option>
              <option value={2}>Tổ chức từ thiện</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              backgroundColor: color.primary,
              color: "#fff",
              borderRadius: "1rem",
              padding: "0.8rem",
              border: "none",
            }}
          >
            Đăng ký
          </button>
        </form>
      </div>
      <div className="card-footer text-center">
        <h6>
          Đã có tài khoản?{" "}
          <Link to="/login" style={{ color: color.primary }}>
            Đăng nhập
          </Link>
        </h6>
      </div>
    </div>
  );
};
