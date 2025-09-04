import { Link } from '@inertiajs/react';

export default function Links({ active = false, icon, name, ...props }) {
    return (
        <Link
            {...props}
            className={`flex w-full items-center gap-3 rounded-md px-4 py-2 text-sm font-medium ${active ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:border hover:border-gray-300/50 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm'} `}
        >
            <span className="text-base">{icon}</span>
            <span>{name}</span>
        </Link>
    );
}
