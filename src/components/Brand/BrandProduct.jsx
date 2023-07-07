import { Link } from 'react-router-dom';
import { API_URL } from "actions/constants/constants";
import React from "react";

export default function BrandProduct(props) {
    const {brand} = props;
  return (
    <div className="right--inner">
      <div className="seller-info">
        <div className="overview-right center-item">
          <span className="seller-name">
            <span>Thương hiệu: {brand.name}</span>
          </span>
        </div>
      </div>
      <div className="seller-action ">
        <Link
          className="action"
          to={`/thuong-hieu/${brand.code}`}
        >
          <img
            src="https://salt.tikicdn.com/ts/upload/49/27/ff/d735c33edfdc6cf6aeb6e183bec28869.png"
            alt=""
          />
          <span>Xem thêm</span>
        </Link>
      </div>

      <div className="seller-benefit">
        <div className="benefit-item">
          <img
            alt="compensation-icon"
            src={`${API_URL}/images/compensation.png`}
            height={20}
            width="auto"
          />
          <span>
            Hoàn tiền
            <br />
            <b>111%</b>
            <br />
            nếu hàng giả
          </span>
        </div>
        <div className="benefit-item">
          <img
            alt="guarantee-icon"
            src={`${API_URL}/images/guarantee.png`}
            height={20}
            width="auto"
          />
          <span>
            {" "}
            Mở hộp
            <br />
            kiểm tra
            <br />
            nhận hàng{" "}
          </span>
        </div>
        <div className="benefit-item">
          <img
            alt="refund-icon"
            src={`${API_URL}/images/refund.png`}
            height={20}
            width="auto"
          />
          <span>
            Đổi trả trong
            <br />
            <b>30 ngày</b>
            <br />
            nếu sp lỗi
          </span>
        </div>
      </div>
    </div>
  );
}
