const url1 = 'https://crudcrud.com/api/9475d2541e1b45f6b0131671f9fc2a85' + '/' + 'items';

let updateToId = null;
async function addItem(event) {

    event.preventDefault();

    let candy = event.target.name.value;
    let description = event.target.description.value;
    let price = event.target.price.value;
    let quantity = event.target.quantity.value;

    let item = {
        candy,
        description,
        price,
        quantity
    }
    if (updateToId === null) {
        try {
            await axios.post(url1, item)
            showItemOnHomepage(item);
        } catch {
            console.log('Error Occured While Posting Data to API')
        }
    }
    else {
        let url2 = url1 + '/' + updateToId;
        try {
            await axios.put(url2,item);
            showItemOnHomepage(item);
        }
        catch{
            console.log('Error Occured While Editing Data to API')
        }
    }
}

function showItemOnHomepage(item) {

    let parentEle = document.getElementById('itemList');
    let childEle = document.createElement('li');

    childEle.innerText = `${item.candy} | ${item.description} | ${item.price} | ${item.quantity}`;

    let buy1 = document.createElement('button');
    buy1.innerText = 'Buy 1';

    let buy2 = document.createElement('button');
    buy2.innerText = 'Buy 2';

    let buy3 = document.createElement('button');
    buy3.innerText = 'Buy 3';

    let editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';

    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';

    buy1.onclick = async () => {

        if (item.quantity >= 1) {

            let updatedQty = item.quantity - 1;

            let itemID = item._id;
            let updatedUrl = url1 + '/' + itemID;
            item = {
                candy: item.candy,
                description: item.description,
                price: item.price,
                quantity: updatedQty
            }
            try {
                await axios.put(updatedUrl, item)
                showItemOnHomepage(item);
                location.reload();
            } catch {
                console.log('Error Occured While Updating');
            }
        }
        else {
            alert("Quantity Out Of Stock, Need to be Ordered")
        }

    }

    buy2.onclick = async () => {

        if (item.quantity >= 2) {

            let updatedQty = item.quantity - 2;

            let itemID = item._id;
            let updatedUrl = url1 + '/' + itemID;
            item = {
                candy: item.candy,
                description: item.description,
                price: item.price,
                quantity: updatedQty
            }
            try {
                await axios.put(updatedUrl, item)
                showItemOnHomepage(item);
                location.reload();
            } catch {
                console.log('Error Occured While Updating');
            }
        }
        else {
            alert("Quantity Out Of Stock, Need to be Ordered")
        }

    }

    buy3.onclick = async () => {

        if (item.quantity >= 3) {

            let updatedQty = item.quantity - 3;

            let itemID = item._id;
            let updatedUrl = url1 + '/' + itemID;
            item = {
                candy: item.candy,
                description: item.description,
                price: item.price,
                quantity: updatedQty
            }
            try {
                await axios.put(updatedUrl, item)
                showItemOnHomepage(item);
                location.reload();
            } catch {
                console.log('Error Occured While Updating');
            }
        }
        else {
            alert("Quantity Out Of Stock, Need to be Ordered")
        }

    }

    editBtn.onclick = async () => {
        document.getElementById('name').value = item.candy;
        document.getElementById('description').value = item.description;
        document.getElementById('price').value = item.price;
        document.getElementById('quantity').value = item.quantity;
        updateToId = item._id;
        parentEle.removeChild(childEle);
    }

    deleteBtn.onclick = async () => {
        let deleteId = item._id;
        let url3 = url1 + '/' + deleteId;
        await axios.delete(url3);
        parentEle.removeChild(childEle);

    }
    parentEle.appendChild(childEle);
    childEle.appendChild(buy1);
    childEle.appendChild(buy2);
    childEle.appendChild(buy3);
    childEle.appendChild(editBtn);
    childEle.appendChild(deleteBtn);
}

async function reloadWeb() {
    try {
        let response = await axios.get(url1);
        let arr = response.data;

        arr.forEach(async ele => {
            await showItemOnHomepage(ele)
        })
    } catch {
        console.log(err);
    }
}
window.addEventListener('DOMContentLoaded', reloadWeb)