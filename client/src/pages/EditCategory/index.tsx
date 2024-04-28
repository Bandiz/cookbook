import { useParams } from 'react-router-dom';

export default function EditCategory() {
    const { category: categoryName } = useParams<{ category: string }>();
    console.log(categoryName);

    return <>{categoryName}</>;
}
