import postgres from "postgres";

const sql = postgres("postgres://postgres:postgres123@localhost:5432");

subToChange()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

async function subToChange() {
  const { unsubscribe } = await sql.subscribe(
    "insert:notification",
    (row, { command, relation }) => {
      // Callback function for each row change
      // tell about new event row over eg. websockets or do something else
      console.log(command);
      console.log(row);
    },
    () => {
      // Callback on initial connect and potential reconnects
      console.log("Connected");
    }
  );
}

// getNotification()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => console.log(err));

async function getNotification() {
  const data = await sql`select * from notification`;
  return data;
}
