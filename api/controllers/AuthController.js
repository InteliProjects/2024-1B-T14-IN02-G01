const { v4: uuidv4 } = require('uuid'); // Biblioteca para gerar UUIDs
const FirebaseAdminService = require('../services/FirebaseAdminService');
const FirebaseService = require('../services/firebase');

module.exports = {
    googleLogin: async function (req, res) {
      const idToken = req.body.idToken;
  
      try {
        //console.log('ID Token recebido:', idToken);
        const decodedToken = await FirebaseAdminService.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;
  
        let user = await User.findOne({ uid });
        if (!user) {
          user = await User.create({
            uid: uid,
            email: decodedToken.email,
            name: decodedToken.name,
            picture: decodedToken.picture
          }).fetch();
        }
  
        req.session.userId = user.id;
        //console.log('Usuário autenticado com Google:', user);
  
        return res.json({ user });
      } catch (error) {
        console.error('Erro ao autenticar com Google:', error);
        return res.status(500).json({ error: error.message });
      }
    },
  
    emailLogin: async function (req, res) {
      const email = req.body.email;
      const password = req.body.password;
  
      try {
        //console.log(`Tentando autenticar usuário com email: ${email}`);
        const result = await FirebaseService.signInWithEmailAndPassword(FirebaseService.auth, email, password);
        const user = result.user;
  
        req.session.userId = user.uid;
        //console.log('Usuário autenticado:', user);
        return res.json({ user });
      } catch (error) {
        console.error('Erro ao fazer login com email:', error);
        return res.status(500).json({ error: error.message });
      }
    },
  
    emailCadastro: async function (req, res) {
      const email = req.body.email;
      const password = req.body.password;
  
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'Email já está em uso' });
        }
  
        const result = await FirebaseService.createUserWithEmailAndPassword(FirebaseService.auth, email, password);
        const firebaseUser = result.user;
  
        const uid = uuidv4();
  
        const user = await User.create({
          uid: uid,
          email: firebaseUser.email,
          name: req.body.name,
        }).fetch();
  
        req.session.userId = user.id;
        //console.log('Usuário cadastrado:', user);
        return res.json({ user });
      } catch (error) {
        console.error('Erro ao fazer cadastro:', error);
        return res.status(500).json({ error: error.message });
      }
    },
    forgotPassword: async function (req, res) {
        const email = req.body.email;
        try {
          await FirebaseService.sendPasswordResetEmail(FirebaseService.auth, email);
          return res.json({ message: 'Um email para redefinição de senha foi enviado.' });
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      },
    
      resetPassword: async function (req, res) {
        const { oobCode, newPassword } = req.body;
    
        try {
          await FirebaseService.verifyPasswordResetCode(FirebaseService.auth, oobCode);
          await FirebaseService.confirmPasswordReset(FirebaseService.auth, oobCode, newPassword);
          return res.json({ message: 'Senha redefinida com sucesso.' });
        } catch (error) {
          console.error('Erro ao redefinir senha:', error);
          return res.status(500).json({ error: error.message });
        }
    },

    phoneLogin: async function (req, res) {
        const idToken = req.body.idToken;

        try {
            const decodedToken = await FirebaseAdminService.auth().verifyIdToken(idToken);
            const uid = decodedToken.uid;

            let user = await User.findOne({ uid });
            if (!user) {
                user = await User.create({
                    uid: uid,
                    phoneNumber: decodedToken.phone_number || '',  // Armazenar o número de telefone
                    name: decodedToken.name || 'Usuário do Telefone',
                    email: 'email@email.com',  // Definindo email como string vazia
                    picture: decodedToken.picture || '',
                    role: 'user'
                }).fetch();
            }

            req.session.userId = user.id;

            return res.json({ user });
        } catch (error) {
            console.error('Erro ao autenticar com telefone:', error);
            return res.status(500).json({ error: error.message });
        }
    }
}