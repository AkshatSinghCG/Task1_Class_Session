document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const itemList = document.getElementById('itemList');
    const themeToggle = document.getElementById('themeToggle');
    const emptyState = document.querySelector('.empty-state');

    // Initialize theme
    let currentTheme = localStorage.getItem('theme') || 'light';
    document.body.className = `${currentTheme}-theme`;
    updateThemeIcon(currentTheme);

    let items = [];
    
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = `${savedTheme}-theme`;
    themeToggle.innerHTML = `<i class="fas fa-${savedTheme === 'light' ? 'moon' : 'sun'}"></i>`;

    initializeItems();

    // Theme toggle function
    function updateThemeIcon(theme) {
        themeToggle.innerHTML = `<i class="fas fa-${theme === 'light' ? 'moon' : 'sun'}"></i>`;
    }

    // Theme toggle event
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.className = `${currentTheme}-theme`;
        updateThemeIcon(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });

    addButton.addEventListener('click', addItem);
    itemInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    });

    itemList.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.delete-btn');
        if (deleteBtn) {
            const li = deleteBtn.closest('.list-item');
            const index = Array.from(itemList.children).indexOf(li);
            li.style.transform = 'translateX(100px)';
            li.style.opacity = '0';
            setTimeout(() => {
                items.splice(index, 1);
                saveItems();
                renderItems();
            }, 300);
        }
    });

    function initializeItems() {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            items = JSON.parse(storedItems);
            renderItems();
        }
        updateEmptyState();
    }

    function addItem() {
        const itemText = itemInput.value.trim();
        if (itemText) {
            items.push(itemText);
            saveItems();
            renderItems();
            itemInput.value = '';
            itemInput.focus();
        }
    }

    function saveItems() {
        localStorage.setItem('items', JSON.stringify(items));
        updateEmptyState();
    }

    function updateEmptyState() {
        if (items.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
    }

    function renderItems() {
        itemList.innerHTML = '';
        items.forEach((item) => {
            const li = document.createElement('li');
            li.className = 'list-item';
            li.innerHTML = `
                <span>${item}</span>
                <button class="delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            itemList.appendChild(li);
        });
    }
});