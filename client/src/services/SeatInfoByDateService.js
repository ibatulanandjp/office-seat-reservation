/**
 * Function to fetch the seat information for a specific date
 * @returns seatInfo object
 */
export async function getSeatInfoByDate(date) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const url = `/api/v1/seat/${date}`;
  const seatInfoByDate = await fetch(url, requestOptions);
  return await seatInfoByDate.json();
}