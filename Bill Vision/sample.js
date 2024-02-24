let logo=document.getElementById("logo-pic");
let inputFile=document.getElementById("input-file");

inputFile.onchange=function()
{
    logo.src=URL.createObjectURL(inputFile.files[0]);
}

document.getElementById('add-item-btn').addEventListener('click', function() {
    const itemName = document.getElementById('item-name').value;
    const itemQuantity = document.getElementById('item-quantity').value;
    const itemRate = document.getElementById('item-rate').value;
    const totalPrice = parseFloat(itemRate) * parseFloat(itemQuantity);
    const itemPrice = document.getElementById('item-price').value || totalPrice;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${itemName}</td>
        <td>${itemQuantity}</td>
        <td>$${itemRate}</td>
        <td>$${itemPrice}</td>
        <td>$${totalPrice.toFixed(2)}</td>
    `;

    const billBody = document.getElementById('bill-body');
    billBody.appendChild(newRow);

    updateTotal(); // Update total cost
    clearInputs(); // Clear input fields
});

function updatePrice() {
    const itemQuantity = document.getElementById('item-quantity').value;
    const itemRate = document.getElementById('item-rate').value;
    const totalPrice = parseFloat(itemRate) * parseFloat(itemQuantity);
    document.getElementById('item-price').value = totalPrice.toFixed(2);
}

function updateTotal() {
    const rows = document.querySelectorAll('#bill-body tr');
    let total = 0;
    rows.forEach(row => {
        total += parseFloat(row.cells[4].textContent.replace('Rs.', ''));
    });
    document.querySelector('#total-row strong').textContent = 'Total: $' + total.toFixed(2);
}

function clearInputs() {
    document.getElementById('item-name').value = '';
    document.getElementById('item-quantity').value = '';
    document.getElementById('item-rate').value = '';
    document.getElementById('item-price').value = '';
}

document.getElementById('item-quantity').addEventListener('input', updatePrice);
document.getElementById('item-rate').addEventListener('input', updatePrice);