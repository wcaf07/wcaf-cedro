import * as React from 'react';
import { StyleSheet, Text, View, Platform, AlertIOS , Alert} from 'react-native';
import { Button} from 'native-base'
import * as t from 'tcomb-form-native';
import { loginUser } from '../state/reducer';
import { connect } from 'react-redux';
import * as Keychain from 'react-native-keychain';
import { LOGIN } from '../state/reducer';
import FingerprintScanner from 'react-native-fingerprint-scanner';

const LoginForm = t.form.Form;

const User = t.struct({
  email: t.String,
  password: t.String
});

class LoginFormPage extends React.Component {
  _form: any;

  componentDidMount() {
    Keychain.getGenericPassword().then((credentials) => {
      if(credentials) {
        this.enterFingerPrint();
      }
    }).catch((error) => {

    })
  }

  enterFingerPrint() {
    if (FingerprintScanner.isSensorAvailable()) {
      if (Platform.OS === 'ios') {
        FingerprintScanner
        .authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
        .then(() => {
          AlertIOS.alert('Authenticated successfully');
          this.props.navigation.navigate('Websites');
        })
        .catch((error) => {
          console.log("error scanning", error);
          AlertIOS.alert(error.message);
        });
      } else {
        FingerprintScanner
        .authenticate({ onAttempt:  this.handleAuthenticationAttempted })
        .then(() => {
          Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
          this.props.navigation.navigate('Websites');
        })
        .catch((error) => {
          console.log(error.message);
        });
      }
    }
  }

  handleAuthenticationAttempted = (error) => {
    console.log(error.message);
  };

  componentWillUnmount() {
    FingerprintScanner.release();
  }

  handleSubmit = () => {
    var value = this._form.getValue();
    if (value) {
        this.props.loginUser(value).then((response) => {
            if (response.type == LOGIN.LOGIN_SUCCESS) {
              Keychain.setGenericPassword("token", response.payload.data.token).then(() => {
                this.props.navigation.navigate('Websites');
              });
            }
          })
          .catch((response) => {
            console.log("response bad", response);
          })
    }
}
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{backgroundColor : 'white', flex : 1}}>
        <View style={styles.container}>
          <LoginForm type={User} ref={c => this._form = c}/>
        </View>
        <View style={styles.signupView}>
          {!this.props.loading &&
            <Button rounded style={styles.buttonLogin} onPress={this.handleSubmit}>
              <Text style={{color: 'white'}}>Login</Text>
            </Button>
          }
          {this.props.success !== undefined && !this.props.success &&
              <Text style={{color: 'red'}}>{this.props.error}</Text>
          }
          <Text style={styles.signUpText} onPress={() => navigate('SignUp')}>Não possui Login? Fazer cadastro</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 20,
    padding: 20
  },
  signupView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpText : {
    margin: 20,
    color : 'blue'
  },
  buttonLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 200,
    alignSelf: 'center'
  }
});

const mapStateToProps = state => {
  console.log("state received", state);
  return state
};

const mapDispatchToProps = {
  loginUser
};

const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginFormPage);

export class Login extends React.Component {
  static navigationOptions = {
      title: 'Login',
  };
  render(){
     return (<LoginPage navigation={this.props.navigation}/>);
  }
}