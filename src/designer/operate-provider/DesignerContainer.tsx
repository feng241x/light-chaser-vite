const DesignerContainer = (props: any) => {
    return (
        <div style={{outline: 'none'}} className={'lc-event-container'}>
            {props.children}
        </div>
    );
}

export default DesignerContainer;