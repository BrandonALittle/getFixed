import React from 'react';
import Problem from './problem.jsx';

class ProblemsView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      problems = []
    }
  }

  render() {
    return (
      <div>
        //{this.state.categories.map((problem, index) => <Problem key={problem.id} problem={problem} index={index} />)}
      </div>
    )
  }
}

export default ProblemsView;