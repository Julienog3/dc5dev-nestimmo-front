import { Category, CategoryCreateDTO } from "@/types/category";
import { CATEGORY_ENDPOINT } from "@/utils/constants";

export const fetchAllCategories = async (): Promise<Category[]> => {
    const response = await fetch(CATEGORY_ENDPOINT);
    return await response.json();
}

export const fetchCategoryById = async (id: string): Promise<Category> => {
    const response = await fetch(`${CATEGORY_ENDPOINT}/${id}`);
    return await response.json();
}

export const createCategory = async (createCategoryDTO: CategoryCreateDTO) => {
  const response = await fetch(CATEGORY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createCategoryDTO)
  });
  return await response.json();

}

export const deleteCategory = async (id: string) => {
  const response = await fetch(`${CATEGORY_ENDPOINT}/${id}`, {
    method: 'DELETE'
  });
  const data = await response.json();

  if (data.statusCode === 500) {
    throw new Error(data.message)
  }
  
  return data;
}