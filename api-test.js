import http from 'k6/http';
import { Counter, Gauge, Rate, Trend } from "k6/metrics";
import { check, group, sleep} from "k6";

export let options = {
    stages: [
      { duration: '2m', target: 100 }, // below normal load
      { duration: '5m', target: 100 },
      { duration: '2m', target: 200 }, // normal load
      { duration: '5m', target: 200 },
      { duration: '2m', target: 300 }, // around the breaking point
      { duration: '5m', target: 300 },
      { duration: '2m', target: 400 }, // beyond the breaking point
      { duration: '5m', target: 400 },
      { duration: '10m', target: 0 }, // scale down. Recovery stage.
    ],
  };

const BASE_URL = 'https://cdms-dashboard-api-dev.jba.co.id/v2';


export default () => {
    var params = {
        headers: {
          'Authorization': 'Bearer eyJpdiI6IllsVFRQNFNWeWVZelhslrMmRmSUxXdWc9PSIsInZhbHVlIjoiQ2pTUzZEWGVVNDhcL255YmZkMGRiZmVtdnNiSjU2ZFVCbFNHbG9kenQyaUE9IiwibWFjIjoiZDAzMjkxYmQ4NDZjMDQwZTA5NTBhOTdhYTgzODY1ZjRmNDdhIxNzk4MDJjMWYzY2Q5ZjRhNTk0NDQ2YTMzZiJ9',
        },
      };


    group('Cek Branch List', () => {
      let URL = `${BASE_URL}/branch/list`;
      const res = http.get(URL, params);
      check(res, { "status is 200": (r) => r.status === 200 });

      sleep(1);

    });

    group('Test Branch Location List', () => {
        let URL = `${BASE_URL}/branchlocation/list`;
        const res = http.get(URL, params);
        check(res, { "status is 200": (r) => r.status === 200 });
  
        sleep(1);
  
      });

    group('Test Seller List', () => {
        let URL = `${BASE_URL}/seller/list`;
        const res = http.get(URL, params);
        check(res, { "status is 200": (r) => r.status === 200 });
  
        sleep(1);
  
      });

    group('Auction Schedule List', () => {
        let URL = `${BASE_URL}/auction/schedule/2020-10-01/2020-10-31`;
        const res = http.get(URL, params);
        check(res, { "status is 200": (r) => r.status === 200 });
  
        sleep(1);
  
      });

    group('Summary Seller', () => {
        let URL = `${BASE_URL}/summary/seller/3/stock/location/2020-10-01/2020-10-31/717`;
        const res = http.get(URL, params);
        check(res, { "status is 200": (r) => r.status === 200 });
  
        sleep(1);
  
      });
    
}

