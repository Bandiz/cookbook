import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { ADMIN } from '../../constants/routes';

export function Breadcrumbs() {
    return (
        <Breadcrumb
            style={{ margin: '16px 0' }}
            items={[
                {
                    title: (
                        <Link className="ant-typography" to={ADMIN}>
                            Admin
                        </Link>
                    ),
                },
                {
                    title: (
                        <Link
                            className="ant-typography"
                            to={ADMIN + '?activeTab=3'}
                        >
                            Recipes
                        </Link>
                    ),
                },
                {
                    title: 'New Recipe',
                },
            ]}
        />
    );
}
