import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const AreaSvg = () => (
    <svg width="25" height="25" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 24L12 33L4 28.5V42H44V15L37 23L31 18L24 26L18 24Z" fill="none" stroke="#afafaf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 28.5V17L11 23L16.5 15L22.5 18L31 9L36.5 13.5L44 6V15.5" stroke="#afafaf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const IconAreaSvg = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={AreaSvg} {...props} />
);

export default IconAreaSvg;