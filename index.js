document.addEventListener('DOMContentLoaded', () => {
    const addItemForm = document.getElementById('add-item-form');
    const itemsTableBody = document.getElementById('items-table').tBodies[0];
    let itemIndex = 1;

    addItemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = document.getElementById('itemDropdown').value;
        const price = parseFloat(document.getElementById('priceDropdown').value);
        const quantity = parseInt(document.getElementById('quantity').value);
        const total = price * quantity;

        const newRow = itemsTableBody.insertRow();

        const descriptionCell = newRow.insertCell();
        descriptionCell.textContent = description;

        const priceCell = newRow.insertCell();
        priceCell.textContent = `$${price.toFixed(2)}`;

        const quantityCell = newRow.insertCell();
        quantityCell.textContent = quantity;

        const totalCell = newRow.insertCell();
        totalCell.textContent = `$${total.toFixed(2)}`;

        const actionsCell = newRow.insertCell();
        const removeBtn = document.createElement('button');
        removeBtn.style.backgroundColor = 'red';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            newRow.remove();
            calculateTotals();
          
        });
        actionsCell.appendChild(removeBtn);

        itemIndex++;
        calculateTotals();
    });

    const calculateTotals = () => {
        const items = document.querySelectorAll('#items-table tbody tr');
        let subtotal = 0;

        items.forEach((item) => {
            const total = parseFloat(item.getElementsByTagName('td')[3].textContent.replace('$', ''));
            subtotal += total;
        });

        const tax = subtotal * 0.05;
        const total = subtotal + tax;

        document.getElementById('subtotal').textContent = `RS${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `RS${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `Rs${total.toFixed(2)}`;
    };

    document.getElementById('print-btn').addEventListener('click', () => {
      var printContents = document.getElementById("items-table").outerHTML;
      printContents += `<label for="subtotal">Subtotal:</label><div id="subtotal">${document.getElementById('subtotal').textContent}</div>`;
      printContents += `<label for="tax">Tax:</label><div id="tax">${document.getElementById('tax').textContent}</div>`;
      printContents += `<label for="total">Total:</label><div id="total">${document.getElementById('total').textContent}</div>`;
      
      var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        
    });
    
});
  document.getElementById('itemDropdown').addEventListener('change', function() {
    var selectedItem = this.value;
    var priceDropdown = document.getElementById('priceDropdown');

    // Reset the price dropdown
    priceDropdown.selectedIndex = 0;

    // Set the price based on the selected item
    switch (selectedItem) {
      case 'Tea':
        priceDropdown.value = '10';
        break;
      case 'Milk':
priceDropdown.value = '15';
        break;
      case 'Coffee':
        priceDropdown.value = '20';
        break;
        case 'Apple juice':
            priceDropdown.value = '30';
                    break;
                    case 'Milk shake':
                        priceDropdown.value = '50';
                                break;
      default:
        break;
    }
  });
