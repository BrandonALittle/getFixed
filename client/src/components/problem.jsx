import React from 'react';
import { Link } from 'react-router-dom';

const Problem = (props) => {

  var colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
  var index = Math.round(Math.random()*13);
  var color = colors[index];

  return (
    <div className={`ui very raised ${color} card`}>
      <Link to={`/singleProblemPage/${props.problem.id}`}>
        <img className="ui centered medium image" src={props.problem.image} />
      </Link>
      <div className="content">
        <Link to={`/singleProblemPage/${props.problem.id}`}className="header problemTitle">{props.problem.title}</Link>
        <p className="problemDesc">{props.problem.description}</p>
      </div>

      <div>
        <Link to={`/userProfile/${props.problem.userId}`}>
          <div>
            <a className={`ui ${color} image label`}>
              <img src="https://www.w3schools.com/howto/img_avatar.png"/>
              {props.problem.owner}
              <div className="detail">⭐️⭐️⭐️⭐️⭐️</div>
            </a>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Problem;