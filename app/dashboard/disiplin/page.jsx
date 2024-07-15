"use client";

import { useState } from "react";

const initialDataCatatan = [
  {
    id: 1,
    nama: "Budi",
    kelas: "10",
    tanggal: "2024-07-01",
    catatan: "Terlambat datang ke sekolah",
  },
  {
    id: 2,
    nama: "Siti",
    kelas: "11",
    tanggal: "2024-07-01",
    catatan: "Tidak membawa buku pelajaran",
  },
  {
    id: 3,
    nama: "Agus",
    kelas: "12",
    tanggal: "2024-07-01",
    catatan: "Mengganggu teman sekelas",
  },
  // Data catatan disiplin lainnya...
];

export default function CatatanDisiplinPage() {
  const [dataCatatan, setDataCatatan] = useState(initialDataCatatan);
  const [kelas, setKelas] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [nama, setNama] = useState("");
  const [catatan, setCatatan] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const filteredData = dataCatatan.filter((catatan) => {
    return (
      (kelas ? catatan.kelas === kelas : true) &&
      (tanggal ? catatan.tanggal === tanggal : true)
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const catatanBaru = {
      id: editingId || Date.now(),
      nama,
      kelas,
      tanggal,
      catatan,
    };

    if (
      !editingId &&
      dataCatatan.some((item) => item.nama === nama && item.tanggal === tanggal)
    ) {
      alert("Catatan disiplin untuk siswa ini dan tanggal ini sudah ada.");
      return;
    }

    if (editingId) {
      // edit data
      const updatedData = dataCatatan.map((item) =>
        item.id === editingId ? catatanBaru : item
      );
      setDataCatatan(updatedData);
    } else {
      // tambah data baru
      setDataCatatan([...dataCatatan, catatanBaru]);
    }

    // Reset form
    setNama("");
    setKelas("");
    setTanggal("");
    setCatatan("");
    setEditingId(null);
    setIsFormVisible(false);
  };

  const handleEdit = (catatan) => {
    setNama(catatan.nama);
    setKelas(catatan.kelas);
    setTanggal(catatan.tanggal);
    setCatatan(catatan.catatan);
    setEditingId(catatan.id);
    setIsFormVisible(true);
  };

  const handleDelete = (id) => {
    const updatedData = dataCatatan.filter((item) => item.id !== id);
    setDataCatatan(updatedData);
  };

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Halaman Catatan Disiplin Siswa
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
          Tambah Catatan Disiplin
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Kelas</th>
              <th className="px-4 py-2">Tanggal</th>
              <th className="px-4 py-2">Catatan</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((catatan) => (
              <tr key={catatan.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{catatan.nama}</td>
                <td className="border px-4 py-2">{catatan.kelas}</td>
                <td className="border px-4 py-2">{catatan.tanggal}</td>
                <td className="border px-4 py-2">{catatan.catatan}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(catatan)}
                    className="bg-blue-500 text-white p-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(catatan.id)}
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
              {editingId ? "Edit Catatan Disiplin" : "Tambah Catatan Disiplin"}
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
              <label className="block mb-2">Catatan</label>
              <textarea
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="w-full p-2 border"
                rows="4"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Simpan Catatan Disiplin
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
