import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, withRouter } from 'react-router';
import { appStore } from '../../../state/app';

const GenInformation = () => {
  // eslint-disable-next-line no-unused-vars
  const { state, update } = useContext(appStore);
  console.log(state, 'state');
  const history = useHistory();
  console.log(state.profileProject, 'state');
  // eslint-disable-next-line no-unused-vars
  const { handleSubmit, errors, register } = useForm({
    defaultValues: {},
  });
  // const { push } = useHistory();
  const { profileProject } = state.app;
  const onSubmit = (data) => {
    update('app.profileProject', { info: data });
    history.push('/create-project/location');
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 1</h2>
      <label>
        First Name:
        <input
          name="firstName"
          ref={register({ required: 'This is required' })}
          defaultValue={profileProject.firstName}
        />
      </label>
      <label>
        Last Name:
        <input
          name="lastName"
          ref={register({ required: 'This is required' })}
          defaultValue={profileProject.lastName}
        />
      </label>
      <input type="submit" />
    </form>
  );
};

export default withRouter(GenInformation);
