import { router } from '@inertiajs/react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { CircleX } from 'lucide-react';
import { useState } from 'react';
import AuthLayout from '../../../../Layouts/AuthLayout';
export default function Index({ loket, jenis_antrian }) {
    const [formJenis, setFormJenis] = useState({ id: '', nama_jenis_antrian: '', prefix: '' });
    const [errorJenis, setErrorJenis] = useState([]);
    const [formLoket, setFormLoket] = useState({
        id: '',
        nama: '',
        jenis_antrian_id: '',
    });
    const [errorLoket, setErrorLoket] = useState([]);
    const changeStatusJenis = (id, status) => {
        router.post(route('petugas.loket-jenis-antrian.update_status_jenis'), { id: id, status: status });
    };
    const changeStatusLoket = (id, status) => {
        router.post(route('petugas.loket-jenis-antrian.update_status_loket'), { id: id, status: status });
    };
    const editJenis = (item) => {
        setErrorJenis([]);
        setFormJenis({ ...formJenis, id: item.id, nama_jenis_antrian: item.nama, prefix: item.prefix });
    };
    const handleSubmitJenis = () => {
        if (formJenis.id == '') {
            router.post(
                route('petugas.loket-jenis-antrian.store_jenis'),
                { nama: formJenis.nama_jenis_antrian, prefix: formJenis.prefix },
                {
                    onStart: () => {
                        setErrorJenis('');
                    },
                    onSuccess: () => {
                        setFormJenis({ ...formJenis, nama_jenis_antrian: '', prefix: '', id: '' });
                        setErrorJenis('');
                    },
                    onError: (err) => {
                        console.log(err);

                        setErrorJenis({ ...errorJenis, nama: err?.nama, prefix: err?.prefix });
                    },
                },
            );
        } else {
            router.post(
                route('petugas.loket-jenis-antrian.update_jenis'),
                { id: formJenis.id, nama: formJenis.nama_jenis_antrian, prefix: formJenis.prefix },
                {
                    onStart: () => {
                        setErrorJenis('');
                    },
                    onSuccess: () => {
                        setFormJenis({ ...formJenis, nama_jenis_antrian: '', prefix: '', id: '' });
                        setErrorJenis('');
                    },
                    onError: (err) => {
                        console.log(err);

                        setErrorJenis({ ...errorJenis, nama: err?.nama, prefix: err?.prefix });
                    },
                },
            );
        }
    };
    const handleDeleteJenis = (id) => {
        router.delete(route('petugas.loket-jenis-antrian.destroy_jenis', { id: id }));
    };

    const editLoket = (item) => {
        setFormLoket({ ...formLoket, id: item.id, nama: item.nama, jenis_antrian_id: item.jenis_antrian_id });
    };
    const handleDeleteLoket = (id) => {
        router.delete(route('petugas.loket-jenis-antrian.destroy_loket', { id: id }));
    };
    const handleSubmitLoket = () => {
        if (formLoket.id == '') {
            router.post(
                route('petugas.loket-jenis-antrian.store_loket'),
                { ...formLoket },
                {
                    onStart: () => {
                        setErrorLoket([]);
                    },
                    onSuccess: () => {
                        setFormLoket({ ...formLoket, id: '', nama: '', jenis_antrian_id: '' });
                        setErrorLoket([]);
                    },
                    onError: (err) => {
                        console.log(err);

                        setErrorLoket({ ...errorLoket, nama: err?.nama, jenis_antrian_id: err?.jenis_antrian_id });
                    },
                },
            );
        } else {
            router.post(
                route('petugas.loket-jenis-antrian.update_loket'),
                { ...formLoket },
                {
                    onStart: () => {
                        setErrorLoket([]);
                    },
                    onSuccess: () => {
                        setFormLoket({ ...formLoket, id: '', nama: '', jenis_antrian_id: '' });
                        setErrorLoket([]);
                    },
                    onError: (err) => {
                        console.log(err);

                        setErrorLoket({ ...errorLoket, nama: err?.nama, jenis_antrian_id: err?.jenis_antrian_id });
                    },
                },
            );
        }
    };

    return (
        <AuthLayout title={'Loket Dan Jenis Antrian'}>
            <div className="mx-auto max-w-7xl px-4 py-8 md:px-3">
                <div className="my-3 flex justify-end"></div>
                <div className="grid gap-3 lg:grid-cols-2">
                    <div>
                        {/* Header */}
                        <div className="mb-3 flex flex-col items-start justify-start gap-1 sm:items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Data Jenis Antrian</h1>
                                <p className="mt-2 text-gray-600">Kelola Jenis Antrian Klinik Anda</p>
                            </div>
                            <div className="item-start flex w-full flex-col justify-between gap-1 md:flex-row">
                                <div>
                                    <label htmlFor="nama_poli" className="block text-sm font-medium text-gray-700">
                                        Nama Jenis Antrian <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="nama_poli"
                                        value={formJenis.nama_jenis_antrian}
                                        onChange={(e) => setFormJenis({ ...formJenis, nama_jenis_antrian: e.target.value })}
                                        className={`mt-1 block w-full rounded-md border px-3 py-2 text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none ${
                                            errorJenis?.nama ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="Contoh: BPJS, Antrian Umum"
                                    />
                                    {errorJenis?.nama && <p className="mt-1 text-sm text-red-600">{errorJenis?.nama}</p>}
                                </div>
                                <div>
                                    <label htmlFor="nama_poli" className="block text-sm font-medium text-gray-700">
                                        Prefix Antrian <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="nama_poli"
                                        value={formJenis.prefix}
                                        maxLength="1"
                                        onChange={(e) => setFormJenis({ ...formJenis, prefix: e.target.value })}
                                        className={`mt-1 block w-full rounded-md border px-3 py-2 text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none ${
                                            errorJenis?.prefix ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="Contoh: A,B,C "
                                    />
                                    <p className="text-sm text-gray-400">Digunakan untuk antrian loket</p>
                                    {errorJenis?.prefix && <p className="mt-1 text-sm text-red-600">{errorJenis?.prefix}</p>}
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={handleSubmitJenis}
                                    type="button"
                                    className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:cursor-pointer hover:bg-blue-700"
                                >
                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    {formJenis.id == '' ? 'Tambah' : 'Update'}
                                </button>
                                {formJenis.id && (
                                    <button
                                        onClick={() => setFormJenis({ ...formJenis, id: '', nama_jenis_antrian: '', prefix: '' })}
                                        type="button"
                                        className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
                                    >
                                        <CircleX />
                                        Cancell
                                    </button>
                                )}
                            </div>
                        </div>
                        {/* Table */}
                        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">#</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Nama Jenis Antrian
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Prefix</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>

                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {jenis_antrian.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center">
                                                    <div className="text-gray-500">
                                                        <svg
                                                            className="mx-auto h-12 w-12 text-gray-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                            />
                                                        </svg>
                                                        <p className="mt-2 text-sm">
                                                            {searchTerm ? 'Tidak ada hasil pencarian' : 'Belum ada data poli'}
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            jenis_antrian.map((item, index) => (
                                                <tr key={item.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{index + 1}</td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                                                        <div className="font-medium">{item.nama}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 uppercase">
                                                            {item.prefix}
                                                        </span>
                                                    </td>
                                                    <td className="line-clamp-2 px-6 py-4 text-sm text-gray-900">
                                                        {/* <div className="font-medium">{item.status_aktif ? 'Aktif' : 'Non-Aktif'}</div>
                                                         */}
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    onChange={(e) => changeStatusJenis(item.id, e.target.checked)}
                                                                    checked={item.status_aktif}
                                                                />
                                                            }
                                                            label={item.status_aktif ? 'Aktif' : 'Non'}
                                                        />
                                                    </td>

                                                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                        {item.prefix !== 'A' && (
                                                            <>
                                                                {item.prefix !== 'B' && (
                                                                    <div className="flex items-center space-x-3">
                                                                        <button
                                                                            onClick={() => editJenis(item)}
                                                                            className="text-indigo-600 hover:text-indigo-900"
                                                                        >
                                                                            <svg
                                                                                className="h-4 w-4"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                viewBox="0 0 24 24"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDeleteJenis(item.id)}
                                                                            className="text-red-600 hover:cursor-pointer hover:text-red-900"
                                                                        >
                                                                            <svg
                                                                                className="h-4 w-4"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                viewBox="0 0 24 24"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* Header */}
                        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Data Loket</h1>
                                <p className="mt-2 text-gray-600">Kelola daftar loket klinik Anda</p>
                                <div className="w-full">
                                    <div className="flex w-full flex-row justify-between gap-3">
                                        <div>
                                            <label htmlFor="nama_poli" className="block text-sm font-medium text-gray-700">
                                                Nama Loket <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="nama"
                                                value={formLoket.nama}
                                                onChange={(e) => setFormLoket({ ...formLoket, nama: e.target.value })}
                                                className={`mt-1 block w-full rounded-md border px-3 py-2 text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none ${
                                                    errorLoket?.nama ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                                placeholder="Contoh: 1,2, BPJS, Rujukan"
                                            />
                                            {errorLoket?.nama && <p className="mt-1 text-sm text-red-600">{errorLoket?.nama}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="nama_poli" className="block text-sm font-medium text-gray-700">
                                                Jenis Antrian <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="nama"
                                                value={formLoket.jenis_antrian_id}
                                                onChange={(e) => setFormLoket({ ...formLoket, jenis_antrian_id: e.target.value })}
                                                className={`mt-1 block w-full rounded-md border px-3 py-2 text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none ${
                                                    errorLoket?.jenis_antrian_id ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                            >
                                                <option value="">Pilih Jenis Antrian</option>
                                                {jenis_antrian.map((item, key) => (
                                                    <option className="uppercase" key={key} value={item.id}>
                                                        {item.nama}
                                                    </option>
                                                ))}
                                            </select>
                                            {errorLoket?.jenis_antrian_id && (
                                                <p className="mt-1 text-sm text-red-600">{errorLoket?.jenis_antrian_id}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="my-2 flex gap-1">
                                        <button
                                            onClick={handleSubmitLoket}
                                            type="button"
                                            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:cursor-pointer hover:bg-blue-700"
                                        >
                                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            {formLoket.id == '' ? 'Tambah' : 'Update'}
                                        </button>
                                        {formLoket.id && (
                                            <button
                                                onClick={() => setFormLoket({ ...formLoket, id: '', nama: '', jenis_antrian_id: '' })}
                                                type="button"
                                                className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
                                            >
                                                <CircleX />
                                                Cancell
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Table */}
                        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">#</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Nama Loket
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Loket For
                                            </th>

                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {loket.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center">
                                                    <div className="text-gray-500">
                                                        <svg
                                                            className="mx-auto h-12 w-12 text-gray-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                            />
                                                        </svg>
                                                        <p className="mt-2 text-sm">
                                                            {searchTerm ? 'Tidak ada hasil pencarian' : 'Belum ada data poli'}
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            loket.map((item, index) => (
                                                <tr key={item.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{index + 1}</td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                                                        <div className="font-medium">{item.nama}</div>
                                                    </td>
                                                    <td className="line-clamp-2 px-6 py-4 text-sm text-gray-900">
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    onChange={(e) => changeStatusLoket(item.id, e.target.checked)}
                                                                    checked={item.status_aktif}
                                                                />
                                                            }
                                                            label={item.status_aktif ? 'Aktif' : 'Non'}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                            {item.jenis.nama}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                        <div className="flex items-center space-x-3">
                                                            <button
                                                                onClick={() => editLoket(item)}
                                                                className="text-indigo-600 hover:cursor-pointer hover:text-indigo-900"
                                                            >
                                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteLoket(item.id)}
                                                                className="text-red-600 hover:cursor-pointer hover:text-red-900"
                                                            >
                                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
