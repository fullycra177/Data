document.getElementById('searchBtn').addEventListener('click', () => {
  const input = document.getElementById('numberInput').value.trim();
  const resultBox = document.getElementById('resultBox');
  resultBox.textContent = 'Loading...';

  if (!/^\d{11}$|^\d{13}$/.test(input)) {
    resultBox.textContent = 'Enter valid 11 digit number or 13 digit CNIC';
    return;
  }

  fetch(`https://api.codeplaners.com/api/simchecker?num=${input}`)
    .then(res => res.json())
    .then(data => {
      if (data.status !== 'success' || !data.data) {
        resultBox.textContent = 'No data found';
        return;
      }

      const formatted = data.data.map((item, index) => `
--- Record ${index + 1} ---
Name: ${item.Name}
Mobile: ${item.Mobile}
CNIC: ${item.CNIC}
Operator: ${item.Operator}
Address: ${item.Address}
      `).join('\n');

      resultBox.textContent = formatted;
    })
    .catch(() => {
      resultBox.textContent = 'Error while fetching data';
    });
});

document.getElementById('copyBtn').addEventListener('click', () => {
  const text = document.getElementById('resultBox').textContent;
  navigator.clipboard.writeText(text);
});

document.getElementById('clearBtn').addEventListener('click', () => {
  document.getElementById('resultBox').textContent = '';
  document.getElementById('numberInput').value = '';
});

document.getElementById('shareBtn').addEventListener('click', () => {
  const text = document.getElementById('resultBox').textContent;
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
});
