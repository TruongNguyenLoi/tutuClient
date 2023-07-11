import React, { useEffect } from 'react';

const FptAiScript = () => {
  useEffect(() => {
    // Tạo một thẻ script
    const script = document.createElement('script');
  
    // Thiết lập thuộc tính src để trỏ đến script FPT AI
    script.src = 'D:/TutuFinal/tutuClient/script';
  
    // Thêm script vào thẻ <head> của trang
    document.head.appendChild(script);
  
    // Xóa script khi component bị hủy
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default FptAiScript;