import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const OptimizeSvg = () => (
    <svg width="25" height="25" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 7.99991L28 15.9999L38.0323 10.1097L33 20.9999L42 28.9999L30 27.9999L25.5 37.9999L23 26.9999L11.0004 25.9999L21.5082 19.6499L19 7.99991Z" fill="none" stroke="#afafaf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 42.0205L23 27" stroke="#afafaf" strokeWidth="3" strokeLinecap="round"/></svg>
);

const IconOptimizeSvg = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={OptimizeSvg} {...props} />
);

export default IconOptimizeSvg;