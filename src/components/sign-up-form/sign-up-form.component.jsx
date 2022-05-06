
import  {useState} from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}


const SignUpForm = () => {
    const [formFields, setFormFields]=useState(defaultFormFields);
    const { displayName, email, password, confirmPassword}= formFields;

    console.log(formFields)

const handleSubmit = async (event) =>{
    event.preventDefault();
    if(password !== confirmPassword){
        alert("passwords do not match");
        return;

    }
    try{
  const user = await createAuthUserWithEmailAndPassword (email, password);
  
  await createUserDocumentFromAuth(user,{displayName});

    }catch(error){
        if(error.code == 'auth/email-already-in-use'){
            alert('Email already in use')
        }
    console.log('user creation error',error)
    }
}

const handleChange = (event )=>{
const {name, value}=event.target;

setFormFields({...formFields, [name]: value })

};

    return(
        <div>
     <h1>Sign Up</h1>
     <form onSubmit={handleSubmit}>
         <label>Display Name</label>
         <input type="text" required onChange={handleChange} value={displayName} name='displayName'/>

         <label>Email</label>
         <input type="email" required onChange={handleChange} value={email} name='email'/>

         <label>Password</label>
         <input type="password" required onChange={handleChange} value={password} name='password'/>

         <label>Confirm Password</label>
         <input type="password" required onChange={handleChange} value={confirmPassword}  name='confirmPassword'/>

         <button type="submit">Submit</button>
     </form>
        </div>
    )
}
export default SignUpForm;