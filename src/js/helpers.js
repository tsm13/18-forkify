import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPromise = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok)
      throw new Error(
        `Error fetching recipe. (API error ${res.status}) ${data.message}`
      );
    return data;
  } catch (err) {
    throw err; // rethrowing so that the function calling this one can handle the error (Promise won't reject)
  }
};

// export const getJSON = async function (url) {
//   try {
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok)
//       throw new Error(
//         `Error fetching recipe. (API error ${res.status}) ${data.message}`
//       );
//     return data;
//   } catch (err) {
//     throw err; // rethrowing so that the function calling this one can handle the error (Promise won't reject)
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok)
//       throw new Error(
//         `Error fetching recipe. (API error ${res.status}) ${data.message}`
//       );
//     return data;
//   } catch (err) {
//     throw err; // rethrowing so that the function calling this one can handle the error (Promise won't reject)
//   }
// };
