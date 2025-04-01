import { Link } from "react-router-dom";
import color from "../../assets/color";

export const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  accountType,
  handleTypeChange,
  handleSubmit,
}) => {
  return (
    <div className="row ms-5 mt-5">
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
            Chào mừng bạn quay trở lại với KINDLINK
          </h5>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label htmlFor="email" className="mb-1">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              style={{
                borderRadius: "1rem",
                border: "1px solid #ccc",
                padding: "0.8rem",
              }}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="mb-1">
              Mật khẩu:
            </label>
            <input
              type="password"
              className="form-control"
              style={{
                borderRadius: "1rem",
                border: "1px solid #ccc",
                padding: "0.8rem",
              }}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
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
            Đăng nhập
          </button>
        </form>

        <div className="text-center mt-3">
          <h6>
            Chưa có tài khoản?{" "}
            <Link to="/register" style={{ color: color.primary }}>
              Đăng ký
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
};
