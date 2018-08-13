import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button} from 'native-base'
import * as t from 'tcomb-form-native';
import { signUpUser } from '../state/reducer';
import { connect } from 'react-redux';

const SignUpForm = t.form.Form;

const User = t.struct({
    name: t.String,
    email: t.String,
    password: t.String
});

class SignUpFormPage extends React.Component {
    _form : any;
    
    handleSubmit = () => {
        var value = this._form.getValue();
        if (value) {
            this.props.signUpUser(value).then((response) => {
                console.log("response okay", response);
              })
              .catch((response) => {
                console.log("response bad", response);
              })
        }
    }

    render() {
    return (
      <View style={{backgroundColor : 'white', flex : 1}}>
        <View style={styles.container}>
          <SignUpForm type={User} ref={c => this._form = c}/>
            {!this.props.loading &&
                <Button rounded style={styles.buttonLogin} onPress={this.handleSubmit}>
                    <Text style={{color: 'white'}}>Cadastrar</Text>
                </Button>
            }
            <View style={styles.signupView}>
                {this.props.success !== undefined && !this.props.success &&
                    <Text style={{color: 'red'}}>{this.props.error}</Text>
                }
                {this.props.success &&
                    <Text style={{color: 'blue'}}>User created!</Text>
                }
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  signupView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpText : {
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
    signUpUser
};
const SignUpPage = connect(mapStateToProps, mapDispatchToProps)(SignUpFormPage);

export class SignUp extends React.Component {
    static navigationOptions = {
        title: 'SignUp',
    };
    render(){
       return (<SignUpPage/>);
    }
 }
