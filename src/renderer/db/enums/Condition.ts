export const conditionMap = {
    0: 'New',
    1: 'Like new',
    2: 'Good',
    3: 'Fair',
    4: 'Poor'
}
export type Condition = keyof typeof conditionMap;