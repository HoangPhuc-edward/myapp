import { useState } from "react";
import axios from "axios";

const IP_WEBCAM_URL = "http://192.168.1.10:8080/shot.jpg"; // đổi theo IP bạn

const CaptureFromIPWebcam = () => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const captureImage = async () => {
    try {
      const response = await fetch(IP_WEBCAM_URL);
      const blob = await response.blob();

      // Hiển thị preview
      const imageUrl = URL.createObjectURL(blob);
      setPreviewUrl(imageUrl);

      // Gửi blob lên server
      const formData = new FormData();
      formData.append("file", blob, "image.jpg");

      await axios.post("http://127.0.0.1:5000/extract_event_info", formData);
      console.log("Gửi thành công");
    } catch (err) {
      console.error("Lỗi khi chụp hoặc gửi ảnh:", err);
    }
  };

  return (
    <div>
      <button onClick={captureImage}>Chụp ảnh từ điện thoại</button>
      {previewUrl && (
        <img src={previewUrl} alt="Ảnh từ điện thoại" width="300" />
      )}
    </div>
  );
};

export default CaptureFromIPWebcam;
