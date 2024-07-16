import CategoryList from "@/components/category/CategoryList";
import DrawerCategory from "@/components/category/DrawerCategory";

export default function Categories() {
  return (
    <div className="px-10">
      <CategoryList />
      <DrawerCategory />
    </div>
  );
}
