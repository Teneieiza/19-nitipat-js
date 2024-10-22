document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("textInput");
    const priceInput = document.getElementById("priceInput");
    const urlInput = document.getElementById("urlInput");
    const addProduct = document.getElementById("addProduct");
    const taskList = document.getElementById("producList");
    const cartList = document.getElementById("cart-items");
    const totalPrice = document.getElementById('total-price');
    const checkBut = document.getElementById('checkout-button');

    let tasks = [];

    addProduct.addEventListener("click", () => {
        const taskText = textInput.value.trim();
        const taskPrice = priceInput.value.trim();
        const taskUrl = urlInput.value.trim();
        if (taskText && taskPrice && taskUrl) {
            const task = {
                id: Date.now(),
                text: taskText,
                price: Number(taskPrice),
                url: taskUrl
            };
            tasks.push(task);
            renderTasks(tasks);
            console.log(tasks);

            taskText.value = "";
            taskPrice.value = "";
            taskUrl.value = "";
        }
    });


    function renderTasks(tasksToRender) {
        taskList.innerHTML = "";
        tasksToRender.forEach((task) => {
            const taskProduct = document.createElement("li");
            taskProduct.classList.add("task-product");
            taskProduct.innerHTML = `
                <input type="checkbox" class="product-checkbox">
            `


            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task-div");
            taskDiv.innerHTML = `
                <img src="${task.url}" alt="${task.text}"></img>
                <div class="task-text">
                    <p>${task.text}</p>
                    <span>$ ${task.price}</span>
                </div>
            `
            

            taskList.appendChild(taskProduct);
            taskProduct.appendChild(taskDiv);

        });
    }



    function calculateTotal() {
        const checkboxes = document.querySelectorAll('.product-checkbox');
        let total = 0;
        let selectedProducts = [];
    
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                total += tasks[index].price;
                selectedProducts.push(tasks[index]);
            }
        });
    
        totalPrice.textContent = `Total: $${total}`;
        renderSelectedProducts(selectedProducts);
    }

    function renderSelectedProducts(selectedProducts) {
        cartList.innerHTML = "";
        selectedProducts.forEach((task) => {
            const taskProduct = document.createElement("li");
            taskProduct.classList.add("task-product");


            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task-div");
            taskDiv.innerHTML = `
                <img src="${task.url}" alt="${task.text}"></img>
                <div class="task-text">
                    <p>${task.text}</p>
                    <span>$ ${task.price}</span>
                </div>
            `
            cartList.appendChild(taskProduct);
            taskProduct.appendChild(taskDiv);
        });
    }

    document.addEventListener('change', (event) => {
        if (event.target.classList.contains('product-checkbox')) {
            calculateTotal();
        }
    });

    checkBut.addEventListener('click', () => {
        const selectedProducts = [];
        const checkboxes = document.querySelectorAll('.product-checkbox');
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                selectedProducts.push(tasks[index]);
            }
        });
    
        if (selectedProducts.length > 0) {
            alert(`จ่ายเงินแล้วค้าบ`);
        } else {
            alert('เลือกของก่อนนะน้องนะ');
        }
    });

});