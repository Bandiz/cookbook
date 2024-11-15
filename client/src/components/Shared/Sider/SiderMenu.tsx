import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { MenuInfo } from 'rc-menu/lib/interface';
import useCategoryNameList from '../../../api/public/category/useCategoryNameList';

interface SiderMenuProps {
    onClick: (info: MenuInfo) => void;
}

export function SiderMenu({ onClick }: SiderMenuProps) {
    const { data } = useCategoryNameList();

    if (!data) {
        return null;
    }
    const { categories } = data;

    return (
        <Sider breakpoint="md" collapsedWidth="0">
            <Menu
                mode="inline"
                style={{ height: '100%', borderRight: 0 }}
                onClick={onClick}
                items={[
                    { key: 'all', label: 'All' },
                    ...categories.map((category) => {
                        return { key: category.categoryName, label: category.categoryName };
                    }),
                ]}
            />
        </Sider>
    );
}
