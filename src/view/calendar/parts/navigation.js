import React from 'react'
import IconButton from 'view/shared/icon-button';
import { TIME_PERIODS } from '../../../model/enums';
import TaskStorage from 'storage/task-storage';
import CalendarPresenter from '../presenter';


const Pagination = ({ timePeriod, startDate, pushState }) => {

    const presenter = new CalendarPresenter(pushState, new TaskStorage());

    return (
        <div className="flex-row calendar-pagination">
            <div className="flex-row">
                <button
                    className={`button-navigation${timePeriod === TIME_PERIODS.week ? ' button-active' : ''}`}
                    onClick={() => presenter.setTimePeriod({ startDate, timePeriod: TIME_PERIODS.week })}>
                    week
                </button>
                <button
                    className={`button-navigation${timePeriod === TIME_PERIODS.month ? ' button-active' : ''}`}
                    onClick={() => presenter.setTimePeriod({ startDate, timePeriod: TIME_PERIODS.month })}>
                    month
                </button>
            </div>

            <div className="flex-row">
                <button
                    className="button-navigation"
                    onClick={() => presenter.goToNow({ timePeriod })}>
                    Now
                </button>
                <IconButton
                    className="button-navigation button-icon"
                    icon="navigate_before"
                    onClick={() => presenter.goToBefore({ startDate, timePeriod })}
                ></IconButton>
                <IconButton
                    className="button-navigation button-icon"
                    icon="navigate_next"
                    onClick={() => presenter.goToNext({ startDate, timePeriod })}
                ></IconButton>
            </div>
        </div>
    );
};

export default Pagination