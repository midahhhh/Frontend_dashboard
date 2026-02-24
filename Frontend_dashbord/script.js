console.log("App Start");

let appName = "Mini Dashboard"; // global scope

function showAppName() {
  let version = "1.0"; // function scope
  console.log(appName);
  console.log(version);
  console.log(version); // error
}

showAppName();
const transactions = [
  { id: 1, customer: "Andi", total: 200000, status: "paid" },
  { id: 2, customer: "Budi", total: 150000, status: "unpaid" },
  { id: 3, customer: "Citra", total: 300000, status: "paid" },
];
function renderData(data) {
  const list = document.getElementById("list");
  list.innerHTML = "";

  data.map(item => {
    const li = document.createElement("li");
    li.innerText = `${item.customer} - Rp ${item.total} - ${item.status}`;
    list.appendChild(li);
  });
}
function filterPaid() {
  const paidTransactions = transactions.filter(item => item.status === "paid");
  renderData(paidTransactions);
}
function calculateTotal(data) {
  const total = data.reduce((acc, item) => acc + item.total, 0);
  document.getElementById("total").innerText = "Total: Rp " + total;
}
document.getElementById("loadBtn").addEventListener("click", function() {
  renderData(transactions);
  calculateTotal(transactions);
});

document.getElementById("filterBtn").addEventListener("click", function() {
  filterPaid();
});
function processTransactions(callback) {
  callback(transactions);
}

processTransactions(function(data) {
  console.log("Data diterima:", data);
});
function fetchTransactions() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;

      if (success) {
        resolve(transactions);
      } else {
        reject("Gagal ambil data");
      }
    }, 2000);
  });
}
async function loadData() {
  try {
    const data = await fetchTransactions();
    renderData(data);
    calculateTotal(data);
  } catch (error) {
    console.log(error);
  }
}

document.getElementById("loadBtn").addEventListener("click", loadData);
