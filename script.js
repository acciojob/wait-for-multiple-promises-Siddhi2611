//your JS code here. If required.
// Generate a random delay between 1–3 seconds
function randomDelay() {
  return Math.random() * 2000 + 1000; // 1000–3000 ms
}

// Create a promise that resolves after random delay
function createPromise(id) {
  return new Promise((resolve) => {
    const delay = randomDelay();
    const start = performance.now();

    setTimeout(() => {
      const end = performance.now();
      const timeTaken = (end - start) / 1000; // in seconds
      resolve({ id, timeTaken });
    }, delay);
  });
}

const tbody = document.getElementById("output");

// Create 3 promises
const promises = [createPromise(1), createPromise(2), createPromise(3)];

const startAll = performance.now();

// Wait for all promises
Promise.all(promises).then((results) => {
  const endAll = performance.now();
  const totalTime = (endAll - startAll) / 1000;

  // Clear "Loading..." row
  tbody.innerHTML = "";

  // Render each promise row
  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>Promise ${result.id}</td>
      <td>${result.timeTaken.toFixed(3)}</td>
    `;
    tbody.appendChild(row);
  });

  // Add total row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>${totalTime.toFixed(3)}</strong></td>
  `;
  tbody.appendChild(totalRow);
});
