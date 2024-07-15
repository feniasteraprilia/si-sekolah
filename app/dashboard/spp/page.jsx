"use client";

import { useState } from "react";
import Link from "next/link";

const initialDataPembayaran = [
  { id: 1, nama: "Budi", tanggal: "2024-07-01", jumlah: 250, status: "Lunas" },
  {
    id: 2,
    nama: "Siti",
    tanggal: "2024-07-01",
    jumlah: 150,
    status: "Lunas",
  },
  {
    id: 3,
    nama: "Agus",
    tanggal: "2024-07-01",
    jumlah: 350,
    status: "Belum Lunas",
  },
  // Data pembayaran lainnya...
];

export default function PembayaranPage() {
  const [dataPembayaran, setDataPembayaran] = useState(initialDataPembayaran);
  const [statusFilter, setStatusFilter] = useState("");
  const [tanggalFilter, setTanggalFilter] = useState("");
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const filteredData = dataPembayaran.filter((pembayaran) => {
    return (
      (statusFilter ? pembayaran.status === statusFilter : true) &&
      (tanggalFilter ? pembayaran.tanggal === tanggalFilter : true)
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const pembayaranBaru = {
      id: editingId || Date.now(),
      nama,
      tanggal,
      jumlah: parseInt(jumlah),
      status,
    };

    if (
      !editingId &&
      dataPembayaran.some(
        (item) => item.nama === nama && item.tanggal === tanggal
      )
    ) {
      alert("Pembayaran untuk siswa ini dan tanggal ini sudah ada.");
      return;
    }

    if (editingId) {
      // Update existing record
      const updatedData = dataPembayaran.map((item) =>
        item.id === editingId ? pembayaranBaru : item
      );
      setDataPembayaran(updatedData);
    } else {
      // Add new record
      setDataPembayaran([...dataPembayaran, pembayaranBaru]);
    }

    // Reset form
    setNama("");
    setTanggal("");
    setJumlah("");
    setStatus("");
    setEditingId(null);
    setIsFormVisible(false);
  };

  const handleEdit = (pembayaran) => {
    setNama(pembayaran.nama);
    setTanggal(pembayaran.tanggal);
    setJumlah(pembayaran.jumlah.toString());
    setStatus(pembayaran.status);
    setEditingId(pembayaran.id);
    setIsFormVisible(true);
  };

  const handleDelete = (id) => {
    const updatedData = dataPembayaran.filter((item) => item.id !== id);
    setDataPembayaran(updatedData);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex justify-between mb-4">
          <div>
            <label>Status: </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border p-2"
            >
              <option value="">Semua</option>
              <option value="Lunas">Lunas</option>
              <option value="Belum Lunas">Belum Lunas</option>
            </select>
          </div>
          <div>
            <label>Tanggal: </label>
            <input
              type="date"
              value={tanggalFilter}
              onChange={(e) => setTanggalFilter(e.target.value)}
              className="border p-2"
            />
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsFormVisible(true)}
            className="bg-green-500 text-white p-2 rounded"
          >
            Tambah Pembayaran
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">Jumlah</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((pembayaran) => (
                <tr key={pembayaran.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{pembayaran.nama}</td>
                  <td className="border px-4 py-2">{pembayaran.tanggal}</td>
                  <td className="border px-4 py-2">{pembayaran.jumlah}</td>
                  <td className="border px-4 py-2">{pembayaran.status}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEdit(pembayaran)}
                      className="bg-blue-500 text-white p-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pembayaran.id)}
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isFormVisible && (
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
            >
              <h2 className="text-2xl font-bold mb-4">
                {editingId ? "Edit Pembayaran" : "Tambah Pembayaran"}
              </h2>

              <div className="mb-4">
                <label className="block mb-2">Nama</label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full p-2 border"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Tanggal</label>
                <input
                  type="date"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="w-full p-2 border"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Jumlah</label>
                <input
                  type="number"
                  value={jumlah}
                  onChange={(e) => setJumlah(e.target.value)}
                  className="w-full p-2 border"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border p-2"
                >
                  <option value="">Semua</option>
                  <option value="Lunas">Lunas</option>
                  <option value="Belum Lunas">Belum Lunas</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Simpan Pembayaran
              </button>
              <button
                onClick={() => setIsFormVisible(false)}
                className="bg-gray-500 text-white p-2 rounded ml-2"
              >
                Batal
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
