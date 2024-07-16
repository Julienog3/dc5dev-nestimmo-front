'use client'

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { createPost } from "@/services/post.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchAllCategories } from "@/services/category.service"
import { useState } from "react"

type FormPostProps = {
    setOpen: (open: boolean) => void;
}

const FormPost = ({ setOpen } : FormPostProps) => {
    const queryClient = useQueryClient();
    const { isPending, error, data: categories } = useQuery({
      queryKey: ['categories'],
      queryFn: fetchAllCategories
    })
    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getAllPosts']
            })
            setOpen(false);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const createPostDTO = {
            title: e.target.title.value,
            description: e.target.description.value,
            category: +e.target.category.value,
        }

        mutation.mutate(createPostDTO);
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <Input 
                    type="text" 
                    placeholder="Post title" 
                    name="title"
                />
            </div>
            {categories && <div className="mb-2">
                <Select id="category" name="category">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => {
                            return <SelectItem key={category.id} value={category.id.toString()} >{category.name}</SelectItem>
                        })}
                    </SelectContent>
                </Select>
            </div>}
            <div className="mb-2">
                <Textarea 
                    placeholder="Post description"
                    name="description"
                />
            </div>
            <div>
                <Button type="submit" className="w-full" disabled={mutation.isPending}>
                    {mutation.isPending && <span className="mr-4 h-4 w-4 rounded-full bg-white animate-pulse"></span>}
                    Créer le post
                </Button>
            </div>
        </form>
     );
}
 
export default FormPost;