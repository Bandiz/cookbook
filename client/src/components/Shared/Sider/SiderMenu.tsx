import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useCategoryNameList } from '../../../api/categories';
import { MenuInfo } from 'rc-menu/lib/interface';

interface SiderMenuProps {
    onClick: (info: MenuInfo) => void;
}

export function SiderMenu({ onClick }: SiderMenuProps) {
    const { data: categories } = useCategoryNameList();

    if (!categories) {
        return null;
    }

    return (
        <Sider breakpoint="md" collapsedWidth="0">
            <Menu
                mode="inline"
                style={{ height: '100%', borderRight: 0 }}
                onClick={onClick}
                items={[
                    { key: 'all', label: 'All' },
                    ...categories.map((category) => {
                        return { key: category, label: category };
                    }),
                ]}
            />
        </Sider>
    );
}
