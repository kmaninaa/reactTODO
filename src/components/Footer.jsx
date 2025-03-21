import TasksFilter from "./TasksFilter"
import { names } from "../buttonsData"

export default function Footer() {
    return (
        <footer class="footer">
             <span class="todo-count">1 items left</span>
          <ul class="filters">
            <TasksFilter {... names[0]}/>
            <TasksFilter {... names[1]}/>
            <TasksFilter {... names[2]}/>
          </ul>
          <button class="clear-completed">Clear completed</button>
        </footer>
    )
}