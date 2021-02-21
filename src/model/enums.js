const TIME_PERIODS = {
    day: 'day',
    week: 'week',
    month: 'month',
    quarter: 'quarter',
    year: 'year'
};
const TASK_STATES = {
    notSet: 'notSet',
    done: 'done',
    partialDone: 'partialDone',
    notDone: 'notDone'
};
const PROGRESS_TYPES = {
    single: 'single',
    stepped: 'stepped',
    subTask: 'subTask'
};
const TASK_PRIORITIES = {
    low: 'low',
    normal: 'normal',
    high: 'high',
    highest: 'highest'
};

export {
    TIME_PERIODS,
    TASK_STATES,
    PROGRESS_TYPES,
    TASK_PRIORITIES,
}