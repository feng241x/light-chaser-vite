import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const BarSvg = () => (
    <svg width="25" height="25" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6V42H42" stroke="#afafaf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M18 34H14" stroke="#afafaf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M26 26H14" stroke="#afafaf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M42 18H14" stroke="#afafaf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M34 10L14 10" stroke="#afafaf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const IconBarSvg = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={BarSvg} {...props} />
);

export default IconBarSvg;