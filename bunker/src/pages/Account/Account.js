//This page can accessed by any registered user, but not guests
//You can change your password, email, etc here

import React, { Component } from 'react';
import { compose } from 'recompose';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../../server/Session';
import { withFirebase } from '../../server/Firebase';
import PasswordChangeForm from '../PasswordChange/PasswordChange';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
  Icon,
  Input,
} from 'semantic-ui-react';


const SIGN_IN_METHODS = [
  // {
  //   id: 'password',
  //   provider: null,
  // },
  {
    id: 'google.com',
    provider: 'googleProvider',
  },
  {
    id: 'facebook.com',
    provider: 'facebookProvider',
  },
  {
    id: 'twitter.com',
    provider: 'twitterProvider',
  },
];

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Grid centered columns={3}>
          <Grid.Row></Grid.Row>
          <Grid.Row></Grid.Row>
      <Grid.Row></Grid.Row>
        <div><Icon name="user" size="huge"/><font size="+3">{"   "}{authUser.username}</font></div>
        <Grid.Row></Grid.Row>
        <Icon name="mail" size="big"/><font size="+2.5">{authUser.email}</font>
        <Grid.Row></Grid.Row>
        <PasswordChangeForm />
        {/*<LoginManagement authUser={authUser} />*/}
      </Grid>
    )}
  </AuthUserContext.Consumer>
);

// class LoginManagementBase extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       activeSignInMethods: [],
//       error: null,
//     };
//   }
//
//   componentDidMount() {
//     this.fetchSignInMethods();
//   }
//
//   fetchSignInMethods = () => {
//     this.props.firebase.auth
//       .fetchSignInMethodsForEmail(this.props.authUser.email)
//       .then(activeSignInMethods =>
//         this.setState({ activeSignInMethods, error: null }),
//       )
//       .catch(error => this.setState({ error }));
//   };
//
//   onSocialLoginLink = provider => {
//     this.props.firebase.auth.currentUser
//       .linkWithPopup(this.props.firebase[provider])
//       .then(this.fetchSignInMethods)
//       .catch(error => this.setState({ error }));
//   };
//
//   onDefaultLoginLink = password => {
//     const credential = this.props.firebase.emailAuthProvider.credential(
//       this.props.authUser.email,
//       password,
//     );
//
//     this.props.firebase.auth.currentUser
//       .linkAndRetrieveDataWithCredential(credential)
//       .then(this.fetchSignInMethods)
//       .catch(error => this.setState({ error }));
//   };
//
//   onUnlink = providerId => {
//     this.props.firebase.auth.currentUser
//       .unlink(providerId)
//       .then(this.fetchSignInMethods)
//       .catch(error => this.setState({ error }));
//   };
//
//   render() {
//     const { activeSignInMethods, error } = this.state;
//
//     return (
//         <Grid.Column >
//       <Header>
//         Sign In Methods:
//         </Header>
//         <Segment.Group>
//           {SIGN_IN_METHODS.map(signInMethod => {
//             const onlyOneLeft = activeSignInMethods.length === 1;
//             const isEnabled = activeSignInMethods.includes(
//               signInMethod.id,
//             );
//
//             return (
//
//               <Segment key={signInMethod.id}>
//                 {signInMethod.id === 'password' ? (
//                   <DefaultLoginToggle
//                     onlyOneLeft={onlyOneLeft}
//                     isEnabled={isEnabled}
//                     signInMethod={signInMethod}
//                     onLink={this.onDefaultLoginLink}
//                     onUnlink={this.onUnlink}
//                   />
//                 ) :
//                  (
//                   <SocialLoginToggle
//                     onlyOneLeft={onlyOneLeft}
//                     isEnabled={isEnabled}
//                     signInMethod={signInMethod}
//                     onLink={this.onSocialLoginLink}
//                     onUnlink={this.onUnlink}
//                   />
//                 )
//
//               }
//               </Segment>
//
//             );
//   })}
//         </Segment.Group>
//
//         {error && <Message negative>{error.message}</Message>}
//
//       </Grid.Column>
//
//     );
//   }
// }

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink,
}) =>
  isEnabled ?
      (
    <Button
      fluid
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
    >
      Deactivate {signInMethod.id}
    </Button>
  ) : (
    <Button
      fluid
      onClick={() => onLink(signInMethod.provider)}
    >
        <Icon name="facebook" size="big"/>
        Sign In with Facebook
    </Button>
  ) ;

class DefaultLoginToggle extends Component {
  constructor(props) {
    super(props);

    this.state = { passwordOne: '', passwordTwo: '' };
  }

  onSubmit = event => {
    event.preventDefault();

    this.props.onLink(this.state.passwordOne);
    this.setState({ passwordOne: '', passwordTwo: '' });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      onlyOneLeft,
      isEnabled,
      signInMethod,
      onUnlink,
    } = this.props;

    const { passwordOne, passwordTwo } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return isEnabled ? (

      <Button
        fluid
        onClick={() => onUnlink(signInMethod.id)}
        disabled={onlyOneLeft}
      >
        Deactivate {signInMethod.id}
      </Button>
    ) : (

      <Form size="large" onSubmit={this.onSubmit}>

        {/*<Form.Input*/}
          {/*fluid*/}
          {/*name="passwordOne"*/}
          {/*value={passwordOne}*/}
          {/*onChange={this.onChange}*/}
          {/*type="password"*/}
          {/*placeholder="New Password"*/}
        {/*/>*/}
        {/*<Form.Input*/}
          {/*name="passwordTwo"*/}
          {/*value={passwordTwo}*/}
          {/*onChange={this.onChange}*/}
          {/*type="password"*/}
          {/*placeholder="Con New Password"*/}
        {/*/>*/}

        {/*<Button disabled={isInvalid} fluid>*/}
          {/*Link {signInMethod.id}*/}
        {/*</Button>*/}

      </Form>
    );
  }
}

// const LoginManagement = withFirebase(LoginManagementBase);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);
