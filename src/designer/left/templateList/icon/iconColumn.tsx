import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const ColumnSvg = () => (
    <svg width="25" height="25" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4 42H44H4Z" fill="none"/><path d="M4 42H44" stroke="#afafaf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><rect x="8" y="28" width="6" height="14" fill="none" stroke="#afafaf" strokeWidth="3" strokeLinejoin="round"/><rect x="21" y="18" width="6" height="24" fill="none" stroke="#afafaf" strokeWidth="3" strokeLinejoin="round"/><rect x="34" y="6" width="6" height="36" fill="none" stroke="#afafaf" strokeWidth="3" strokeLinejoin="round"/></svg>
);

const IconColumnSvg = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={ColumnSvg} {...props} />
);

export default IconColumnSvg;