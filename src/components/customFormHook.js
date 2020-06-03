import {useState} from 'react'

export const CustomeForm = (initialState={})=>{
    const [formData, setFormData] = useState(initialState);

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(prev => ({ ...prev, [name]: value }));
      };
      const onSubmit = (e) => {
        console.log(e)
        
        }
        return{
            handleChange,
            onSubmit,
            formData
        }
}