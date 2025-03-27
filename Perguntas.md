1) Qual a diferença entre componente e função?
    #    ex: const LoginScreen = ({ navigation }) => { 
    
    // State hooks to manage email and password input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle login button press
    # const handleLogin = () => {
        // Basic validation
        if (!email || !password) 
        {
        Alert.alert('Error', 'Please enter both email and password');
        return;
        }

        // Simulate login process
        if (email === 'donis@gmail.com' && password === '123456') 
        {
        Alert.alert('Success', 'Login Successful!');
        // Navigate to home screen or dashboard
        // navigation.navigate('Home');
        } 
        
        else 
        {
        Alert.alert('Error', 'Invalid email or password');
        }
    };

2)