import ApiService from "../src/utils/api";


// In your login logic
localStorage.setItem('authToken', data.token);

async function loadItems() {
  try {
    const items = await ApiService.getItems();
    renderItems(items);
  } catch (error) {
    console.error("Error loading items:", error);
    alert("Error loading items");
  }
}

async function addItem(event) {
  event.preventDefault();

  const itemData = {
    name: document.getElementById('itemName').value,
    category: document.getElementById('itemCategory').value,
    // Add other fields as necessary
  };

  try {
    await ApiService.addItem(itemData);
    loadItems(); // Refresh the item list after adding
  } catch (error) {
    console.error('Error adding item:', error);
    alert('Error adding item');
  }
}
