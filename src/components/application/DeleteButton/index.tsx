'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MOCK_POSTS } from '@/lib/mockData';
import { Trash2 } from 'lucide-react';
import { MOCK_USER } from '../User';

export default function DeleteButton({ postId }: { postId: string }) {
	const [isDeleting, setIsDeleting] = useState(false);
	const router = useRouter();

	const handleDelete = async () => {
		if (confirm('Are you sure you want to delete this post?')) {
			const response = await fetch(
				'http://localhost:3030/api/posts/' + postId,
				{
					method: 'DELETE',
					headers: {
						'Content-Type':
							'application/json',
						Authorization: MOCK_USER.id,
					},
				},
			).then((data) => data.json());
			router.push('/my-posts');
		}
	};

	return (
		<button
			onClick={handleDelete}
			disabled={isDeleting}
			className="flex items-center text-red-500 hover:text-red-600 disabled:opacity-50 transition-colors duration-200"
		>
			<Trash2 className="h-4 w-4 mr-1" />
			<span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
		</button>
	);
}
