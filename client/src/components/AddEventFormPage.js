import cityImg from "../assets/img/cityOrg.jpg";
import font from "../assets/font";
import EventForm from "./Form/EventForm";

const AddEventFormPage = () => {
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="p-4">
              <div
                style={{
                  backgroundImage: `url(${cityImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center bottom",
                  position: "relative",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(255, 149, 204, 0.6)",
                    zIndex: 1,
                  }}
                ></div>
                <div style={{ position: "relative", zIndex: 2 }}>
                  <h2
                    className="text-center"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontFamily: font.monsterrat,
                    }}
                  >
                    THÊM SỰ KIỆN
                  </h2>
                  <h6 className="text-center" style={{ color: "white" }}>
                    Vui lòng nhập vào thông tin để thêm sự kiện
                  </h6>
                </div>
              </div>

              <EventForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEventFormPage;
