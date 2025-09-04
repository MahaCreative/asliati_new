import { useEffect } from 'react';
import QRCode from 'react-qr-code';

const CetakStruk = ({ antrian, profile }) => {
    const formatTanggal = (tanggal) => {
        return new Date(tanggal).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    useEffect(() => {
        window.print();

        const handleAfterPrint = () => {
            window.history.back(); // Kembali ke halaman sebelumnya
        };

        window.addEventListener('afterprint', handleAfterPrint);

        return () => {
            window.removeEventListener('afterprint', handleAfterPrint);
        };
    }, []);

    return (
        <div
            style={{
                width: '250px', // ukuran printer thermal POS
                fontFamily: 'monospace',
                padding: '10px',
                margin: '0 auto',
                textAlign: 'center',
                backgroundColor: 'white',
                color: 'black',
            }}
        >
            {/* Logo Klinik */}
            <img src={`/storage/${profile.logo}`} alt="Logo Klinik" style={{ width: 60, height: 60, margin: '0 auto', objectFit: 'contain' }} />

            {/* Nama dan Alamat */}
            <h2 style={{ margin: '2px 0', fontSize: '16px' }}>{profile.nama_klinik}</h2>
            <p style={{ fontSize: '12px', marginBottom: '6px' }}>{profile.alamat}</p>

            <hr style={{ borderTop: '1px dashed #000', margin: '10px 0' }} />

            {/* Tanggal */}
            <p style={{ fontSize: '12px', marginBottom: '5px' }}>Tanggal: {formatTanggal(antrian.created_at)}</p>

            {/* Poli Tujuan */}
            <p style={{ fontSize: '12px', marginBottom: '5px' }}>Poli: {antrian.poli?.nama || 'Umum'}</p>

            {/* Nomor Antrian */}
            <h1 style={{ fontSize: '40px', margin: '10px 0' }}>{antrian.kode_antrian}</h1>

            <hr style={{ borderTop: '1px dashed #000', margin: '10px 0' }} />

            <div
                style={{
                    margin: '10px 0',
                    display: 'flex',
                    justifyContent: 'center', // ⬅️ ini yang penting agar QR code di tengah
                }}
            >
                <QRCode value={antrian.kode_antrian} size={80} />
            </div>

            {/* Pesan */}
            <p style={{ fontSize: '10px', marginTop: '10px' }}>
                Terima kasih telah mendaftar. Silakan menunggu panggilan Anda. Harap tunjukkan struk ini kepada petugas saat dipanggil.
            </p>

            <hr style={{ borderTop: '1px dashed #000', margin: '10px 0' }} />
            <p style={{ fontSize: '10px' }}>- Sistem Antrian Klinik -</p>
        </div>
    );
};

export default CetakStruk;
