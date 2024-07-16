'use client'

import DialogConfirmDelete from "@/components/globals/DialogConfirmDelete";
import { useToast } from "@/components/ui/use-toast";
import { deleteCategory, fetchCategoryById } from "@/services/category.service";
import { deletePost, fetchPostById } from "@/services/post.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

type DetailCategoryParams = {
    id: string;
}

const PostDetail = () => {
    const { id } = useParams<DetailCategoryParams>();
    const router = useRouter();
    const { toast } = useToast()

    const { isPending, error, data } = useQuery({
        queryKey: ['category'],
        queryFn: () => fetchCategoryById(id)
    })

    const mutation = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            toast({
                title: 'Catégorie supprimée',
                description: 'Votre catégorie a bien été supprimé'
            })
            router.push('/')
        },
        onError: () => {
            toast({
                title: 'Une erreur est survenu',
                description: 'Votre catégorie n\'a pas pu être supprimé'
            })
            router.push('/')
        }
    });

    const handleDelete = () => {
        mutation.mutate(id);
    }

    if(isPending) return <div className="h-full flex justify-center items-center">Chargement...</div>
    
    return ( 
        <div>
            <h1>{data?.name}</h1>
            <DialogConfirmDelete 
                handleDelete={handleDelete} 
                isPending={mutation.isPending}
            />
        </div>
     );
}
 
export default PostDetail;