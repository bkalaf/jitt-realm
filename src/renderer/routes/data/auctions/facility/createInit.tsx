export function createInit(name: string) {
    console.log((globalThis as any).schema);
    alert((globalThis as any).schema?.length.toString() ?? 'n/a');
    const sch = (globalThis as any).schema.filter((x: any) => x.schema.name === name)[0];
    if (sch == null) {
        alert('ERRORED');
        throw new Error('initial not found');
    }
    return new sch();
}
