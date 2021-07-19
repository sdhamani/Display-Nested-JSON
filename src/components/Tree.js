import React, { useState } from "react";
import "./tree.css";

import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";

const Tree = ({ data = [], hasChild = true }) => {
  return (
    <DragDropContext
      onDragEnd={(result) => {
        console.log(result);
      }}
    >
      <div>
        <ul className="list-data">
          {data.map((tree, index) => (
            <TreeNode node={tree} hasChild={true} index={index} />
          ))}
        </ul>
      </div>
    </DragDropContext>
  );
};

const TreeNode = ({ node, hasChild, index }) => {
  const [childVisible, setChildVisiblity] = useState(false);

  return (
    <div>
      {node.RestaurantName && (
        <Droppable droppableId={node.RestaurantID}>
          {(provided) => (
            <li ref={provided.innerRef}>
              <div>
                <i
                  onClick={(e) => setChildVisiblity((v) => !v)}
                  className="arrow right"
                ></i>

                <span>{node.RestaurantName}</span>
              </div>
            </li>
          )}
        </Droppable>
      )}

      {node.menu && childVisible && (
        <li>
          {node.menu.map((singleMenu, index) => {
            if (singleMenu.type === "sectionheader") {
              return (
                <Tree
                  data={singleMenu.children}
                  hasChild={true}
                  index={index}
                />
              );
            } else return null;
          })}
        </li>
      )}
      {hasChild && node.type === "item" && node.selected === 1 && (
        <Droppable droppableId={node.id}>
          {(provided) => (
            <div ref={provided.innerRef}>
              {console.log(node.id)}
              <Draggable key={node.id} draggableId={node.id} index={index}>
                {(provided) => (
                  <li ref={provided.innerRef} {...provided.draggableProps}>
                    <i
                      onClick={(e) => setChildVisiblity((v) => !v)}
                      className="arrow right"
                    ></i>
                    <span {...provided.dragHandleProps}>{node.name}</span>
                  </li>
                )}
              </Draggable>
              {node.children && childVisible && (
                <Tree data={node.children} hasChild={true} />
              )}
            </div>
          )}
        </Droppable>
      )}

      {hasChild && node.type !== "item" && node.selected === 1 && (
        <Droppable droppableId={node.id}>
          {(provided) => (
            <div ref={provided.innerRef}>
              {console.log(node.id)}
              {
                <li>
                  <i
                    onClick={(e) => setChildVisiblity((v) => !v)}
                    className="arrow right"
                  ></i>
                  <span>{node.name}</span>

                  {node.children && childVisible && (
                    <Tree data={node.children} hasChild={true} />
                  )}
                </li>
              }
            </div>
          )}
        </Droppable>
      )}
    </div>
  );
};

export default Tree;
