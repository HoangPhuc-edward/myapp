import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getDataByTableName } from '../../api/api';

const OrgHome = () => {
    const [content, setContent] = useState('Home');
    const [events, setEvents] = useState([]);

    const handleNavClick = async (section) => {
        setContent(section);
    };

    useEffect(() => {
        getDataByTableName('SU_KIEN').then((data) => {
            setEvents(data);
        });
    }, []);


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <div className="list-group">
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${content === 'Home' ? 'active' : ''}`}
                            onClick={() => handleNavClick('Home')}
                            style={{ cursor: 'pointer' }}
                        >
                            Trang chủ
                        </button>
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${content === 'About' ? 'active' : ''}`}
                            onClick={() => handleNavClick('About')}
                            style={{ cursor: 'pointer' }}
                        >
                            Thông tin tổ chức
                        </button>
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${content === 'Services' ? 'active' : ''}`}
                            onClick={() => handleNavClick('Services')}
                            style={{ cursor: 'pointer' }}
                        >
                            Cài đặt
                        </button>
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${content === 'Contact' ? 'active' : ''}`}
                            onClick={() => handleNavClick('Contact')}
                            style={{ cursor: 'pointer' }}
                        >
                            Trợ giúp
                        </button>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="content">
                        {content === 'Home' && <div>
                            <h1>TỔNG HỢP SỰ KIỆN</h1>
                            {events.map((event) => (
                                <div key={event.MaSuKien} className="card mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">{event.TenSuKien}</h5>
                                        <p className="card-text text-truncate" style={{ maxHeight: '3em', overflow: 'hidden' }}>
                                            {event.MieuTa}
                                        </p>
                                        <p className="card-text">
                                            <small className="text-muted">Ngày bắt đầu: {event.NgayBatDau.split('T')[0]}</small><br />
                                            <small className="text-muted">Ngày kết thúc: {event.NgayKetThuc.split('T')[0]}</small><br />
                                            <small className="text-muted">Số lượng: {event.SoLuongToiDa}</small>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>}
                        {content === 'About' && <div>About Content</div>}
                        {content === 'Services' && <div>Services Content</div>}
                        {content === 'Contact' && <div>Contact Content</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrgHome;