'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/app-context';
import { Product } from '@/lib/types';
import {
  ShoppingBag,
  Plus,
  Search,
  CheckCircle2,
  PackageCheck,
  Star,
  MapPin,
  Sparkles,
} from 'lucide-react';

export default function MarketPage() {
  const { products, addProduct, business } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [halalOnly, setHalalOnly] = useState(false);
  const [b2bOnly, setB2bOnly] = useState(false);

  // Modal create product
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState<number>(35000);
  const [newMinOrder, setNewMinOrder] = useState<number>(1);
  const [newCategory, setNewCategory] = useState<Product['category']>('Kuliner');
  const [newDescription, setNewDescription] = useState('');
  const [newStock, setNewStock] = useState(100);
  const [newIsHalal, setNewIsHalal] = useState(true);
  const [newB2bReady, setNewB2bReady] = useState(true);

  // Checkout modal
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [checkoutQuantity, setCheckoutQuantity] = useState(10);
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'va_bca' | 'va_mandiri' | 'xendit'>('qris');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const categories = ['Semua', 'Kuliner', 'Fashion', 'Kerajinan', 'Pertanian'];

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'Semua' && p.category !== selectedCategory) return false;
    if (halalOnly && !p.halalCertified) return false;
    if (b2bOnly && !p.b2bReady) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.businessName.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    addProduct({
      name: newName.trim(),
      description: newDescription.trim() || 'Produk unggulan terstandarisasi kualitas UMKM Naik Kelas.',
      category: newCategory,
      price: newPrice,
      minOrder: newMinOrder,
      stock: newStock,
      location: `${business.city}, ${business.province}`,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
      halalCertified: newIsHalal,
      b2bReady: newB2bReady,
      exportReady: false,
    });

    setIsAdding(false);
    setNewName('');
    setNewDescription('');
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setCheckoutProduct(null);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-amber-200 border border-white/20 mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>INAMARKET B2B & B2C COMMERCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Katalog Produk & Transaksi UMKM
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 max-w-2xl mt-1">
            Etalase digital terstandarisasi untuk pengadaan korporasi, perhotelan B2B, dan pembeli ritel nasional.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-5 py-3 rounded-xl bg-white text-orange-950 font-bold text-xs hover:bg-amber-50 transition-all flex items-center gap-2 shrink-0 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Produk Usaha Anda</span>
        </button>
      </div>

      {/* Add Product Form Modal */}
      {isAdding && (
        <form
          onSubmit={handleCreateProduct}
          className="bg-white p-6 rounded-2xl border-2 border-orange-200 shadow-xl space-y-4 animate-in slide-in-from-top-4 duration-200"
        >
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-gray-900">Tambah Produk Baru ke INAMarket</h3>
            <span className="text-xs text-gray-500">Pemilik: <strong>{business.businessName}</strong></span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Produk</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Misal: Sambal Roa Asap Khas Manado Botol Kaca 150g"
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Kategori</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500 bg-white"
              >
                <option value="Kuliner">Kuliner</option>
                <option value="Fashion">Fashion</option>
                <option value="Kerajinan">Kerajinan</option>
                <option value="Pertanian">Pertanian</option>
                <option value="Jasa">Jasa</option>
                <option value="Digital">Digital</option>
                <option value="Beauty">Beauty</option>
                <option value="Retail">Retail</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Harga Satuan (Rp)</label>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(parseInt(e.target.value) || 0)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Minimum Pemesanan</label>
              <input
                type="number"
                value={newMinOrder}
                onChange={(e) => setNewMinOrder(parseInt(e.target.value) || 1)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Stok Tersedia</label>
              <input
                type="number"
                value={newStock}
                onChange={(e) => setNewStock(parseInt(e.target.value) || 10)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Deskripsi Spesifikasi Produk</label>
            <textarea
              rows={3}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Jelaskan bahan baku, daya simpan, legalitas, dan kapasitas pasokan bulanan..."
              className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex items-center gap-6 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newIsHalal}
                onChange={(e) => setNewIsHalal(e.target.checked)}
                className="rounded text-orange-600 focus:ring-0"
              />
              <span className="font-semibold text-gray-700">Tersertifikasi Halal</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newB2bReady}
                onChange={(e) => setNewB2bReady(e.target.checked)}
                className="rounded text-orange-600 focus:ring-0"
              />
              <span className="font-semibold text-gray-700">Siap Pasokan B2B</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Tayangkan Produk (+15 XP & Tambah Skor Pasar)
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white font-bold'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Toggles & Search */}
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-gray-700 cursor-pointer bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-200">
            <input
              type="checkbox"
              checked={halalOnly}
              onChange={(e) => setHalalOnly(e.target.checked)}
              className="rounded text-orange-600 focus:ring-0"
            />
            <span className="font-medium">Hanya Halal</span>
          </label>

          <label className="flex items-center gap-1.5 text-xs text-gray-700 cursor-pointer bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-200">
            <input
              type="checkbox"
              checked={b2bOnly}
              onChange={(e) => setB2bOnly(e.target.checked)}
              className="rounded text-orange-600 focus:ring-0"
            />
            <span className="font-medium">Siap B2B</span>
          </label>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari produk atau kota..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs pl-8 pr-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500 w-48"
            />
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            id={`prod-card-${prod.id}`}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-44 bg-slate-100 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                  {prod.halalCertified && (
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      Halal BPJPH
                    </span>
                  )}
                  {prod.b2bReady && (
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      Siap B2B
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-medium">
                  Stok: {prod.stock} unit
                </div>
              </div>

              <div className="p-5">
                <div className="text-[11px] text-gray-500 mb-1 flex items-center justify-between">
                  <span className="font-semibold text-blue-800 truncate max-w-[160px]">{prod.businessName}</span>
                  <span className="text-[10px] flex items-center gap-0.5">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    {prod.location}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1">
                  {prod.name}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">
                  {prod.description}
                </p>

                {/* Rating and price block */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-extrabold text-orange-600">
                      Rp {prod.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[11px] text-gray-400">/ pcs</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{prod.rating}</span>
                    <span className="text-gray-400 font-normal text-[10px]">({prod.reviewsCount})</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 flex gap-2">
              <button
                onClick={() => setCheckoutProduct(prod)}
                className="flex-1 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Beli / Order B2B</span>
              </button>

              <button
                onClick={() => {
                  alert(`Menghubungi PIC ${prod.businessName} untuk negosiasi harga pasokan.`);
                }}
                className="px-3 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-xl"
                title="Tanya Penjual"
              >
                RFQ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout / Payment Modal */}
      {checkoutProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                  TRANSAKSI INAMARKET
                </span>
                <h3 className="text-base font-bold text-gray-900">Pembayaran Terproteksi (Escrow)</h3>
              </div>
              <button
                onClick={() => setCheckoutProduct(null)}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {orderSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-gray-900">Pembayaran Berhasil!</h4>
                <p className="text-xs text-gray-600">
                  Pesanan telah diteruskan ke seller <strong>{checkoutProduct.businessName}</strong>. Transaksi ini menambah skor aktivitas pasar Anda!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSimulatePayment} className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={checkoutProduct.image}
                      alt={checkoutProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-gray-900">{checkoutProduct.name}</p>
                    <p className="text-gray-500">Harga: Rp {checkoutProduct.price.toLocaleString('id-ID')}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Jumlah Pemesanan</label>
                  <input
                    type="number"
                    min={checkoutProduct.minOrder}
                    max={checkoutProduct.stock}
                    value={checkoutQuantity}
                    onChange={(e) => setCheckoutQuantity(parseInt(e.target.value) || 1)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Metode Pembayaran</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'qris', label: 'QRIS Real-Time' },
                      { id: 'va_bca', label: 'BCA Virtual Account' },
                      { id: 'va_mandiri', label: 'Mandiri Bill' },
                      { id: 'xendit', label: 'Gerbang Xendit / Doku' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                          paymentMethod === m.id
                            ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Total Tagihan:</span>
                  <span className="text-base font-extrabold text-orange-600">
                    Rp {(checkoutProduct.price * checkoutQuantity).toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl transition-colors shadow-md"
                >
                  Bayar Sekarang Secara Aman
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
