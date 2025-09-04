import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { BarChart3, Hospital, PieChart, Stethoscope, User } from 'lucide-react';
import moment from 'moment';
import 'moment/locale/id';
import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import AuthLayout from '../../../Layouts/AuthLayout';

moment.locale('id');
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard({
    dokter_count,
    poli_count,
    pasien_count,
    offline_count,
    online_count,
    daily_queue_stats_klinik,
    daily_queue_stats_loket,
    monthly_queue_stats,
    yearly_queue_stats,
    daily_poli_stats,
    monthly_poli_stats,
}) {
    const [dailyChartData, setDailyChartData] = useState(null);
    const [dailyChartDataLoket, setDailyChartDataLoket] = useState(null);
    const [monthlyChartData, setMonthlyChartData] = useState(null);
    const [yearlyChartData, setYearlyChartData] = useState(null);
    const [dailyPieData, setDailyPieData] = useState(null);
    const [monthlyPieData, setMonthlyPieData] = useState(null);

    useEffect(() => {
        // Helper fungsi untuk chart
        const createBarChartData = (stats, label, color) => ({
            labels: stats.map((item) => moment(item.date).locale('id').format('DD')),
            datasets: [
                {
                    label,
                    data: stats.map((item) => item.count),
                    backgroundColor: color.background,
                    borderColor: color.border,
                    borderWidth: 1,
                },
            ],
        });

        // Daily Klinik
        if (daily_queue_stats_klinik.length > 0) {
            setDailyChartData(
                createBarChartData(daily_queue_stats_klinik, 'Antrian Klinik', {
                    background: 'rgba(54, 162, 235, 0.6)',
                    border: 'rgba(54, 162, 235, 1)',
                }),
            );
        }

        // Daily Loket
        if (daily_queue_stats_loket.length > 0) {
            setDailyChartDataLoket(
                createBarChartData(daily_queue_stats_loket, 'Antrian Loket', {
                    background: 'rgba(75, 192, 192, 0.6)',
                    border: 'rgba(75, 192, 192, 1)',
                }),
            );
        }

        // Monthly
        const monthLabels = moment.months(); // otomatis Januari s/d Desember
        const monthlyDataArray = monthLabels.map((_, i) => monthly_queue_stats[i + 1] || 0);

        setMonthlyChartData({
            labels: monthLabels,
            datasets: [
                {
                    label: 'Antrian Klinik',
                    data: monthlyDataArray,
                    backgroundColor: 'rgba(255, 159, 64, 0.6)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1,
                },
            ],
        });

        // Yearly
        if (yearly_queue_stats.length > 0) {
            setYearlyChartData({
                labels: yearly_queue_stats.map((item) => item.year.toString()),
                datasets: [
                    {
                        label: 'Antrian Klinik',
                        data: yearly_queue_stats.map((item) => item.count),
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        }

        // Pie charts
        const createPieData = (stats) => ({
            labels: stats.map((item) => `Poli ${item.nama}`),
            datasets: [
                {
                    data: stats.map((item) => item.count),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                    ],
                    borderWidth: 1,
                },
            ],
        });

        if (daily_poli_stats.length > 0) setDailyPieData(createPieData(daily_poli_stats));
        if (monthly_poli_stats.length > 0) setMonthlyPieData(createPieData(monthly_poli_stats));
    }, [daily_queue_stats_klinik, daily_queue_stats_loket, monthly_queue_stats, yearly_queue_stats, daily_poli_stats, monthly_poli_stats]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom', // pastikan 'bottom'
                labels: {
                    font: { size: 12 },
                },
            },
            title: { display: true },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };

    const statsCard = (icon, count, label, date = null, bgColor = 'bg-white') => (
        <div className={`flex items-center justify-between rounded-lg ${bgColor} px-5 py-4 shadow transition-shadow duration-200 hover:shadow-lg`}>
            {icon}
            <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-gray-700">{label}</p>
                {date && <p className="text-xs text-gray-400">{moment(date).locale('id').format('D MMMM YYYY')}</p>}
            </div>
        </div>
    );

    return (
        <AuthLayout title={'Dashboard'}>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Selamat Datang Petugas</h1>
                <p className="mt-2 text-gray-600">Silahkan melakukan pengelolaan data melalui dashboard berikut.</p>
            </div>

            {/* Statistik Dasar */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {statsCard(<Stethoscope className="h-8 w-8 text-blue-500" />, dokter_count, 'Jumlah Dokter')}
                {statsCard(<Hospital className="h-8 w-8 text-green-500" />, poli_count, 'Jumlah Poli')}
                {statsCard(<User className="h-8 w-8 text-purple-500" />, pasien_count, 'Jumlah Pasien')}
                {statsCard(<Hospital className="h-8 w-8 text-red-500" />, offline_count, 'Jumlah Antrian Offline', new Date())}
                {statsCard(<User className="h-8 w-8 text-yellow-500" />, online_count, 'Jumlah Antrian Online', new Date())}
            </div>

            {/* Grafik Antrian */}
            <div className="grid gap-2 md:grid-cols-3">
                <ChartCard title="Antrian Harian Klinik" icon={<BarChart3 className="mr-2" />} data={dailyChartData} chartType="bar" />
                <ChartCard title="Antrian Harian Loket" icon={<BarChart3 className="mr-2" />} data={dailyChartDataLoket} chartType="bar" />
                <ChartCard
                    title={`Antrian Bulanan ${moment().locale('id').format('YYYY')}`}
                    icon={<BarChart3 className="mr-2" />}
                    data={monthlyChartData}
                    chartType="bar"
                />
                <ChartCard title="Antrian Tahunan" icon={<BarChart3 className="mr-2" />} data={yearlyChartData} chartType="bar" />
                <ChartCard title="Statistik Poli Harian" icon={<PieChart className="mr-2" />} data={dailyPieData} chartType="pie" />
                <ChartCard title="Statistik Poli Bulanan" icon={<PieChart className="mr-2" />} data={monthlyPieData} chartType="pie" colSpan={1} />
            </div>
        </AuthLayout>
    );
}

// Komponen ChartCard agar lebih rapi
function ChartCard({ title, icon, data, chartType = 'bar', colSpan = 1 }) {
    return (
        <div className={`rounded-lg bg-white p-5 shadow ${colSpan > 1 ? 'md:col-span-2' : ''}`}>
            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                {icon}
                {title}
            </h3>
            <div className="h-64">
                {data ? (
                    chartType === 'bar' ? (
                        <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
                    ) : (
                        <Pie data={data} options={{ responsive: true, maintainAspectRatio: false }} />
                    )
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">Tidak ada data</div>
                )}
            </div>
        </div>
    );
}
