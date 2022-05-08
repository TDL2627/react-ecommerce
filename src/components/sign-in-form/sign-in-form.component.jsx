import '../sign-in-form/sign-in-form.styles.scss'
import  {useState} from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import {  createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup ,} from '../../utils/firebase/firebase.utils';
const defaultFormFields = {
    email:'',
    password:'',

}

const SignInForm = () => {
    const [formFields, setFormFields]=useState(defaultFormFields);
    const {  email, password}= formFields;

  const resetFormFields = () => {
      setFormFields(defaultFormFields)
  }

const signInWithGoogle = async () =>{
    const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
}

const handleSubmit = async (event) =>{
    event.preventDefault();
  
    try{
       const response = await signInAuthUserWithEmailAndPassword (email, password)
       console.log(response)
       alert('Welcome!')
         resetFormFields();
    }catch(error){
   alert('Login Error')
   resetFormFields();
    }
}

const handleChange = (event )=>{
const {name, value}=event.target;

setFormFields({...formFields, [name]: value })

};

    return(
        <div className='sign-up-container'>
     <span>Sign In
     </span>
     <form onSubmit={handleSubmit}>
       
         <FormInput type="email" label="Email" required onChange={handleChange} value={email} name='email'/>

         <FormInput type="password" label="Password" required onChange={handleChange} value={password} name='password'/>
<div className='buttons-container'>
<Button buttonType={"inverted"}  type="submit">Sign In</Button>
         <Button type='button' buttonType={"google"} onClick={signInWithGoogle}> Google</Button>
</div>

     </form>
        </div>
    )
}
export default SignInForm;