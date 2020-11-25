import http from 'k6/http';
import { Counter, Gauge, Rate, Trend } from "k6/metrics";
import { check } from "k6";

export let options = {
    vus: 100,
    duration: '30s',
  };

let myCounter = new Counter("my_counter");
let myGauge = new Gauge("my_gauge");
let myRate = new Rate("my_rate");
let myTrend = new Trend("my_trend");


let maxResponseTime = 0.0;

export default function () {
  var url = 'https://cdms-dashboard-api-dev.jba.co.id/v2/branch/list';
  var params = {
    headers: {
      'Authorization': 'Bearer eyJpdiI6IllsVFRQNFNWeWVZellrMmRmSUxXdWc9PSIsInZhbHVlIjoiQ2pTUzZEWGVVNDhcL255YmZkMGRiZmVtdnNiSjU2ZFVCbFNHbG9kenQyaUE9IiwibWFjIjoiZDAzMjkxYmQ4NDZjMDQwZTA5NTBhOTdhYTgzODY1ZjRmNDdhMzIxNzk4MDJjMWYzY2Q5ZjRhNTk0NDQ2YTMzZiJ9',
    },
  };
  let res = http.get(url, params);
  
  let passed = check(res, { "status is 200": (r) => r.status === 200 });

    // Add one for number of requests
    myCounter.add(1);

    // Set max response time seen
    maxResponseTime = Math.max(maxResponseTime, res.timings.duration);
    myGauge.add(maxResponseTime);

    // Add check success or failure to keep track of rate
    myRate.add(passed);

    // Keep track of DNS+TCP-connecting part of the response time
    myTrend.add(res.timings.looking_up + res.timings.connecting);
}