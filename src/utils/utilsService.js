/**
 * Mock method to simulate async call
 *
 * @param val {any}
 * @param time {Number}
 * @return {Promise<any>}
 */
export const wait = (time = 500, val = true) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(val)
    }, time)
  })
