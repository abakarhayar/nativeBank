import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useApi } from '../context/ApiContext';



export default function RegisterScreen({ navigation }) {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [solde, setSolde] = useState("");
    const apiUrl = useApi();

    const clearForm = () => {
        setNom("");
        setPrenom("");
        setEmail("");
        setPassword("");
        setSolde("");
    };

    const handleSubmit = async () => {
        const user = {
            nom: nom,
            prenom: prenom,
            email: email,
            password: password,
            solde: solde,
        };

        try {
            const response = await fetch(`${apiUrl}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(user),
                
            });
            if (response.ok) {
                clearForm();
                // navigation.navigate('login');
            } else {
                const errorData = await response.json();
                console.error('Error adding user:', errorData);
                console.log(user);
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };
    const handleCancel = () => {
    //   navigation.navigate('login'); 
  };


    return (
        <View>
            <Text style={styles.title}>Creer un compte</Text>

            <Text>Nom</Text>
            <TextInput
                style={styles.textInput}
                value={nom}
                onChangeText={setNom}
                placeholder="Nom"
            />

            <Text>Prenom </Text>
            <TextInput
                style={styles.textInput}
                value={prenom}
                onChangeText={setPrenom}
                multiline={true}
                placeholder="Prenom"
            />

            <Text>email</Text>
            <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="test@test.com"
                keyboardType="email-address"
            />

            <Text>Password</Text>
            <TextInput
                style={styles.textInput}
                value={password}
                onChangeText={setPassword}
                placeholder="password"
                secureTextEntry={true}
            />

            <Text>Solde</Text>
            <TextInput
                style={styles.textInput}
                value={solde}
                onChangeText={setSolde}
                placeholder="solde"
                keyboardType="numeric"
            />

            
            <Button title="Ouverture de compte" onPress={handleSubmit} />
            <Button title="Annuler" onPress={handleCancel} color="red" />
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        width: '80%',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
});
