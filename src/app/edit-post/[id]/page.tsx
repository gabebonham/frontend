import PostForm from '@/components/application/PostForm';
import { MOCK_POSTS, MOCK_USER } from '@/lib/mockData';
import { notFound } from 'next/navigation';

async function getPost(id: string) {
	const post = await fetch('http://localhost:3030/api/posts/' + id, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${MOCK_USER.id}`,
		},
	});
	if (!post) {
		notFound();
	}
	return post.json();
}

export default async function EditPost({ params }: { params: { id: string } }) {
	const post = await getPost(params.id);

	return (
		<div className="max-w-7xl itenms-center mx-auto">
			<h1 className="text-3xl font-bold mb-6">Edit Post</h1>
			<PostForm post={post} />
		</div>
	);
}
