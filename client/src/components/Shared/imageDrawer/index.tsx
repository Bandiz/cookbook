import { Button, Drawer, FormInstance, Image, message, Space, Typography } from 'antd';
import React from 'react';
import { useImagesByCategory } from '../../../api/admin/image/useImagesByCategory';

interface ImageDrawerProps {
    form: FormInstance;
    onClose: () => void;
    open: boolean;
    setCurrentImage: (id: string) => void;
}

function getImageId(imageUrl: string) {
    const parts = imageUrl.split('/');
    return parts[parts.length - 1];
}

export function ImageDrawer({ form, onClose, open, setCurrentImage }: ImageDrawerProps) {
    const { data: images, isError, isLoading } = useImagesByCategory();

    if (!images) {
        isError && message.error('Failed to load images');
        return null;
    }

    return (
        <Drawer title="Main Images" onClose={onClose} open={open} loading={isLoading}>
            <Image.PreviewGroup
                preview={{
                    toolbarRender: (_, info) => {
                        const imageId = getImageId(info.image.url);
                        return (
                            <Button
                                type="primary"
                                disabled={imageId === form.getFieldValue('mainImage')}
                                onClick={() => {
                                    setCurrentImage(imageId);
                                    form.setFieldValue('mainImage', imageId);
                                    onClose();
                                    info.actions.onClose();
                                }}
                            >
                                Select as main image
                            </Button>
                        );
                    },
                }}
            >
                <Space direction="vertical" size="middle">
                    <Typography.Text strong>Uncategorized images</Typography.Text>
                    <Space direction="horizontal" size="small">
                        {images.uncategorizedImages.map((image) => {
                            return (
                                <Image
                                    key={image}
                                    src={`/api/image/${image}/preview`}
                                    preview={{ src: `/api/image/${image}` }}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        objectFit: 'cover',
                                    }}
                                />
                            );
                        })}
                    </Space>

                    {images.categories.map((category) => {
                        const { categoryName, imageIds } = category;
                        return (
                            <React.Fragment key={categoryName}>
                                <Typography.Text strong>{categoryName}</Typography.Text>
                                <Space direction="horizontal" size="small">
                                    {imageIds.map((id) => {
                                        return (
                                            <Image
                                                key={id}
                                                src={`/api/image/${id}/preview`}
                                                preview={{ src: `/api/image/${id}` }}
                                                style={{
                                                    width: '100px',
                                                    height: '100px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        );
                                    })}
                                </Space>
                            </React.Fragment>
                        );
                    })}
                </Space>
            </Image.PreviewGroup>
        </Drawer>
    );
}
