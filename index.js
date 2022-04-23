function isValidMessage(string) {
  if (!string || string.length === 0)
    // store to log before failed message return
    return {
      code: 400,
      message: "Message cannot be empty",
      date: date(),
    };
  if (typeof string !== "string")
    // store to log failed message before return
    return {
      status: 400,
      message: `Invalid message. Message must be string. Receive ${typeof string}`,
      date: date(),
    };
  if (!string.match("-"))
    // store to log before failed message return
    return {
      code: 400,
      message: "Format message invalid",
      date: date(),
    };
  if (string.length > 64)
    // store to log failed message before return
    return {
      code: 400,
      message: "Message to long",
      date: date(),
    };
  const message_parts = string.split("-");
  if (message_parts.length !== 3)
    // store to log failed message before return
    return {
      code: 400,
      message: "Invalid format message. Please check valid message.",
      date: date(),
    };
  const name = message_parts[1];
  const resi_pembayaran = isValidResiPembayaran(message_parts[2]);
  if (!resi_pembayaran)
    // store to log failed message before return
    return {
      code: 400,
      message: "Invalid resi pembayaran",
    };
  return {
    // store to log message success before return
    code: 200,
    message: "success",
    buyer: {
      name: name,
      resi_pembayaran: message_parts[2],
    },
    date: date(),
  };
}
function isValidResiPembayaran(no_resi) {
  if (no_resi === "kmzway87aa") {
    return true;
  }

  return false;
}
function date() {
  const date = new Date();

  let hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  let min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  let sec = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  let year = date.getFullYear();

  let month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;

  let day = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  return day + "-" + month + "-" + year + "-" + hour + "-" + min + "-" + sec;
}
function qs(elm) {
  return document.querySelector(elm);
}

const box_message = qs("#message");
const receive_message = qs(".receiveMessage");
const invalid_message = qs(".invalid-message");
const send = qs("#send");

const statusM = qs(".status");
const nameP = qs(".name");
const resi = qs(".no-resi");
const dating = qs(".date");

send.addEventListener("click", function (e) {
  const valided_message = isValidMessage(box_message.value);
  if (valided_message["code"] !== 200) {
    invalid_message.style.display = "block";
    invalid_message.innerHTML = valided_message["message"];

    setTimeout(() => (invalid_message.style.display = "none"), 2000);
    return;
  }
  receive_message.style.border = "1px solid green";
  statusM.innerHTML = "status : " + valided_message["message"];
  nameP.innerHTML = "name : " + valided_message["buyer"]["name"];
  resi.innerHTML =
    "resi pembayaran : " + valided_message["buyer"]["resi_pembayaran"];
  dating.innerHTML = "date : " + valided_message["date"];
  return;
});
