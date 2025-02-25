import PostForm from '@/components/application/PostForm';
import { Post } from '@/components/application/User';
import { MOCK_POSTS, MOCK_USER } from '@/lib/mockData';
import { notFound } from 'next/navigation';
type Params = Promise<{ id: string }>;
async function getPost(id: string) {
	const post = await fetch(
		'https://challenge-phi-ten.vercel.app/api/posts/' + id,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${MOCK_USER.id}`,
			},
		},
	);
	if (!post) {
		notFound();
	}
	return await post.json();
}

export default async function EditPost(props: { params: Params }) {
	const { id } = await props.params;
	const post = await getPost(id);

	return (
		<div className="max-w-7xl itenms-center mx-auto">
			<h1 className="text-3xl font-bold mb-6">Edit Post</h1>
			<PostForm post={post} />
		</div>
	);
}
