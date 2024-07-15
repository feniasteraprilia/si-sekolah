"use client";

import { useState } from "react";

const initialDataAbsensi = [
  { id: 1, nama: "Budi", kelas: "10", tanggal: "2024-07-01", status: "Hadir" },
  { id: 2, nama: "Siti", kelas: "11", tanggal: "2024-07-01", status: "Izin" },
  { id: 3, nama: "Agus", kelas: "12", tanggal: "2024-07-01", status: "Alpha" },
  // Data absensi lainnya...
];

export default function AbsensiPage() {
  const [dataAbsensi, setDataAbsensi] = useState(initialDataAbsensi);
  const [kelas, setKelas] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [nama, setNama] = useState("");
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const filteredData = dataAbsensi.filter((absensi) => {
    return (
      (kelas ? absensi.kelas === kelas : true) &&
      (tanggal ? absensi.tanggal === tanggal : true)
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const absensiBaru = {
      id: editingId || Date.now(),
      nama,
      kelas,
      tanggal,
      status,
    };

    if (
      !editingId &&
      dataAbsensi.some(
        (absensi) => absensi.tanggal === tanggal && absensi.nama === nama
      )
    ) {
      alert("Absensi untuk tanggal ini sudah ada.");
      return;
    }

    if (editingId) {
      // Update existing record
      const updatedData = dataAbsensi.map((item) =>
        item.id === editingId ? absensiBaru : item
      );
      setDataAbsensi(updatedData);
    } else {
      // Add new record
      setDataAbsensi([...dataAbsensi, absensiBaru]);
    }

    // Reset form
    setNama("");
    setKelas("");
    setTanggal("");
    setStatus("");
    setEditingId(null);
    setIsFormVisible(false);
  };

  const handleEdit = (absensi) => {
    setNama(absensi.nama);
    setKelas(absensi.kelas);
    setTanggal(absensi.tanggal);
    setStatus(absensi.status);
    setEditingId(absensi.id);
    setIsFormVisible(true);
  };

  const handleDelete = (id) => {
    const updatedData = dataAbsensi.filter((item) => item.id !== id);
    setDataAbsensi(updatedData);
  };

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Halaman Absensi Siswa
      </h1>

      <div className="mb-6">
        <div className="flex justify-between">
          <div>
            <label>Kelas: </label>
            <select
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              className="border p-2"
            >
              <option value="">Semua</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>
          <div>
            <label>Tanggal: </label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="border p-2"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-green-500 text-white p-2 rounded"
        >
          Tambah Absensi
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Kelas</th>
              <th className="px-4 py-2">Tanggal</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((absensi) => (
              <tr key={absensi.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{absensi.nama}</td>
                <td className="border px-4 py-2">{absensi.kelas}</td>
                <td className="border px-4 py-2">{absensi.tanggal}</td>
                <td className="border px-4 py-2">{absensi.status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(absensi)}
                    className="bg-blue-500 text-white p-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(absensi.id)}
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
              {editingId ? "Edit Absensi" : "Tambah Absensi"}
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
              <label className="block mb-2">Kelas</label>
              <select
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className="w-full p-2 border"
                required
              >
                <option value="">Pilih Kelas</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
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
              <label className="block mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border"
                required
              >
                <option value="">Pilih Status</option>
                <option value="Hadir">Hadir</option>
                <option value="Izin">Izin</option>
                <option value="Alpha">Alpha</option>
                {/* Tambahkan status lainnya... */}
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Simpan Absensi
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
  );
}
