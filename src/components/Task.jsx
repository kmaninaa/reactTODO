export default function Task({created, description}) {
return (
    <li>
            <div class="view">
              <input class="toggle" type="checkbox"></input>
              <label>
                <span class="description">{description}</span>
                <span class="created">{created}</span>
              </label>
              <button class="icon icon-edit"></button>
              <button class="icon icon-destroy"></button>
            </div>
          </li>
)
}

