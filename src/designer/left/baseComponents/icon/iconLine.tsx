import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const LineSvg = () => (
    <svg width="25" height="25" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6V42H42" stroke="#afafaf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 34L22 18L32 27L42 6" stroke="#afafaf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const IconLineSvg = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={LineSvg} {...props} />
);

export default IconLineSvg;