// ===========================================
// FUNGSI KALKULASI CART
// ===========================================

const itemPriceElement = document.querySelector('.item-price');
// Ambil harga dari data-attribute, default 35000 jika elemen tidak ditemukan (misal di halaman lain)
const ITEM_PRICE = parseInt(itemPriceElement ? itemPriceElement.dataset.price : 35000); 
const DELIVERY_FEE = 3000;

function formatRupiah(number) {
    // Memastikan kita hanya memanggil toLocaleString jika number valid
    if (isNaN(number)) return 'Rp 0';
    return 'Rp ' + number.toLocaleString('id-ID');
}

function updateSummary() {
    // Pastikan elemen ada sebelum mencoba mengakses nilainya
    const quantityInput = document.getElementById('item-quantity');
    if (!quantityInput) return; 
    
    const quantity = parseInt(quantityInput.value);

    const subtotal = quantity * ITEM_PRICE;

    let deliveryFee = 0;
    const deliveryRadio = document.getElementById('delivery');
    
    if (deliveryRadio && deliveryRadio.checked) {
        deliveryFee = DELIVERY_FEE;
    }

    const total = subtotal + deliveryFee;

    document.getElementById('summary-subtotal').textContent = formatRupiah(subtotal);
    document.getElementById('summary-delivery-fee').textContent = formatRupiah(deliveryFee);
    document.getElementById('summary-total').textContent = formatRupiah(total);
}

function adjustQuantity(change) {
    const quantityInput = document.getElementById('item-quantity');
    if (!quantityInput) return;
    
    let currentValue = parseInt(quantityInput.value);
    let newValue = currentValue + change;
    
    if (newValue < 1) {
        newValue = 1;
    }

    quantityInput.value = newValue;
    updateSummary();
}

// ===========================================
// FUNGSI MODAL & FORM
// ===========================================

function clearForm() {
    // Reset input teks
    document.getElementById('nama').value = '';
    document.getElementById('alamat').value = '';
    
    // Reset Kuantitas ke 1
    document.getElementById('item-quantity').value = 1;
    
    // Reset Pilihan Pengiriman ke Pick Up
    document.getElementById('pickup').checked = true;

    // Reset Dropdown Yayasan
    document.getElementById('yayasan').selectedIndex = 0;
    
    // Update summary setelah reset
    updateSummary();
}

function placeOrder() {
    const namaInput = document.getElementById('nama');
    const alamatInput = document.getElementById('alamat');
    const yayasanSelect = document.getElementById('yayasan');
    
    const nama = namaInput.value.trim();
    const alamat = alamatInput.value.trim();

    // Validasi
    if (nama.length < 3) {
        alert("Kolom Nama wajib diisi minimal 3 karakter.");
        namaInput.focus();
        return;
    }

    if (alamat.length < 10) {
        alert("Kolom Alamat wajib diisi minimal 10 karakter untuk detail pengiriman.");
        alamatInput.focus();
        return;
    }
    
    if (yayasanSelect.value === '') {
        alert("Kolom Pilih Yayasan wajib diisi.");
        yayasanSelect.focus();
        return;
    }
    
    // Jika Validasi Berhasil
    document.getElementById('payment-modal').style.display = 'flex';
    clearForm();
}

function closeModal() {
    document.getElementById('payment-modal').style.display = 'none';
}

// Panggil fungsi saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', updateSummary);