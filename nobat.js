const timesDiv = document.getElementById("times");
const result = document.getElementById("result");

let selectedTime = null;
let reservedTimes = []; // بعداً از دیتابیس میاد

// ساخت ساعت‌ها از 10 تا 22
for (let i = 10; i < 22; i++) {
  const div = document.createElement("div");
  div.className = "time";
  div.innerText = `${i}:00`;

  div.onclick = () => {
    if (div.classList.contains("reserved")) return;

    document.querySelectorAll(".time").forEach(t => t.classList.remove("selected"));
    div.classList.add("selected");
    selectedTime = div.innerText;
  };

  timesDiv.appendChild(div);
}

function confirmAppointment() {
  const name = document.getElementById("fullname").value;
  const phone = document.getElementById("phone").value;
  const day = document.getElementById("day").value;

  if (!name || !phone || !day || !selectedTime) {
    alert("لطفاً همه فیلدها را کامل کنید");
    return;
  }

  // رزرو شدن ساعت
  document.querySelectorAll(".time").forEach(t => {
    if (t.innerText === selectedTime) {
      t.classList.add("reserved");
      t.classList.remove("selected");
    }
  });

  result.innerHTML = `
    خیلی ممنون از اینکه آرایشگاه الماس را انتخاب کردید ❤️<br>
    چنانچه به وقت خود نرسید 10 هزار تومان جریمه می‌شود
  `;

  // ⬇️ اینجا بعداً وصل می‌کنیم به Google Sheets یا Supabase
  console.log({
    name,
    phone,
    day,
    time: selectedTime
  });
}
