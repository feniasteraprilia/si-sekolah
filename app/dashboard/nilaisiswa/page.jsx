"use client";

import { useState } from "react";

const initialDataNilai = [
  {
    id: 1,
    nama: "Budi",
    kelas: "10",
    mataPelajaran: "Matematika",
    nilai: 85,
    periode: "Semester 1",
  },
  {
    id: 2,
    nama: "Siti",
    kelas: "11",
    mataPelajaran: "Bahasa Indonesia",
    nilai: 90,
    periode: "Semester 1",
  },
  {
    id: 3,
    nama: "Agus",
    kelas: "12",
    mataPelajaran: "Fisika",
    nilai: 75,
    periode: "Semester 2",
  },
  // Data siswa lainnya...
];

export default function NilaiSiswaPage() {
  const [dataNilai, setDataNilai] = useState(initialDataNilai);
  const [kelas, setKelas] = useState("");
  const [mataPelajaran, setMataPelajaran] = useState("");
  const [periode, setPeriode] = useState("");
  const [nama, setNama] = useState("");
  const [nilai, setNilai] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const filteredData = dataNilai.filter((nilai) => {
    return (
      (kelas ? nilai.kelas === kelas : true) &&
      (mataPelajaran ? nilai.mataPelajaran === mataPelajaran : true) &&
      (periode ? nilai.periode === periode : true)
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const nilaiBaru = {
      id: editingId || Date.now(),
      nama,
      kelas,
      mataPelajaran,
      nilai: parseInt(nilai),
      periode,
    };

    if (nilaiBaru.nilai < 0 || nilaiBaru.nilai > 100) {
      alert("Nilai harus antara 0 dan 100");
      return;
    }

    if (editingId) {
      // bagian edit
      const updatedData = dataNilai.map((item) =>
        item.id === editingId ? nilaiBaru : item
      );
      setDataNilai(updatedData);
    } else {
      // tambah data baru
      setDataNilai([...dataNilai, nilaiBaru]);
    }

    // Reset form
    setNama("");
    setKelas("");
    setMataPelajaran("");
    setNilai("");
    setPeriode("");
    setEditingId(null);
    setIsFormVisible(false);
  };

  const handleEdit = (nilai) => {
    setNama(nilai.nama);
    setKelas(nilai.kelas);
    setMataPelajaran(nilai.mataPelajaran);
    setNilai(nilai.nilai);
    setPeriode(nilai.periode);
    setEditingId(nilai.id);
    setIsFormVisible(true);
  };

  const handleDelete = (id) => {
    const updatedData = dataNilai.filter((item) => item.id !== id);
    setDataNilai(updatedData);
  };

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Halaman Nilai Siswa
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
            <label>Mata Pelajaran: </label>
            <select
              value={mataPelajaran}
              onChange={(e) => setMataPelajaran(e.target.value)}
              className="border p-2"
            >
              <option value="">Semua</option>
              <option value="Matematika">Matematika</option>
              <option value="Bahasa Indonesia">Bahasa Indonesia</option>
              <option value="Fisika">Fisika</option>
              {/* Tambahkan mata pelajaran lainnya... */}
            </select>
          </div>
          <div>
            <label>Periode: </label>
            <select
              value={periode}
              onChange={(e) => setPeriode(e.target.value)}
              className="border p-2"
            >
              <option value="">Semua</option>
              <option value="Semester 1">Semester 1</option>
              <option value="Semester 2">Semester 2</option>
              {/* Tambahkan periode lainnya... */}
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-green-500 text-white p-2 rounded"
        >
          Tambah Nilai
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Kelas</th>
              <th className="px-4 py-2">Mata Pelajaran</th>
              <th className="px-4 py-2">Nilai</th>
              <th className="px-4 py-2">Periode</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((nilai) => (
              <tr key={nilai.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{nilai.nama}</td>
                <td className="border px-4 py-2">{nilai.kelas}</td>
                <td className="border px-4 py-2">{nilai.mataPelajaran}</td>
                <td className="border px-4 py-2">{nilai.nilai}</td>
                <td className="border px-4 py-2">{nilai.periode}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(nilai)}
                    className="bg-blue-500 text-white p-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(nilai.id)}
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
              {editingId ? "Edit Nilai" : "Tambah Nilai"}
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
              <label className="block mb-2">Mata Pelajaran</label>
              <select
                value={mataPelajaran}
                onChange={(e) => setMataPelajaran(e.target.value)}
                className="w-full p-2 border"
                required
              >
                <option value="">Pilih Mata Pelajaran</option>
                <option value="Matematika">Matematika</option>
                <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                <option value="Fisika">Fisika</option>
                {/* Tambahkan mata pelajaran lainnya... */}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Nilai</label>
              <input
                type="number"
                value={nilai}
                onChange={(e) => setNilai(e.target.value)}
                className="w-full p-2 border"
                min="0"
                max="100"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Periode</label>
              <select
                value={periode}
                onChange={(e) => setPeriode(e.target.value)}
                className="w-full p-2 border"
                required
              >
                <option value="">Pilih Periode</option>
                <option value="Semester 1">Semester 1</option>
                <option value="Semester 2">Semester 2</option>
                {/* Tambahkan periode lainnya... */}
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Simpan Nilai
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
