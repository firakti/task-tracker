import React, { useEffect } from "react";
import Calendar from "../calendar";
import Log from "../log/log"; //TODO there was a bug for import from index ?? but I forgot 
import EditTask from "../edit";
import { useStateWithPush } from "utils/handler";
import CalendarPresenter from "../calendar/presenter";
import editPresenter from "view/edit/presenter";
import AddButton from "view/shared/add-button"
import ProfileButton from "./parts/profile-button"
import authPresenter from "../auth/presenter";
import AuthService from "services/auth";
import TaskStorage from "storage/task-storage";
import Spinner from "view/shared/spinner";

const Home = () => {

    const authService = new AuthService();
    const taskStorage = new TaskStorage();
    const [state, pushState] = useStateWithPush({});


    useEffect(() => {
        const loadCalendar = () => {
            /* eslint-disable react-hooks/exhaustive-deps */
            const dayPagePresenter = new CalendarPresenter(pushState, taskStorage);
            dayPagePresenter.loadCalender();
        };
        loadCalendar();

    }, []);

    return (

        <div className="container">
            <Spinner isVisible={state.isLoading}></Spinner>
            <div className="fit-content">
                <Calendar
                    calendar={state.calendar}
                    pushState={pushState}
                    startDate={state.startDate}
                    timePeriod={state.timePeriod}>
                </Calendar>
                <AddButton onClick={() => editPresenter.openEdit(pushState)}></AddButton>
                <ProfileButton onLogout={() => authPresenter.signOut(authService, pushState)}></ProfileButton>
            </div>
            <EditTask
                pushState={pushState}
                isVisible={state.isEditTaskVisible}
                task={state.selectedTask}
                validationErrors={state.taskValidationErrors}
            >
            </EditTask>
            <Log
                pushState={pushState}
                isVisible={state.isLogVisible}
                taskLog={state.selectedLog}
                task={state.selectedTask}
            >
            </Log>


        </div>
    );
}

export default Home;