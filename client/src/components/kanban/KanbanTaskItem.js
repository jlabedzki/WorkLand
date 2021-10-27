import React, { useState } from "react";
import { AiFillWarning } from "react-icons/ai";
import TaskUser from "../users/TaskUser";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import classNames from 'classnames';

function KanbanTaskItem(props) {
  const {
    index,
    id,
    title,
    description,
    priority,
    currentStatus,
    users,
    taskTeams,
  } = props;
  console.log("ohjfihfpa" , priority)

  const iconPriorityClass = classNames(
    "priority-icon",
    { "late": priority === 0 },
    { "progress": priority === 1 },
    { "done": priority === 2 }
  );


  const team = taskTeams.filter((team) => {
    return team.taskId === id;
  });

  const usersList = [];

  for (const member of team) {
    for (const user of users) {
      if (user.id === member.userId) {
        usersList.push(user);
      }
    }
  }

  const usersListArray = usersList.map((user) => {
    const { id, name, avatar } = user;
    return <TaskUser key={id} id={id} avatar={avatar} name={name} />;
  });

  return (
    <Draggable key={id} draggableId={`${id}`} index={index}>
      {(provided) => (
        <div
          className="task-item-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="task-item-header">
            <h1>{title}</h1>
            <div className={iconPriorityClass}>
              <AiFillWarning></AiFillWarning>
            </div>
          </div>

          <p>{description}</p>
          <div className="task-users">{usersListArray}</div>
        </div>
      )}
    </Draggable>
  );
}

export default KanbanTaskItem;
