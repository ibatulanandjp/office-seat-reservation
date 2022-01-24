/**
 * Function to fetch the seat information
 * @returns seatInfo object
 */
export async function getSeatInfo() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const seatInfo = await fetch("/api/v1/seat", requestOptions);
  return await seatInfo.json();
}
