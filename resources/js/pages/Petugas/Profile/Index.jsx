import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthLayout from '../../../../Layouts/AuthLayout';

export default function Index({ profile }) {
    const { data, setData, post, processing, errors } = useForm({
        nama_klinik: profile?.nama_klinik || '',
        alamat: profile?.alamat || '',
        logo: null,
        deskripsi: profile?.deskripsi || '',
    });

    console.log(profile);

    const [previewImage, setPreviewImage] = useState(profile?.logo ? `/storage/${profile.logo}` : null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('logo', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('profile-klinik.update'), {
            forceFormData: true,
            onSuccess: () => {
                setData('logo', null);
            },
        });
    };

    return (
        <AuthLayout title={'Profile Klinik'}>
            <div className="mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Profile Klinik</h1>
                    <p className="mt-2 text-gray-600">Kelola informasi identitas klinik Anda untuk tampilan yang profesional</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Informasi Klinik */}
                    <div className="flex flex-col items-start gap-3 space-y-8 md:flex-row">
                        <div className="w-full rounded-lg border border-gray-200 bg-white shadow-md">
                            <div className="border-b border-gray-300/50 px-6 py-4">
                                <h2 className="text-xl font-semibold text-gray-900">Informasi Klinik</h2>
                            </div>
                            <div className="space-y-6 p-6">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Nama Klinik</label>
                                    <input
                                        type="text"
                                        value={data.nama_klinik}
                                        onChange={(e) => setData('nama_klinik', e.target.value)}
                                        className="w-full rounded-md border border-gray-300/50 px-3 py-2 text-black"
                                    />
                                    {errors.nama_klinik && <p className="mt-1 text-sm text-red-500">{errors.nama_klinik}</p>}
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Alamat Klinik</label>
                                    <input
                                        type="text"
                                        value={data.alamat}
                                        onChange={(e) => setData('alamat', e.target.value)}
                                        className="w-full rounded-md border border-gray-300/50 px-3 py-2 text-black"
                                    />
                                    {errors.alamat && <p className="mt-1 text-sm text-red-500">{errors.alamat}</p>}
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Deskripsi Klinik</label>
                                    <textarea
                                        value={data.deskripsi}
                                        onChange={(e) => setData('deskripsi', e.target.value)}
                                        rows={4}
                                        className="w-full rounded-md border border-gray-300/50 px-3 py-2 text-black"
                                    />
                                    {errors.deskripsi && <p className="mt-1 text-sm text-red-500">{errors.deskripsi}</p>}
                                </div>
                            </div>
                        </div>
                        {/* Logo Klinik */}
                        <div className="w-full rounded-lg border border-gray-200 bg-white shadow-md">
                            <div className="border-b border-gray-300/50 px-6 py-4">
                                <h2 className="text-xl font-semibold text-gray-900">Logo Klinik</h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Upload Logo</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="w-full rounded-md border border-gray-300/50 px-3 py-2 text-black"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">Format: JPG, PNG, SVG. Ukuran maksimal: 2MB</p>
                                        {errors.logo && <p className="mt-1 text-sm text-red-500">{errors.logo}</p>}
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Preview Logo</label>
                                        {previewImage ? (
                                            <img
                                                src={previewImage}
                                                alt="Logo Preview"
                                                className="h-48 w-full rounded-lg border border-gray-300/50 object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                                                <span className="text-gray-500">Preview logo</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {Object.keys(errors).length > 0 && (
                        <div className="rounded-md border border-red-200 bg-red-50 p-4">
                            <p className="text-sm text-red-600">Terdapat kesalahan dalam form. Silakan periksa kembali data yang Anda masukkan.</p>
                        </div>
                    )}
                </form>
            </div>
        </AuthLayout>
    );
}
