# wcaf-cedro

O seguinte projeto foi desenvolvido em react-native 0.56, utilizando os principais plugins como seguinte:
```
"native-base": "^2.7.2"
"react-native-fingerprint-scanner": "^2.3.2"
"react-native-keychain": "^3.0.0"
"react-navigation": "^2.11.2"
"react-redux": "^5.0.7"
"redux-axios-middleware": "^4.0.0"
"tcomb-form-native": "^0.6.15"
```

Esse projeto utiliza ```TypeScript``` como linguagem de programação e utiliza a arquitetura ```redux``` para controle de estado da aplicação. O Projeto hoje consiste de 2 funcionalidades, cadastro de usuário e login, ao fazer login utiliza-se keychain para armazenar o token, quando já existe usuário logado na aplicação 'é automaticamente exibido uma requisição para fazer login utilizando touchId(ios) ou fingerprint(Android) caso o device suporte tal funcionalidade.

# Próximos passos

Para trabalho futuro onde deve-se fazer cadastro de websites e senhas, o plano é armazenar todas informações de websites em um objeto json e a partir daí transforma-lo em string para poder utilizar o plugin keychain, ao abrir da tela carregar esse objeto do keychain e formata-lo para exibição.

Para download das imagens o planejamento é utilizar o plugin ```react-native-cached-image``` para armazenar as imagens do website em cache.