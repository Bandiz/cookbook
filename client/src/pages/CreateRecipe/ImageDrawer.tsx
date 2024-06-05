import { Button, Drawer, Space, Typography, Image, Flex, message, FormInstance } from 'antd';
import { useImagesByCategory } from '../../api/images/useImagesByCategory';

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
                                }}
                            >
                                Select as main image
                            </Button>
                        );
                    },
                }}
            >
                <Typography.Text strong>Uncategorized images</Typography.Text>
                <Flex gap="small" wrap="wrap">
                    {images.uncategorizedImages.map((image) => {
                        return (
                            <Image
                                key={image}
                                src={`/api/image/${image}`}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover',
                                }}
                            />
                        );
                    })}
                </Flex>
                <Space direction="horizontal" size="middle">
                    {images.categories.map((category) => {
                        const { categoryName, imageIds } = category;
                        return (
                            <Space key={categoryName} direction="vertical" size="large">
                                <Typography.Text strong>{categoryName}</Typography.Text>
                                {imageIds.map((id) => {
                                    return (
                                        <Image
                                            key={id}
                                            src={`/api/image/${id}`}
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    );
                                })}
                            </Space>
                        );
                    })}
                </Space>
            </Image.PreviewGroup>
        </Drawer>
    );
}
