/**
 * Function to fetch the active reservation count for a specific date
 * @returns activeReservationCount
 */
export async function getActiveReservationCountByDate(date) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const url = `api/v1/reservation/count/${date}`;
  const reservationCount = await fetch(url, requestOptions);
  const obj = await reservationCount.json();
  return await obj[0].active_reservation_count;
}
