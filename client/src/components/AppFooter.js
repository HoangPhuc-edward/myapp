import React from "react";

const AppFooter = () => {
  return (
    <footer
      style={{
        width: "100%",
      }}
      className="footer bg-light text-dark py-3 px-5 mt-5 d-flex flex-row justify-content-between align-items-center"
    >
      <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
      <div className="d-flex flex-row">
        <p className="px-3">Điều khoản dịch vụ</p>
        <p className="px-3">Chính sách bảo mật</p>
        <p className="px-3">Phiên bản 1.0.0</p>
        <p className="px-3">&copy; KINDLINK</p>
      </div>
    </footer>
  );
};

export default AppFooter;
