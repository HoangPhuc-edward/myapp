import { Link } from "react-router-dom";

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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Đăng ký</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength="50"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Mật khẩu:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength="20"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Nhập lại mật khẩu:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={reEnterPassword}
                    onChange={(e) => setReEnterPassword(e.target.value)}
                    maxLength="20"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Chọn loại tài khoản</label>
                  <select
                    name="type"
                    className="form-control"
                    value={accountType}
                    onChange={handleTypeChange}
                  >
                    <option value={1}>Tình nguyện viên</option>
                    <option value={2}>Tổ chức từ thiện</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Đăng ký
                </button>
              </form>
            </div>
            <div className="card-footer text-center">
              <p>
                Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
