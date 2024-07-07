# NativeBank

NativeBank est une application mobile développée en React Native, offrant des fonctionnalités bancaires de base telles que l'ouverture de compte, la connexion, et la commande de chéquiers. Ce projet utilise un contexte API pour gérer les appels réseau et assurer la communication avec un backend.

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Licence](#licence)

## Fonctionnalités

- **Ouverture de compte** : Permet aux utilisateurs de créer un nouveau compte bancaire.
- **Connexion** : Permet aux utilisateurs de se connecter à leur compte existant.
- **Commande de chéquier** : Permet aux utilisateurs de commander un chéquier.
-  **Profil** : Affichez le profil de l'utilisateur.
- **Effectuer un virement** : Permet aux utilisateurs de commander un chéquier.
- **Affichage des données** : Récupère et affiche les données de l'utilisateur depuis l'API.

>  [Consigne](https://github.com/abakarhayar/nativeBank/blob/main/consignes_projet/Consigne%20pour%20r%C3%A9aliser%20le%20front%20de%20l'application%20en%20React%20Native.pdf)

## Installation

1. Clonez le dépôt :

   ```sh
   git clone (https://github.com/abakarhayar/nativeBank.git)
   cd nativebank
   ```

2. Installations
   - Installez le Backend :

   ```sh
   cd backend
   python -m venv venv
   source ./venv/bin/activate
   python -m pip install -r requirements.txt
   
   ```
     - Installez le Native :

   ```sh
   cd frontend
   npm install
   ```

4. Lancez l'application :
     - Lancez le Backend :

   ```sh
   cd backend
   python run.py
   
   ```
     - Lancez le Native :

   ```sh
   cd frontend
   npm start  `

6. Scannez le QR code avec l'application Expo Go sur votre appareil mobile ou utilisez un émulateur pour voir l'application en action.

## Utilisation

- **Ouverture de compte** : Accédez à l'écran d'inscription pour créer un nouveau compte en fournissant les informations requises.
- **Connexion** : Utilisez l'écran de connexion pour accéder à votre compte existant.
- **Commande de chéquier** : 2 options
    - commander pour vous même (Utilisateur connecter)
   - Sélectionnez un utilisateur et commandez un chéquier via l'écran de commande de chéquier
- **Profil** : Utilisez l'écran de profil pour accéder aux iformations de l'utilisateur.
  - Nom
  - Prénom
  - Email
  - IBAN
  - Solde
- **Affichage des données** : Les données sont récupérées et affichées automatiquement à partir de l'API lors du chargement de l'application.
## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
