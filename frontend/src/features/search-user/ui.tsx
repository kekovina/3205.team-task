import Button from "@shared/ui/Button";
import Input from "@shared/ui/Input";
import MaskedInput from "@widgets/MaskedInput/ui";
import { useFormik } from 'formik';
import { string, object } from 'yup'
import useAbortedFetch from '@shared/hooks/useAbortedFetch'
import { JSONResponse } from "@shared/types";

const UserSearchSchema = object({
  number: string().optional().length(8),
  email: string().email().defined()
})

export default function UserSearchForm() {

  
  const { run, response } = useAbortedFetch('http://localhost:8000/users')

  const formik = useFormik({
    initialValues: {
      number: '',
      email: ''
    },
    onSubmit: (values) => {
      run({...values, number: values.number.replace(/-/gm, '')})
    },
    validationSchema: UserSearchSchema
  })


  return (
    <form 
      className="flex flex-col w-fit rounded-2xl border-2 border-cyan-600 px-4 py-2"
      onSubmit={formik.handleSubmit}
    >
      <Input 
        type="text" placeholder="email" name="email" label="E-mail"
        value={formik.values.email}
        onChange={formik.handleChange}
        />
        {formik.errors.email && formik.touched.email ? (
             <div className="text-red-600">{formik.errors.email}</div>) : null}
      <MaskedInput 
          type="text" placeholder="number" name="number" label="Номер телефона"
          value={formik.values.number}
          onChange={formik.handleChange}
        />
        {formik.errors.number && formik.touched.number ? (
             <div className="text-red-600">{formik.errors.number}</div>) : null}
      <Button type="submit">Отправить</Button>
      {response ? <div className="flex flex-col my-2">
        {(response as JSONResponse).map((user) => (<div key={user.email + user.number} className="flex flex-col rounded-xl p-2 border-2 border-orange-400">
          <div className="text-gray-600 text-lg">{user.email ?? '-'}</div>
          <div className="text-gray-500">{user.number ?? '-'}</div>
        </div>))}
      </div> : null}
    </form>
  )
}
