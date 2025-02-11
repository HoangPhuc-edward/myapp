import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { jsonToNameValueTuple } from '../../utils/utils';
import { addValuesToDB } from '../../api/api';
import { useParams } from 'react-router-dom';

const OrgInfo = () => {
    const { id } = useParams();

    const [provincesList, setProvincesList] = useState([]);
    const [districtsList, setDistrictsList] = useState([]);
    const [wardsList, getWardsList] = useState([]);

    const [formData, setFormData] = useState({
        Ten: '',
        SDT: '',
        MieuTa: '',
        
        SoNha: '',
        TenDuong: '',
        KhuVuc: '',

        MaPhuongXa: '',
        district: '',
        city: ''
    });

    

    const addOrgToDatabase = async (formData) => {
        
        // Them Dia Chi va Lay ID
        const addressData = {
            SoNha: formData.SoNha,
            TenDuong: formData.TenDuong,
            KhuVuc: formData.KhuVuc,
            MaPhuongXa: formData.MaPhuongXa
        };

        const addressTuple = jsonToNameValueTuple(addressData);
        const addressBody = {
            table_name: 'DIA_CHI',
            attributes: addressTuple.name,
            values: addressTuple.value
        }

        const addressId = await addValuesToDB(addressBody.table_name, addressBody.attributes, addressBody.values);
        
        const orgData = {
            Ten: formData.Ten,
            SDT: formData.SDT,
            MieuTa: formData.MieuTa,
            MaTaiKhoan: id,
            MaDiaChi: addressId,
        };

        const orgTuple = jsonToNameValueTuple(orgData);
        const orgBody = {
            table_name: 'TO_CHUC',
            attributes: orgTuple.name,
            values: orgTuple.value
        }

        const userId = await addValuesToDB(orgBody.table_name, orgBody.attributes, orgBody.values);
        if (userId) 
            alert(`Đăng ký tài khoản thành công: ${userId}`);    
        else 
            alert('Lỗi đăng ký tài khoản!');    
    }


    const fetchProvincesList = async () => {
        fetch('http://localhost:5000/provinces')
        .then(response => response.json())
        .then(data => {
            setProvincesList(data.map(province => province));
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const fetchDistrictsList = async (province) => {
        fetch(`http://localhost:5000/districts/${province}`)
        .then(response => response.json())
        .then(data => {
            setDistrictsList(data.map(district => district));
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    
    const fetchwardsList = async (district) => {
        fetch(`http://localhost:5000/wards/${district}`)
        .then(response => response.json())
        .then(data => {
            getWardsList(data.map(ward => ward));
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    useEffect(() => { fetchProvincesList();}, []);
    useEffect(() => { fetchDistrictsList(formData.city); }, [formData.city]);
    useEffect(() => { fetchwardsList(formData.district); }, [formData.district]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        addOrgToDatabase(formData);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-center">Thông tin tổ chức</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Tên tổ chức</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="Ten"
                                        value={formData.Ten}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Miêu tả tổ chức</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="MieuTa"
                                        value={formData.MieuTa}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Số điện thoại:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="SDT"
                                        value={formData.SDT}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Số nhà</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="SoNha"
                                        value={formData.SoNha}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tên đường</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="TenDuong"
                                        value={formData.TenDuong}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Khu vực</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="KhuVuc"
                                        value={formData.KhuVuc}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tỉnh/Thành phố</label>
                                    <select
                                        className="form-select"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Chọn tỉnh/thành phố</option>
                                        {provincesList.map(province => (
                                            <option key={province.MaSo} value={province.MaSo}>{province.Ten}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Quận/Huyện</label>
                                    <select
                                        className="form-select"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Chọn quận/huyện</option>
                                        {districtsList.map(district => (
                                            <option key={district.MaSo} value={district.MaSo}>{district.Ten}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" >Xã/Phường</label>
                                    <select
                                        className="form-select"
                                        name="MaPhuongXa" value={formData.MaPhuongXa} onChange={handleChange} required>
                                        <option value="">Chọn xã/phường</option>
                                        {wardsList.map(ward => (
                                            <option key={ward.MaSo} value={ward.MaSo}>{ward.Ten}</option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Lưu thông tin</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrgInfo;