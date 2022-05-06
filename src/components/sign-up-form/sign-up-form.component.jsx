
import  {useState} from 'react';
import FormInput from '../form-input/form-input.component';

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

  const resetFormFields = () => {
      setFormFields(defaultFormFields)
  }

const handleSubmit = async (event) =>{
    event.preventDefault();
    if(password !== confirmPassword){
        alert("passwords do not match");
        return;

    }
    try{
         const user = await createAuthUserWithEmailAndPassword (email, password);
         await createUserDocumentFromAuth(user,{displayName});
         alert("User Successfully created")
         resetFormFields();
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
      
         <FormInput type="text" label="Name" required onChange={handleChange} value={displayName} name='displayName'/>

       
         <FormInput type="email" label="Email" required onChange={handleChange} value={email} name='email'/>

         <FormInput type="password" label="Password" required onChange={handleChange} value={password} name='password'/>

      
         <FormInput type="password" label="Confirm Password" required onChange={handleChange} value={confirmPassword}  name='confirmPassword'/>

         <button type="submit">Submit</button>
     </form>
        </div>
    )
}
export default SignUpForm;