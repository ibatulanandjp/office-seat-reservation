/**
 * Function to fetch the reservation list for a specific date
 * @returns reservationList object
 */
export async function getReservationListByDate(date) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const url = `api/v1/reservation/${date}`;
  const reservationList = await fetch(url, requestOptions);
  return await reservationList.json();
}
