/**
 * Function to fetch the reservation list
 * @returns reservationList object
 */
export async function getReservationList() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const reservationList = await fetch("/api/v1/reservation", requestOptions);
  return await reservationList.json();
}
