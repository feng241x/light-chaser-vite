import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const PieSvg = () => (
    <svg width="25" height="25" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4V24H44Z" fill="none" stroke="#afafaf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M43.0844 18H30V4.91553C36.2202 6.86917 41.1308 11.7798 43.0844 18Z" fill="none" stroke="#afafaf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const IconPieSvg = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={PieSvg} {...props} />
);

export default IconPieSvg;