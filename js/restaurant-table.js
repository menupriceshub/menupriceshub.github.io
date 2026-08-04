document.addEventListener('DOMContentLoaded', function () {
  const wrapper = document.getElementById('page-wrapper');
  const restaurantId = wrapper?.getAttribute('data-restaurant-id');
  const tbody = document.getElementById('ptg-table-body');
  const titleEl = document.getElementById('ptg-title-text');

  if (!restaurantId) return;

  fetch(`/data/restaurant-table/${restaurantId}.json`)
    .then(res => {
      if (!res.ok) throw new Error('Not found');
      return res.json();
    })
    .then(data => {
      if (titleEl && data.title) titleEl.textContent = data.title;

      tbody.innerHTML = data.items.map(item => `
        <tr>
          <td>${item.name}</td>
          <td>${item.category}</td>
          <td class="ptg-td-cal">${item.calories}</td>
          <td class="ptg-td-price">${item.price}</td>
        </tr>
      `).join('');
    })
    .catch(() => {
      tbody.innerHTML = '<tr><td colspan="4">Menu abhi available nahi hai.</td></tr>';
    });
});
