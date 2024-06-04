import { Button, Drawer, Space, Typography, Image, Flex, message } from 'antd';
import { useImagesByCategory } from '../../api/images/useImagesByCategory';

interface ImageDrawerProps {
    onClose: () => void;
    open: boolean;
}

export function ImageDrawer({ onClose, open }: ImageDrawerProps) {
    const { data: images, isError: imagesByCategoryError, isLoading: imagesByCategoryLoading } = useImagesByCategory();

    if (!images) {
        imagesByCategoryError && message.error('Failed to load images');
        return null;
    }

    return (
        <Drawer title="Main Images" onClose={onClose} open={open}>
            <Image.PreviewGroup
                preview={{
                    toolbarRender: (a, info) => {
                        console.log(info);

                        return (
                            <Button
                                type="primary"
                                onClick={(e) => {
                                    console.log(e);
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
                            <Space direction="vertical" size="large">
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
