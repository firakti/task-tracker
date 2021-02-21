import Task from "model/task";

const editPresenter = {

  async loadTask({ taskId }, taskStorage, pushState) {
    pushState({ message: { text: "loading" } });
    const task = await taskStorage.get(taskId);
    pushState({
      message: { text: "completed." },
      selectedTask: task,
    });
  },

  cancelEdit(pushState) {
    pushState({ isEditTaskVisible: false, selectedTask: {} });
  },

  openEdit(pushState) {
    pushState({ isEditTaskVisible: true, selectedTask: {} });
  },

  async deleteTask({ taskId }, taskStorage, pushState) {
    pushState({ message: { text: "deleting" } });
    const isDeleted = await taskStorage.delete(taskId);
    if (isDeleted) {
      pushState({
        message: { text: "completed." },
        selectedTask: null,
        isEditTaskVisible: false,
      });
    }
  },


  async saveTask({ task }, taskStorage, pushState) {

    const isNewTask = !task.id;
    if (!isNewTask)
      task.updatedAt = Date.now()
    pushState({ message: { text: "saving" } });
    const [taskModel, isValid, errors] = Task.fromForm(task);
    if (!isValid) {
      pushState({
        message: { text: "entity is not valid." },
        taskValidationErrors: errors,
        isEditTaskVisible: true,
      });
      return;
    }
    if (isNewTask)
      await taskStorage.add(taskModel);
    else
      await taskStorage.update(taskModel);

    pushState({
      message: { text: "completed." },
      selectedTask: {},
      isEditTaskVisible: false,
    });
  }
};

export default editPresenter;
