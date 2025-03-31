import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import color from "../../assets/color";

const Intro = () => {
  const navigate = useNavigate();
  return (
    <div className="position-relative vh-100 d-flex flex-column justify-content-center align-items-center text-white bg-dark">
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1461532257246-777de18cd58b?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(50%)",
          border: "1px solid black",
        }}
      ></div>

      <div className="position-relative text-center">
        <h1 className="display-4 fw-bold">KINDLINK</h1>
        <h3 className="display-4 fw-bold" style={{ color: color.lightPrimary }}>
          Kết Nối - Chia Sẻ - Lan Tỏa
        </h3>

        <p className="lead" style={{ marginBottom: "4rem" }}>
          Mạng xã hội dành riêng cho tình nguyện viên - nơi kết nối những trái
          tim nhân ái!
        </p>
        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-primary btn-lg"
              style={{
                backgroundColor: color.primary,
                border: "none",
                padding: "1rem 5rem",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Tham gia ngay
            </button>
          </div>

          <div className="col-md-6">
            <button
              className="btn btn-lg"
              style={{
                backgroundColor: "none",
                border: "white 2px solid",
                padding: "1rem 5rem",
                color: "white",
              }}
              onClick={() => {
                navigate("/register");
              }}
            >
              Tạo tài khoản mới
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
