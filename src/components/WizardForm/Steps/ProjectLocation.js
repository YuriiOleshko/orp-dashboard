import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import { appStore } from '../../../state/app';
// import { useHistory } from 'react-router';

const ProjectLocation = (props) => {
  const { register, handleSubmit } = useForm();
  // eslint-disable-next-line no-unused-vars
  const { state, update } = useContext(appStore);
  console.log(state, 'state');
  // const history = useHistory();
  console.log(state.profileProject, 'state');
  // const { state, actions } = useStateMachine({ updateAction });
  const onSubit = (data) => {
    // actions.updateAction(data);
    update('app.profileProject', { location: data });

    console.log(data, 'sdd');
    props.history.push('./result');
  };

  return (
    <form onSubmit={handleSubmit(onSubit)}>
      <h2>Step 2</h2>
      <label>
        Age:
        <input name="age" ref={register} />
      </label>
      <label>
        Years of experience:
        <input
          name="yearsOfExp"
          ref={register}
        />
      </label>
      <input type="submit" />
    </form>

  );
};

export default withRouter(ProjectLocation);
