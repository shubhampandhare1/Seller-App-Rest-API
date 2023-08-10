const url1 = 'https://crudcrud.com/api/56feb0a61c8e48bea0d8f16b92107cad' + '/' + 'items';

function addItem(event) {

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

    axios.post(url1, item)
        .then((response) => {
            showItemOnHomepage(item)
        })
        .catch((err) => {
            console.log('Error Occured While Showing  Data', err)
        })
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


    buy1.onclick = () => {

        if (item.quantity > 0) {

            item.quantity -= 1;

            let itemID = item._id;
            let updatedUrl = url1 + '/' + itemID;

            parentEle.removeChild(childEle);
            showItemOnHomepage(item);

            axios.put(updatedUrl, item)
                .then((response) => {
                    console.log(response)
                })
                .catch((err) => {
                    console.log('Error')
                })
        }
        else {
            alert("Quantity Out Of Stock, Need to be Ordered")
        }

    }

    buy2.onclick = () => {

        if (item.quantity > 0) {

            item.quantity -= 2;

            let updatedUrl = url1 + '/' + item._id;

            parentEle.removeChild(childEle);
            showItemOnHomepage(item);

            axios.put(updatedUrl, item)
                .then((response) => {
                    console.log('Completed')
                })
                .catch((err) => {
                    console.log('Error')
                })
        }
        else {
            alert("Quantity Out Of Stock, Need to be Ordered")
        }

    }

    buy3.onclick = () => {

        if (item.quantity > 0) {

            item.quantity -= 3;

            let itemID = item._id;
            let updatedUrl = url1 + '/' + itemID;

            parentEle.removeChild(childEle);
            showItemOnHomepage(item);

            axios.put(updatedUrl, item)
                .then((response) => {
                    console.log('Completed')
                })
                .catch((err) => {
                    console.log('Error')
                })
        }
        else {
            alert("Quantity Out Of Stock, Need to be Ordered")
        }

    }

    parentEle.appendChild(childEle);
    childEle.appendChild(buy1)
    childEle.appendChild(buy2)
    childEle.appendChild(buy3)
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get(url1)
        .then((response) => {
            response.data.forEach(ele => {
                showItemOnHomepage(ele)
            })
        })
        .catch((err) => {
            console.log(err);
        })
})