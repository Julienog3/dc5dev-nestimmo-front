'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCategory } from "@/services/category.service"

type Props = {
  setOpen: (open: boolean) => void;
}

const FormPost = ({ setOpen } : Props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories']
      })
      setOpen(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const createCategoryDTO = {
      name: e.target.name.value,
    }

    mutation.mutate(createCategoryDTO);
  }

    return ( 
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <Input 
            type="text" 
            placeholder="Nom de catégorie" 
            name="name"
          />
        </div>
        <div>
          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending && <span className="mr-4 h-4 w-4 rounded-full bg-white animate-pulse"></span>}
            Créer une catégorie
          </Button>
        </div>
      </form>
     );
}
 
export default FormPost;