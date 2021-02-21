import { PROGRESS_TYPES, TIME_PERIODS, TASK_PRIORITIES } from "./enums";
import validator, { validateSchema } from "utils/validate";

export default class Task {
    constructor({
        id,
        title,
        subtasks = [],
        description,
        period = TIME_PERIODS.day,
        priority = TASK_PRIORITIES.normal,
        progressType = PROGRESS_TYPES.single,
        from,
        to,
        isDeleted = false,
        createdAt = Date.now(),
        updatedAt = Date.now(),
        stepCount = 0
    } = {}) {
        this.id = id;
        this.title = title;
        this.subtasks = subtasks;
        this.description = description;
        this.period = period;
        this.priority = priority;
        this.progressType = progressType;
        this.from = from;
        this.to = to;

        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.stepCount = stepCount;
    }
    /**
     * create plain object from props
     */
    toDoc() {
        return JSON.parse(JSON.stringify(this));
    }
    static orderTaskByPeriod(tasks) {
        const getValue = (period) => {
            switch (period) {
                case TIME_PERIODS.day: return 1;
                case TIME_PERIODS.week: return 2;
                case TIME_PERIODS.month: return 3;
                case TIME_PERIODS.quarter: return 4;
                case TIME_PERIODS.year: return 5;
                default: return 1;
            }
        };
        return tasks.sort((l, r) => (getValue(l.period) - getValue(r.period)));
    }
    static validate(formInput) {
        const taskValidationSchema = {
            title: validator().notEmpty().maxLength(100),
            description: validator().empty().or().maxLength(200),
            period: validator().oneOf(Object.values(TIME_PERIODS)),
            priority: validator().empty().or().oneOf(Object.values(TASK_PRIORITIES)),
            progressType: validator().empty().or().oneOf(Object.values(PROGRESS_TYPES)),
            isDeleted: validator().empty().or().bool(),
            from: validator().empty().or().dateString(),
            to: validator().empty().or().dateString()
        };
        return validateSchema(taskValidationSchema, formInput);
    }

    //create firestore entity from inputs
    static fromForm(formInput) {
        const [isValid, errors] = this.validate(formInput);
        let task;
        if (isValid) {
            task = new Task(formInput);
        }
        return [task, isValid, errors];
    }
}
