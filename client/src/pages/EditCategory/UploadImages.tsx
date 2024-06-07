import { UploadOutlined } from '@ant-design/icons';
import { Button, Image, Space, Upload } from 'antd';
import { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { CategoryKey } from '../../api/apiQueryKeys';
import { useUpdateCategoryMutation } from '../../api/categories';
import { Category } from '../../types';
import { UploadImageResponse } from '../../api/images/types';

interface UploadImagesProps {
    category: Category;
}

export default function UploadImages({ category }: UploadImagesProps) {
    const [currentImage, setCurrentImage] = useState(0);
    const { mutate: updateCategory } = useUpdateCategoryMutation();
    const queryClient = useQueryClient();

    const imagesPreview = useMemo(() => {
        if (!category) {
            return {};
        }
        return {
            movable: false,
            toolbarRender() {
                const isMainImage = category.images[currentImage] === category.mainImage;
                return (
                    <Button
                        type="primary"
                        disabled={isMainImage}
                        onClick={() => {
                            updateCategory({
                                categoryName: category.categoryName,
                                mainImage: category.images[currentImage],
                            });
                        }}
                    >
                        {isMainImage ? 'Current main image' : 'Select as main image'}
                    </Button>
                );
            },
            onChange(current: number) {
                setCurrentImage(current);
            },
            onVisibleChange(_value: boolean, _prevValue: boolean, current: number) {
                setCurrentImage(current);
            },
        };
    }, [category, currentImage]);

    return (
        <Image.PreviewGroup preview={imagesPreview}>
            <Space>
                {category.images.map((imageId) => (
                    <Image key={imageId} style={{ maxWidth: 200 }} src={`/api/image/${imageId}`} />
                ))}
                <Upload<UploadImageResponse>
                    method="post"
                    action="/api/image"
                    listType="picture"
                    maxCount={8}
                    multiple
                    data={(file) => ({ files: file, categoryName: category.categoryName })}
                    showUploadList={false}
                    onChange={(info) => {
                        if (!info.file.response || info.file.error || info.file.response.warnings.length) {
                            return;
                        }

                        queryClient.invalidateQueries([CategoryKey, category.categoryName]);
                    }}
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Space>
        </Image.PreviewGroup>
    );
}
