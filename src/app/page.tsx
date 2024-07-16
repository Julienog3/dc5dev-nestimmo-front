import PostList from "@/components/post/PostList";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-10">
        <PostList />
        <Link href="/categories">Catégories</Link>
    </div>
  );
}
