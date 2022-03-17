export function ButtonGroup({ children, ...remain }: React.ComponentPropsWithoutRef<'div'>) {
    return (
        <div className='button-group' {...remain}>
            {children}
        </div>
    );
}
