'use client'

import { fetchAllPosts } from "@/services/post.service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const PostList = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['getAllPosts'],
        queryFn: fetchAllPosts
    })

    if(isPending) return <div className="h-full flex justify-center items-center">Chargement...</div>

    return ( 
        <div>
            <h2 className="text-4xl font-bold my-5 text-cyan-700">
                Liste des posts
            </h2>

            {data.length && <div className="grid grid-cols-4 gap-2">
                {data?.map((post: any) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
                        <Link href={`/posts/${post.id}`}>
                            <h3 className="text-lg font-medium mb-2">{post.title}</h3>
                        </Link>
                        <p className="text-gray-500">{post.description}</p>
                    </div>
                ))}
            </div>}
        </div>
     );
}
 
export default PostList;