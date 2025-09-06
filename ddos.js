import http from 'k6/http';
import { check, sleep } from 'k6';

// Cấu hình test
export const options = {
  vus: 5000, // số lượng virtual users
  duration: '120s', // thời gian chạy test
};

export default function () {
  // URL API
  const urls = [
    'https://vieclam.ueh.edu.vn/Home/LoadTopCompany',
    'https://vieclam.ueh.edu.vn/Home/LoadTop10JobVip',
    'https://vieclam.ueh.edu.vn/Home/LoadTop10Job',
  ];

  urls.forEach(url => {
    let res = http.post(url, null, {
      headers: { 'Content-Type': 'application/json' },
    });

    // Kiểm tra phản hồi
    check(res, {
      [`${url} status is 200`]: (r) => r.status === 200,
      [`${url} body is not empty`]: (r) => r.body && r.body.length > 0,
    });
  });

  sleep(1); // nghỉ 1s giữa các lượt
}
