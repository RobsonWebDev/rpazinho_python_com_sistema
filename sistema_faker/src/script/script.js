class InventorySystem {
    constructor() {
        this.items = [];
        this.itemIdCounter = 1;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const form = document.getElementById('itemForm');
        form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const quantidade = parseInt(document.getElementById('quantidade').value);
        const preco = parseFloat(document.getElementById('preco').value);

        if (!nome || !quantidade || !preco) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const novoItem = {
            id: this.itemIdCounter++,
            nome: nome,
            quantidade: quantidade,
            preco: preco
        };

        this.items.push(novoItem);
        this.clearForm();
        this.renderItems();
        this.updateTotal();
    }

    clearForm() {
        document.getElementById('nome').value = '';
        document.getElementById('quantidade').value = '';
        document.getElementById('preco').value = '';
    }

    formatPrice(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    calculateTotal() {
        return this.items.reduce((total, item) => total + (item.quantidade * item.preco), 0);
    }

    updateTotal() {
        const itemCount = document.getElementById('itemCount');
        const totalSection = document.getElementById('totalSection');
        const totalValue = document.getElementById('totalValue');

        itemCount.textContent = this.items.length;

        if (this.items.length > 0) {
            totalSection.style.display = 'block';
            totalValue.textContent = this.formatPrice(this.calculateTotal());
        } else {
            totalSection.style.display = 'none';
        }
    }

    renderItems() {
        const itemsList = document.getElementById('itemsList');

        if (this.items.length === 0) {
            itemsList.innerHTML = `
                <div class="empty-state">
                    <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27,6.96 12,12.01 20.73,6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                    <p class="empty-title">Nenhum item cadastrado ainda</p>
                    <p class="empty-subtitle">Use o formulário ao lado para adicionar seus primeiros itens</p>
                </div>
            `;
            return;
        }

        const itemsHTML = this.items.map(item => `
            <div class="item-card fade-in">
                <div class="item-content">
                    <div class="item-info">
                        <h3>${item.nome}</h3>
                        <div class="item-details">
                            <span class="item-detail">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="4" y1="9" x2="20" y2="9"></line>
                                    <line x1="4" y1="15" x2="20" y2="15"></line>
                                    <line x1="10" y1="3" x2="8" y2="21"></line>
                                    <line x1="16" y1="3" x2="14" y2="21"></line>
                                </svg>
                                Qtd: ${item.quantidade}
                            </span>
                            <span class="item-detail">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="12" y1="1" x2="12" y2="23"></line>
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                </svg>
                                ${this.formatPrice(item.preco)}
                            </span>
                        </div>
                    </div>
                    <div class="item-total">
                        <p class="item-total-label">Subtotal</p>
                        <p class="item-total-value">${this.formatPrice(item.quantidade * item.preco)}</p>
                    </div>
                </div>
            </div>
        `).join('');

        itemsList.innerHTML = itemsHTML;
    }
}

// Inicializar o sistema quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new InventorySystem();
});